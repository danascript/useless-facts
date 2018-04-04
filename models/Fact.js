const mongoose = require('mongoose')
const uuid = require('uuid')

const factSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please enter a title'
  },
  text: {
    type: String,
    trim: true,
    required: 'Please enter the fact text'
  },
  uuid: String,
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  // updated: { 
  //   type: Date, 
  //   default: Date.now 
  // }
})

// factSchema.pre('save', async function(next) {

// })

module.exports = mongoose.model('Fact', factSchema)