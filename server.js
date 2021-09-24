const express = require("express");

const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/entertainment");
};

//creating schema:

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  movie_name: { type: String, required: true },
  movie_genre: { type: String, required: true },
  production_year: { type: Number, required: true },
});

//connect schema to the movies collection:

const Movie = mongoose.model("movie", movieSchema);
const app = express();
app.use(express.json());


//getting all movies:
app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  //console.log(movies)
  res.status(200).send({ movies });
});

//adding new movie:

app.post("/movies", async (req, res) => {
  const movies = await Movie.create(req.body);

  return res.status(201).send({ movies });
});

//geting single movie data:
app.get("/movies/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id).lean().exec();

  res.status(200).send({ movie });
});

//patch:
app.patch("/movies/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec();

  return res.status(200).send({ movie });
});

//delete:
app.delete("/movies/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();

  res.status(200).send({ movie });
});

//server:
app.listen(8888, async function () {
  await connect();

  console.log("Charlie 1 2 3");
});
