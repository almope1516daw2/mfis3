import Relay from "react-relay";

export default class LoginMutation extends Relay.Mutation {
    static fragments = {
        user: () => Relay.QL`
      fragment on User {
        mail
        password
      }
    `
    };

    getMutation() {
        return Relay.QL`mutation { searchLogin }`;
    }

    getVariables() {
        console.log("Varaibles: ")
        console.log(this.props)

        return {
            mail: this.props.mail,
            password: this.props.password
        }
    }

    getFatQuery() {
        console.log("fat: " )
        console.log(this.props)

        return Relay.QL`
      fragment on SearchLoginPayload {
        user 
      }
    `
    }

    getConfigs() {
        console.log("Config: ")
        console.log(this.props)

        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: this.props.user,

        }];
    }

    getOptimisticResponse() {
        console.log("OPTIMISTIC: ")
        console.log(this.props)
        return {
            user: {
                mail: this.props.mail,
                password: this.props.password
            }
        };
    }
}