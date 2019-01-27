const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");


router.get("/new", (req, res) => {
  res.render("form");
})

router.get("/",(req,res)=>{
  Movie.find()
  .then(movies =>{
    res.render("list",{movies});
  })
})

router.post("/", (req, res) => {
 // console.log(req.boby)
  Movie.create(req.body)
    .then( movie => {
      //console.log(movie);
      res.redirect("/movies/");
    })

})

router.post("/:id",(req,res)=>{
  Movie.findByIdAndDelete(req.params.id)
  .then(movie=>{
    res.redirect("/movies/");
  })
})

router.get("/:id",(req,res)=>{
  Movie.findById(req.params.id)
  .then(movie=>{
    res.render("detail",{movie})
  })
})

router.post("/:id/update",(req,res)=>{
  Movie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
    .then(movie =>{
      res.redirect(`/movies/${movie._id}`)
    
  })
})

module.exports = router;