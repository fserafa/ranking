import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import api from '../services/api'
import io from 'socket.io-client';

class Inicio extends Component {
    state = {
        profile: {},
        user: JSON.parse(localStorage.getItem('@USER'))
    }

    async componentDidMount() {
        this.registerToSocket();

        let id = this.state.user._id;
        const response = await api.get(`/users/${id}`)

        this.setState({ profile: response.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('point', addPoint => {
            this.setState({ profile: addPoint });
        })
    }

    handleClick = () => {
        let id = this.state.user._id;

        api.post(`/users/${id}/point`);
    }

    render() {
        const { profile } = this.state;

        return (
            <Container>
                <p>{profile.login}</p>
                <p>{profile.points}</p>
                <Button variant="primary" onClick={this.handleClick} block>Mais um</Button>
            </Container>
        );
    }
}

export default Inicio;