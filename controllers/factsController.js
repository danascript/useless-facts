const mongoose = require('mongoose')
const Fact = mongoose.model('Fact')
const uuid = require('uuid')

exports.showFacts = async (req, res) => {

  const page = req.params.page || 1;

  const limit = 3;
  const skip = (page * limit) - limit;

  const factsPromise = await Fact.find().sort({ created: 'desc' }).skip(skip).limit(limit)
  const countPromise = Fact.count()

  const [facts, count] = await Promise.all([factsPromise, countPromise])
  const pages = Math.ceil(count / limit)

  // const facts = await Fact.find()
  res.render('facts', {
    title: 'Facts!',
    action: `/facts`,
    facts,
    count,
    page,
    pages
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

  if (!fact) {
    res.render('error404', {
      title: '404'
    })
    return
  }

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