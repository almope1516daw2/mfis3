import Relay from "react-relay";
import React from "react";
import {Register} from "./Register.js";

class User extends React.Component {
    render() {
        return (
                <div>
                    <Register user={null}/>

                </div>
        );
    }
}

export default Relay.createContainer(User, {
    fragments: {
        user: () => Relay.QL`
      fragment on User {
        id
        name
        surname
        mail
      }
    `
    }
});