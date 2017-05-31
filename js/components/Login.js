import Relay from "react-relay";
import LoginMutation from "./LoginMutation.js";
import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import FaEye from "react-icons/fa/eye";
import pbkdf2 from "pbkdf2";
import randomBytes from "randombytes";

class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            mail: "",
            password: "",
        };

    }


    accessLogin = () => {

        //this.setPassword(this.state.password);
        Relay.Store.update(new LoginMutation({
            mail: this.state.mail,
            password: this.state.password,
        }));
    };

    handleChange = (event) => {


        switch (event.target.name) {
            case "mail":
                this.setState({mail: event.target.value});
                break;
            case "password":
                this.setState({password: event.target.value});
                if (event.target.value !== "") {
                    event.target.style.fontFamily = "Verdana";
                } else {
                    event.target.style.fontFamily = "Montserrat";
                }
                break;
        }
    };

    mouseoverPass = () => {
        console.log(LoginMutation.user);
        console.log(this.props.user);


console.log(this.props);
        document.getElementById('inputPasswordLogin').type = "text";
        if (document.getElementById('inputPasswordLogin').value !== "") {
            document.getElementById('inputPasswordLogin').style.fontFamily = "Montserrat";
        }
    };

    mouseoutPass = () => {
        document.getElementById('inputPasswordLogin').type = "password";
        if (document.getElementById('inputPasswordLogin').value !== "") {
            document.getElementById('inputPasswordLogin').style.fontFamily = "Verdana";
        }
    };

    render() {
        let component;
        component =
            <ReactBootstrap.Col lg={12} md={12} id="Login">
                <form id="form">
                    <h2>LOGIN</h2>
                    <h3>Lorem ipsum dolor sit amet, tempor ut labore et dolor:</h3>
                    <ReactBootstrap.Row>
                        <ReactBootstrap.Col lg={6} md={6}>
                            <input onChange={this.handleChange} type="text" placeholder="Mail" name="mail"
                                   id="inputMailLogin"/><span id="spanMailLogin"> </span><br/>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>

                    <ReactBootstrap.Row>
                        <ReactBootstrap.Col lg={6} md={6}>
                            <input onChange={this.handleChange} type="password" placeholder="Contraseña" name="password"
                                   id="inputPasswordLogin"/>

                            <FaEye id="viewPassword" onMouseOver={this.mouseoverPass}
                                   onMouseOut={this.mouseoutPass}/><span id="spanPasswordLogin"></span><br/>
                            <ReactBootstrap.Col lg={5} md={6}>
                                ¿Contraseña olvidada?
                            </ReactBootstrap.Col>
                            <ReactBootstrap.Col lg={5} md={6}>
                                ¿Nuevo usuario? Regístrate
                            </ReactBootstrap.Col>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>

                    <ReactBootstrap.Row>
                        <ReactBootstrap.Col lg={6} md={6} lgOffset={6} mdOffset={6}>
                            <ReactBootstrap.Button className="button btnNext btnLogin"
                                                   onClick={this.accessLogin}>Entrar</ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>

                </form>
            </ReactBootstrap.Col>
        ;
        return component;
    }
}

exports.Login = Relay.createContainer(Login, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        mail
        password
        
       
      }
    `
    }
});