
const dt = require('../config/db');

class BaseModel {

    constructor() {
        this.db = dt;
    }

}

module.exports = BaseModel;
