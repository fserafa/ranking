import React, { Component } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import api from '../services/api';

class Login extends Component {
    state = {
        login: "",
        senha: "",
    }

    handleSubmit = async e => {
        e.preventDefault();

        const response = await api.get('users')

        const [user] = response.data.filter((users) => (
            (users.login === this.state.login) && 
            (users.password === this.state.senha)
        ))

        if (user !== undefined) {
            localStorage.setItem('@USER', JSON.stringify(user))
            this.props.history.push('/ranking');
        }
    }


    render() {
        return (
            <div style={{
                'position': 'absolute',
                'margin': 'auto',
                'top': '0',
                'right': '0',
                'bottom': '0',
                'left': '0',
                'height': '500px',
                'width': '500px'

            }}>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Login</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Login"
                                        value={this.state.login}
                                        onChange={(e) => this.setState({ login: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Senha"
                                        value={this.state.senha}
                                        onChange={(e) => this.setState({ senha: e.target.value })} />
                                </div>

                                <button type="submit" className="btn btn-primary">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;