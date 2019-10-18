import React, { Component } from 'react';
import api from '../services/api'
import io from 'socket.io-client';
import { Button, Container } from 'react-bootstrap';
import ModalAlterar from '../components/ModalAlterar';

class Ranking extends Component {
    state = {
        ranking: [],
        user: JSON.parse(localStorage.getItem('@USER')),
        pontos: '',
        showModal: false,
        idAlterar: '',
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('/users')

        this.setState({ ranking: response.data });
    }

    registerToSocket = () => {
        const socket = io('https://quantos-litrex-backend.herokuapp.com/');

        socket.on('point', addPoint => {
            this.setState({
                ranking: this.state.ranking.map(rank => (
                    rank._id === addPoint._id ? addPoint : rank
                )).sort((a, b) => {
                    return b.points - a.points
                })
            });
        })
    }

    adicionarPontos = (id) => {
        api.post(`/users/${id}/point`);
    }

    zerarPontos = (id) => {
        const data = new FormData();

        data.append('points', 0);

        api.put(`/users/${id}/point`, data);
    }

    alterarPontos = (id, pontos) => {
        const data = new FormData();

        data.append('points', pontos);

        api.put(`/users/${id}/point`, data);

        this.setState({ showModal: false });
    }

    openModal = (id) => {
        this.setState({ showModal: true, idAlterar: id });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }


    render() {
        return (
            <Container>

                {this.state.ranking.map(ranking => (
                    <div key={ranking._id} className="card mb-5">
                        <div className="card-body">
                            <p>{ranking.login}</p>
                            <p>{ranking.points}</p>
                            <Button style={{ marginRight: 10 }} variant="success" onClick={() => this.adicionarPontos(ranking._id)}>+</Button>
                            <Button style={{ marginRight: 10 }} variant="primary" onClick={() => this.openModal(ranking._id)}>Alterar</Button>
                            <Button variant="danger" onClick={() => this.zerarPontos(ranking._id)}>Zerar</Button>
                        </div>
                    </div>
                ))}


                <ModalAlterar
                    showModal={this.state.showModal}
                    id={this.state.idAlterar}
                    closeModal={this.closeModal}
                    alterarPontos={this.alterarPontos} />
            </Container>
        );
    }
}

export default Ranking;