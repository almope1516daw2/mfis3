import Relay from "react-relay";

export default class LoginMutation extends Relay.Mutation {
    static fragments = {
        user: () => Relay.QL`
      fragment on User {
        mail
        
      }
    `
    };

    getMutation() {
        return Relay.QL`mutation { searchLogin }`;
    }

    getVariables() {
        return {
            mail: this.props.mail
        }
    }

    getFatQuery() {
        return Relay.QL`
      fragment on SearchLoginPayload {
        user 
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
                mail: this.props.mail
            }
        };
    }
}