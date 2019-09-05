import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount(){

        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data,
            userSelected: res.data[0].userName
        });

        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })   
        }
    }

    postNote = async e => {
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }

        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);
        }else{            
            await axios.post('http://localhost:4000/api/notes', newNote);
        }        
        window.location.href = '/';
    }

    onInputChange = async e => {
        await this.setState({[e.target.name]: e.target.value});
    }

    onChangeDate = date => {
        this.setState({date: date})
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body">
                        <h4>Create a Note</h4>
                        {/* Selecciona un usuario */}
                        <div className="form-group">
                            <select 
                                className="form-control"
                                name="userSelected"
                                onChange={this.onInputChange}
                                value={this.state.userSelected}>
                                {
                                    this.state.users.map(user => 
                                        <option key={user._id} value={user.userName}>
                                            {user.userName}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        {/* escribimos el titulo de la nota */}
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="title"
                                name="title"
                                value={this.state.title}
                                onChange={this.onInputChange}
                                required/>
                        </div>
                        {/* descripcion de la nota */}
                        <div className="form-group">
                            <textarea 
                                name="content" 
                                className="form-control" 
                                placeholder="Content"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                required>
                            </textarea>
                        </div>
                        {/* seleccionamos la fecha */}
                        <div className="form-group">
                            <DatePicker
                                 className="form-control"
                                 dateFormat={"dd/MM/yyyy"}
                                 selected={this.state.date}
                                 onChange={this.onChangeDate}></DatePicker>
                        </div>
                        <form onSubmit={this.postNote}>

                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
