const mongoose = require("mongoose");

module.exports.index = async function(req, res) {
  const programsget = await programsArray(req);

  res.render("program/index", {
    title: " Workouts Page ",
    programs: programsget
  });
};

programsArray = async function(req) {
  if (req._passport.session) {
    var id = req._passport.session.user;
    const program = mongoose.model("program");
    const docs = await program.find({ userID: id });
    return docs;
  } else {
    return [];
  }
};

getprogram = async function(id) {
  const program = mongoose.model("program");
  const doc = await program.find({ _id: id });
  return doc[0];
};

module.exports.getWorkout = async function(req, res) {
  const docget = await getprogram(req.params.id);
  res.render("program/add_exercise", {
    title: " Add Exercise Details ",
    id: req.params.id,
    doc: docget
  });
};

module.exports.addExercise = async function(req, res) {
  if (req._passport.session) {
    const program = mongoose.model("program");
    const docget = await getprogram(req.body.id);

    docget.Exercise.push(req.body.exercise);
    docget.Description.push(req.body.description);
    docget.Set.push(req.body.set);
    docget.Reps.push(req.body.repsOrTime);

    docget.save(function(err) {
      if (err) return handleError(err);
    });
    res.redirect("/program")
  } else {
    res.redirect("/");
  }
};

module.exports.submitNewProgram = function(req, res) {
  if (req._passport.session) {
    const program = mongoose.model("program");
    const myProgram = new program();
    myProgram.Program = req.body.program;
    myProgram.userID = req._passport.session.user;
    myProgram.save(function(err) {
      if (err) return handleError(err);
      // saved!
    });
    res.redirect("/program");
  } else {
    res.redirect("/login");
  }
};
