const seller = require('../models/sellers.model')
const product = require('../models/products.model')
const jwt = require('jsonwebtoken');


module.exports = class SellersController {

  static async getAllSellers(req, res) {
    try {
      const result = await seller.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }



  static async getAllProductsSeller(req, res) {
    try {
      const idSeller = req.params.id;
      const products = await product.find({});
      const userFound = await seller.findOne({ _id: idSeller })

      if (!userFound) { return res.status(202).json({ success: false, msg: 'El usuario no existe' }) }

      let auxProducts = []

      userFound.products.map((idProduct) => {
        products.map((auxProduct) => {
          if (idProduct.equals(auxProduct._id)) {
            auxProducts = auxProducts.concat(auxProduct);
          }
        })
      });

      auxProducts = auxProducts.reverse()

      res.status(200).json({ success: true, auxProducts });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createProduct(req, res) {
    try {

      const idSeller = req.params.id
      const dataProduct = req.body

      const userFound = await seller.findOne({ _id: idSeller })
      if (!userFound) { return res.status(202).json({ success: false, msg: 'El usuario no existe' }) }
      const newProduct = new product({
        name: dataProduct.name,
        category: dataProduct.category,
        unitSale: dataProduct.unitSale,
        price: dataProduct.price,
        urlImg: dataProduct.urlImg,
        description: dataProduct.description,
        seller_id: idSeller
      })
      const saveProduct = await newProduct.save();

      userFound.products = userFound.products.concat(saveProduct._id);
      await userFound.save()

      return res.status(200).json({ success: true, msg: '¡El producto se ha creado correctamente!' });

    } catch (err) {
      console.log(err)
      res.status(404).json({ message: err });
    }
  }

  static async updateProduct(req, res) {
    try {

      const idProduct = req.params.idProduct
      const dataProduct = req.body

      const productFound = await product.findOne({ _id: idProduct })
      if (!productFound) { return res.status(202).json({ success: false, msg: 'El producto no existe' }) }
  
      await productFound.updateOne(dataProduct)

      return res.status(200).json({ success: true, msg: '¡El producto se ha actualizado correctamente!' });

    } catch (err) {
      console.log(err)
      res.status(404).json({ message: err });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const idSeller = req.params.idSeller
      const idProduct = req.params.idProduct

      const userFound = await seller.findOne({ _id: idSeller })
      if (!userFound) { return res.status(202).json({ success: false, msg: 'El usuario no existe' }) }

      const productFound = await product.findOne({ _id: idProduct })
      if (!productFound) { return res.status(202).json({ success: false, msg: 'El producto no existe' }) }

      let productsAux = [];

      userFound.products.map((productAux) => {
        if (!productAux._id.equals(productFound._id)) {
          productsAux.push(productAux);
        }
      })
      userFound.products = productsAux;
      await userFound.save()
      await product.deleteOne({ _id: idProduct });

      return res.status(200).json({ success: true, msg: '¡El producto se ha eliminado correctamente!' });

    } catch (err) {
      console.log(err)
      res.status(404).json({ message: err });
    }
  }
}