const express = require("express");
const bookList = require("../books_list.json");
const BookRouter = express.Router();
const pool = require("../userModel");


BookRouter.get("/", (req, res) => {
  pool.query("Select * from books", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

module.exports = BookRouter;
