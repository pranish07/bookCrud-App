import { Op } from "sequelize";
import bookModel from "../models/bookModel.js";
import textConstants from "../constants/textConstants.js";
import urlConstants from "../constants/urlConstants.js";

export default class BookController {
  async addBook(req, res, imageName) {
    try{
    const data = await bookModel.create({ ...req.body, image: imageName });
    console.log(data);
    if (data) {
      res.json(data);
    } else {
      res.json({ success: false, message: "Error during adding the book" });
    }}
    catch(err){
     return res.json({success:false,message:"Error while querying in DB"})
    }
  }

  //get book by their id
  async getBookByID(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.findByPk(id);

      if (data) {
        res.json(data);
      } else {
        res.json([]);
      }
    } else {
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  //update book

  async updateBook(req, res) {
    const { id } = req.params;
    if (id) {
      req.body;
      const data = await bookModel.update(req.body, {
        where: {
          id,
        },
      });
      if (data[0]) {
        res.json({ success: true, message: "updated book" });
      } else {
        res.json({ success: false, message: "Couldn't update book" });
      }
    } else {
      res.join({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  //delete book

  async deleteBook(req, res) {
    const { id } = req.params;
    if (id) {
      req.body;
      const data = await bookModel.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.json({ success: true, message: "book deleted" });
      } else {
        res.json({ success: false, message: "Couldn't delete book" });
      }
    } else {
      res.join({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  async searchBook(req, res) {
    const { q } = req.query;
    if (q) {
      const data = await bookModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${q}%`,
            },
            author: {
              [Op.like]: `%${q}%`,
            },
          },
        },
      // if raw = true; d.dataValues.image = d.image
      });

      console.log(data);
      for (let d of data) {
        d.dataValues.image = urlConstants.IMG_PATH_URL + d.dataValues.image;
        console.log(d.dataValues.image);
      }
      res.json(data);
    } else {
      res.json({ success: false, Message: "Empty Query search query" });
    }
  }

  // get all books

  async getBooks(req, res) {
    let { limit } = req.query;
    if (!limit) limit = 20;
    try {
      const data = await bookModel.findAll({
        limit: parseInt(limit),
      });
      // console.log(data);
      for (let d of data) {
        d.dataValues.image = urlConstants.IMG_PATH_URL + d.dataValues.image;
        // console.log(d.dataValues.image);
      }

      res.json(data);
    } catch (err) {
      console.log({ success: false, message: err });
    }
  }
}
