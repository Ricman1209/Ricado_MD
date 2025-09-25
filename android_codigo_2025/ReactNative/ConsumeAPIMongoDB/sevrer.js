// server.js
const express = require('express');
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

const uri = "mongodb+srv://202160546:Mauricio.2109@maudb.bhtzy.mongodb.net/?retryWrites=true&w=majority&appName=MauDB"; // remplaza con tu cadena de conexión
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db("sample_mflix");
  const movies = db.collection("movies");

  // Endpoint: obtener primeros 20 registros con poster, title, fullplot
  app.get("/movies", async (req, res) => {
    const data = await movies
      .find({}, { projection: { poster: 1, title: 1, fullplot: 1 } })
      .limit(60)
      .toArray();
    res.json(data);
  });

  app.listen(8081, () => console.log("Servidor corriendo en http://localhost:8081"));
}

main().catch(console.error);