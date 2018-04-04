const express = require('express')
const router = express.Router()
const { catchErrors } = require('../handlers/errorHandlers')
const factsController = require('../controllers/factsController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/facts', catchErrors(factsController.showFacts))
router.post('/facts', factsController.uuidCreator, catchErrors(factsController.saveFact))

router.get('/facts/:uuid', catchErrors(factsController.showSingleFact))
router.get('/facts/:uuid/edit', catchErrors(factsController.editFact))
router.post('/facts/:uuid/edit', catchErrors(factsController.updateFact))

router.get('/facts/:uuid/delete', catchErrors(factsController.deleteFact))

router.get('/facts/:uuid/votes')
module.exports = router;
