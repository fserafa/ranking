import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import api from '../services/api'

class Inicio extends Component {
    state = {
        profile: []
    }

    async componentDidMount() {
        const response = api.get('/users')
    }


    render() {
        
        return (
            <Container>
             
                    <Button variant="primary" block>Mais um</Button>
            </Container>
        );
    }
}

export default Inicio;