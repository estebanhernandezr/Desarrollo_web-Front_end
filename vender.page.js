import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import './vender.page.css';

const Boleta = (props) => {
    console.log("props: ...");
    console.log(props.props.vendido);
    const [state, setState] = React.useState(props.props);

    return (
        <>
            <div className="boleta">
                <Row>
                    <Col sm={8}>
                        boleta {state.id}
                    </Col>
                </Row>
            </div>
        </>
    );
};

class Vender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {id: 1, vendido: false},
                {id: 2, vendido: false},
                {id: 3, vendido: false}
            ],
        };
    };

    venderBoletas() {
        alert('Vendiendo boletas...');
        let state = this.state;
        for (let i = 0; i < state.list.length; i++) {
            console.log(state.list[i]);
            localStorage.setItem(i.toString(), JSON.stringify(state.list[i]));             
        }
    }

    seleccionarBoleta(it) {
        if (!it.vendido) {
            alert('Boleta: ' + it.id + ' SELECCIONADA');    
        } else {
            alert('Boleta: ' + it.id + ' DE-SELECCIONADA');
        }
        
        let state = this.state;
        for (let i = 0; i < state.list.length; i++) {
            if (state.list[i].id == it.id) {
                state.list[i] = {id: it.id, vendido: !it.vendido};
            }
        }
        this.setState(state);
        console.log(this.state.list);
    }

    render() {
        return (
            <>
                <p className='titulo'>
                    Vender boletas
                </p>
                <Container>
                    <Row className='fila'>
                        <Col sm={6}>
                            <Row className='boton'>
                                <Button className='boton' onClick={this.venderBoletas.bind(this)}>
                                    Vender las boletas seleccionadas
                                </Button>
                            </Row>
                            <Row className='boton'>
                                <Button className='boton'>
                                    Ver la lista de boletas vendidas
                                </Button>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            {
                                this.state.list.map((it) =>
                                    <Row className='item'>
                                        {
                                            <Row>
                                                <Col sm={8}>
                                                    <Boleta props={it}/>
                                                </Col>
                                                <Col sm={4}>
                                                    <Form.Check type="checkbox" label="seleccionar" onClick={this.seleccionarBoleta.bind(this, it)}/>
                                                </Col>
                                            </Row>
                                        }
                                    </Row>
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        );
    };
}

export default Vender;
