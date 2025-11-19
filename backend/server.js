const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

// Inicializar app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect("mongodb+srv://aldairm945:aldairm945@cluster01.ncdowr1.mongodb.net/gametracker")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Error MongoDB:", err));

// Rutas
app.post("/user", async (req, res) => {
  try {
    const nuevoUser = await User.create(req.body);
    res.json({ mensaje: "Usuario creado", data: nuevoUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/user", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Servidor
app.listen(4000, () =>
  console.log("Servidor listo en http://localhost:4000")
);
