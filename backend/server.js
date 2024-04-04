const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const FilmRouter = require("./routers/FilmRouter");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin:'http://localhost:3000'}));

app.use("/films", FilmRouter);

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});