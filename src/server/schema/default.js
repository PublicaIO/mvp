const Validator = require('jsonschema').Validator;

class DefaultSchema {

    constructor() {
        this.schema = {};
        this.errors = [];
        this.validator = new Validator();
    }

    validate(data, schema) {
        schema = typeof schema === 'string' ? this.schema.properties[schema] : schema;
        this.errors = this.validator.validate(data, schema || this.schema).errors;

        return !this.errors.length;
    }

}

module.exports = DefaultSchema;