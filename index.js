const express = require("express");
const BookRouter = require("./routes/books.js");
const app = express();
app.use(express.json());

app.use("/api/v1/books/", BookRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
