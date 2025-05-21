const mongoose = require('mongoose')
const { Schema, model } = mongoose

const AdminSchema = new Schema({
    admin_fname: {
        type: String
    },
    admin_lname: {
        type: String
    },
    admin_email: {
        type: String
    },
    admin_password: {
        type: String
    },
    admin_last_in:{
        type: Date
    },
    admin_recent_act:{
        type: String
    },

   
    

})

const Admin = model('Admin', AdminSchema)

module.exports = Admin