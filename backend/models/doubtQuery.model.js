const mongoose = require("mongoose")
const schema = mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    assignedTutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }, 
  { 
    timestamps: true, 
    versionKey: false 
})

const doubtQueryModel = mongoose.model("doubtQuery", schema)

module.exports = { doubtQueryModel }