var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BankSchema = new Schema({
    ifsc: {
        type: String
    },
    bank_id: {
        type: Number
    },
    branch: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    district: {
        type: String
    },
    state: {
        type: String
    },
    bank_name: {
        type: String
    }
}, {
    collection: 'banks'
});


BankSchema.methods = {
    toJson: function () {
        return {
            "_id": this._id,
            "ifsc": this.ifsc,
            "bank_id": this.bank_id,
            "branch": this.branch,
            "address": this.address,
            "city": this.city,
            "district": this.district,
            "state": this.state,
            "bank_name": this.bank_name
        }
    }
};

module.exports = mongoose.model('Bank', BankSchema);