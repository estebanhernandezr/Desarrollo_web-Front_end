import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavCustom from '../nav/nav.component'

import logo from './../../logoweb.png';

import './menu.component.css';

class Menu extends React.Component{

    render(){
        return(

    <Row>

        <Col sm={8}>  
            <NavCustom/>
        </Col>

        <Col sm={4}>
            <img src={logo} class="logo" alt="Icono de la app"/>
        </Col>
    </Row>
            
        );
    }
}

export default Menu;

