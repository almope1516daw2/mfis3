import Relay from "react-relay";
import React from "react";
import * as ReactBootstrap from "react-bootstrap";


export class mailTemplate extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        let component;
        component =
            "Hello " + this.props.name
        ;
        return component;
    }
}