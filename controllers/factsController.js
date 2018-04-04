const mongoose = require('mongoose')
const Fact = mongoose.model('Fact')
const uuid = require('uuid')

exports.showFacts = async (req, res) => {

  const facts = await Fact.find()
  res.render('facts', {
    title: 'Facts!',
    action: `/facts`,
    facts
  })
}

exports.uuidCreator = (req, res, next) => {
  req.body.uuid = uuid.v4()

  next()
}

exports.saveFact = async (req, res) => {
  const fact = await (new Fact(req.body)).save()
  res.redirect(`/facts/${fact.uuid}`)
}

exports.showSingleFact = async (req, res) => {
  const fact = await Fact.findOne({ uuid: req.params.uuid })

  res.render('singleFact', {
    fact
  })
}

exports.editFact = async (req, res) => {
  const fact = await Fact.findOne({ uuid: req.params.uuid })

  res.render('editFact', {
    title: 'Edit fact',
    action: `/facts/${fact.uuid}/edit`,
    fact
  })
}

exports.updateFact = async (req, res) => {
  const fact = await Fact.findOneAndUpdate(
    { 
      uuid: req.params.uuid 
    }, 
    req.body
  ).exec() 
  
  res.redirect(`/facts/${fact.uuid}`) 
}

exports.deleteFact = async (req, res) => {
  const fact = await Fact.findOneAndRemove(
    { 
      uuid: req.params.uuid 
    }
  )
  res.redirect(`/facts`)
}