import Relay from "react-relay";

export default class RegisterMutation extends Relay.Mutation {
    static fragments = {
        user: () => Relay.QL`
      fragment on User {
        name
        surname
        mail
        image
        salt
        hash
      }
    `
    };

    getMutation() {
        return Relay.QL`mutation { addRegister }`;
    }

    getVariables() {
        return {
            name: this.props.name,
            surname: this.props.surname,
            mail: this.props.mail,
            image: this.props.image,
            salt: this.props.salt,
            hash: this.props.hash
        }
    }

    getFatQuery() {
        return Relay.QL`
      fragment on AddRegisterPayload {
        user {
          name
          surname
          mail
          image
          salt
          hash
        }
      }
    `
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: this.props.user,

        }];
    }

    getOptimisticResponse() {
        return {
            user: {
                name: this.props.name,
                surname: this.props.surname,
                mail: this.props.mail,
                image: this.props.image,
                salt: this.props.salt,
                hash: this.props.hash
            }
        };
    }
}