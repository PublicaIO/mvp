const Validator = require('jsonschema').Validator;
const DefaultSchema = require('./default');

class UserSchema extends DefaultSchema {

    constructor() {
        super();

        this.schema = {
            type: 'Object',
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    required: true
                },
                firstname: {
                    type: 'string',
                    required: true
                },
                lastname: { 
                    type: 'string', 
                    required: true 
                }
            }
        }
    }

}

module.exports = new UserSchema();
