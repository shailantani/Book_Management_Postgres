const express = require("express");
const dotenv = require("dotenv");
const bookList = require("../books_list.json");
const BookRouter = express.Router();
const pool = require("../userModel");
const table = process.env.table;

BookRouter.get("/", (req, res) => {
  pool.query(`SELECT * FROM ${table} `, (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
});

//want to try how to get the info according to not only id, but also maybe author name.

BookRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results.rows);
    }
  });
});

BookRouter.post("/", (req, res) => {
  const { id, name, author } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: "false", message: "Please provide the book name" });
  } else {
    pool.query(
      `INSERT INTO ${table} (id, name, author) VALUES ($1, $2, $3) RETURNING *`,
      [id, name, author],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  }
});

BookRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, author } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: "false", message: "Please provide the book name" });
  } else {
    pool.query(
      `UPDATE ${table} SET name = $1, author = $2 WHERE id = $3 RETURNING *`,
      [name, author, id],
      (error, results) => {
        if (error) {
          throw error;
        } else if (results.rowCount === 0) {
          res
            .status(404)
            .json({ success: "false", message: "Enter an appropriate id" });
        } else {
          res.status(200).json({ success: "true", data: results.rows });
        }
      }
    );
  }
});

BookRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.query(`DELETE FROM ${table} WHERE id = $1`, [id], (error, results) => {
    if (error) {
      throw error;
    } else if (results.rowCount === 0) {
      res
        .status(400)
        .json({ success: "false", message: "Enter an appropraite id" });
    } else {
      res.status(200).json({ success: "true", message: "succesfully deleted" });
    }
  });
});

module.exports = BookRouter;
