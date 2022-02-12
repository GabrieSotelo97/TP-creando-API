const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { title } = require('process');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: ['genre']
        })
            .then(movies => {
                res.json({
                    meta:{
                        status: 200,
                        total: movies.length,
                        url: "api/movies"
                    },
                    data:movies
                })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,
            {
                include : ['genre']
            })
            .then(movie => {
                res.json({
                    meta:{
                        status: 200,
                        total: movie.length,
                        url: "api/movie"
                    },
                    data:movie
                });
            });
    },
    create: function (req,res) {
            db.Movie.create(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }
            )
            .then(movie=> {
                res.status(200).json(movie)})            
            .catch(error => res.status(500).json({error}))
    },

    destroy:(req,res)=> {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) 
        .then(()=>{
            return res.redirect('/movies')})
        .catch(error => res.send(error)) 
    }
}

module.exports = moviesController;