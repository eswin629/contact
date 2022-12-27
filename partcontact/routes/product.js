var express = require("express");
var router = express.Router();

const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// get all
router.get("/", function (req, res, next) {
  Product.findAll()
    .then((data) => {
      res.render("product", {
        title: "Daftar Produk",
        products: data,
      });
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//product detail
router.get("/productdetail", function (req, res, next) {
  var id = req.query.id;
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.render("productdetail", {
          title: "Detail Produk",
          product: data,
        });
      } else {
        res.status(404).send({
          msg: "Data not found",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

router.get("/detail/:id", function (req, res, next) {
  var id = parseInt(req.params.id);
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.render("productdetail", {
          title: "Detail Produk",
          product: data,
        });
      } else {
        res.status(404).send({
          msg: "Data not found",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//insert
router.post("/", function (req, res, next) {
  var product = {
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
  };
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//update
router.put("/:id", function (req, res, next) {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num > 0) {
        res.send({
          msg: "Update success!",
        });
      } else {
        res.status(404).send({
          msg: "Update failed",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//delete
router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num > 0) {
        res.send({
          msg: "Delete success!",
        });
      } else {
        res.status(404).send({
          msg: "Delete failed",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//add product
router.get("/add", function (req, res, next) {
  res.render("add", { title: "Add Product" });
});

router.post("/add", function (req, res, next) {
  var product = {
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
  };
  Product.create(product)
    .then((data) => {
      res.redirect("/product");
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//edit product
router.get("/edit/:id", function (req, res, next) {
  const id = req.params.id;
  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.render("edit", { title: "Edit Product", item: data });
      } else {
        res.status(404).send({
          msg: "Data not found",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//update product
router.post("/edit/:id", function (req, res, next) {
  const id = req.params.id;
  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num > 0) {
        res.redirect("/product");
      } else {
        res.status(404).send({
          msg: "Update failed",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

//delete product
router.get("/delete/:id", function (req, res, next) {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num > 0) {
        res.redirect("/product");
      } else {
        res.status(404).send({
          msg: "Delete failed",
        });
      }
    })
    .catch((err) => {
      res.json({
        info: "Error",
        message: err.message,
      });
    });
});

module.exports = router;
