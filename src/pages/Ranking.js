import React, { Component } from 'react';
import api from '../services/api'
import io from 'socket.io-client';
import { Button, Container } from 'react-bootstrap';

class Ranking extends Component {
    state = {
        ranking: []
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('/users')

        this.setState({ ranking: response.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        socket.on('point', addPoint => {
            this.setState({
                ranking: this.state.ranking.map(rank => (
                    rank._id === addPoint._id ? addPoint : rank
                ))
            });
        })
    }


    render() {
        return (
            <Container>



                {this.state.ranking.map(ranking => (
                    <div key={ranking._id}>
                        <p>{ranking.login}</p>
                        <p>{ranking.points}</p>
                    </div>
                ))}
            </Container>
        );
    }
}

export default Ranking;