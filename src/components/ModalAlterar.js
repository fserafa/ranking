import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'

class ModalAlterar extends Component {

    state = {
        pontos: '',
    }
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal} autoFocus>
                <Modal.Header closeButton>
                    <Modal.Title>Alterar Pontos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                className="form-control"
                                type="text"
                                value={this.state.pontos}
                                onChange={(e) => this.setState({ pontos: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        this.props.closeModal()
                        this.setState({ pontos: '' });
                    }}>
                        Fechar
              </Button>
                    <Button variant="primary" onClick={() => {
                        this.props.alterarPontos(this.props.id, this.state.pontos)
                        this.setState({ pontos: '' });
                    }}>

                        Alterar
              </Button>
                </Modal.Footer>

            </Modal >
        );
    }
}

export default ModalAlterar;