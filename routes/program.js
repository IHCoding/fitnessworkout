var express = require('express');
var router = express.Router();
const ctrlProgram = require('../controllers/program');
let auth = require('connect-ensure-login');
// GET home page
router.get('/',auth.ensureLoggedIn('/login')  , ctrlProgram.index);

// POST submitNewProgram
router.post('/submitNewProgram', ctrlProgram.submitNewProgram);
router.post('/submitAddExercise', ctrlProgram.addExercise)
router.get('/:id', ctrlProgram.getWorkout);

module.exports = router;