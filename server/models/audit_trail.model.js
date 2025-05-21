const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AuditTrailSchema = new Schema({
    at_action: {
        type: String
    },
    at_user: {
        type: String
    },
    at_date: {
        type: Date
    },
    

})

const AuditTrail = model('AuditTrail', AuditTrailSchema)

module.exports = AuditTrail