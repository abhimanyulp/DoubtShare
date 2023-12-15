const mongoose = require("mongoose")
const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
      language: {
        type: String,
        required: true,
      },
      classGrade: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['Student', 'Tutor'],
        required: true,
      },
      subject: {
        type: String
      },
},{
    versionKey: false
})

const userModel = mongoose.model("user", schema)

module.exports = { userModel }