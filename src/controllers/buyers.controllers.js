const buyer = require("../models/buyers.model")
const product = require('../models/products.model')


module.exports = class BuyersController {

  static async getAllBuyers(request, response) {
    try {
      const result = await buyer.find({});
      response.status(200).json(result);
    } catch (err) {
      response.status(404).json({ message: err.message });
    }
  }

  static async getAllProductsCar(req, res) {
    try {

      const buyerFound = await buyer.findOne({ _id: req.params.idBuyer });
      const lstProducts = await product.find({});
      if (buyerFound == null) { return res.status(200).json({ success: false, msg: 'El comprador no existe' }) }

      let productsAux = []
      buyerFound.cartProducts.map( (productMap) => {
        lstProducts.map((productAux)=>{
          if(productMap.split("/")[0] === productAux._id.toString()){
            let auxPrecio = parseFloat(productAux.price) * parseFloat(productMap.split("/")[1])
            productAux.price = auxPrecio;
            productsAux.push(productAux)
          }
        })
      });

      res.status(200).json({ success: true,productsCar: productsAux });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getBuyerById(request, response) {
    try {
      const result = await buyer.findOne({ _id: request.params.id });
      result != null ? response.status(200).json(result) : response.status(400).json({ mensaje: 'the buyer user does not exist' });
    } catch (err) {
      response.status(404).json({ message: err.message });
    }
  }



  static async agregarProducto(req, res) {
    try {
      const productId = req.params.idProduct
      const buyerId = req.params.idBuyer
      const cantidad = req.params.cantidad
      const productFound = await product.findById({ _id: productId })
      const buyerFound = await buyer.findById({ _id: buyerId })

      if (buyerFound == null) { return res.status(200).json({ success: false, msg: 'El comprador no existe' }) }
      if (productFound == null) { return res.status(200).json({ success: false, msg: 'El producto no existe' }) }

      let auxCarProduct = []


      if (buyerFound.cartProducts.length >= 1) {
        buyerFound.cartProducts.map(product => {
          let idAux = product.split("/")[0]
          if (idAux === productId) {
            let cantidadAux = parseFloat(product.split("/")[1]) + parseFloat(cantidad)
            auxCarProduct.push(productId + "/" + cantidadAux)
          } else {
            auxCarProduct.push(idAux + "/" + product.split("/")[1]);
          }
        });

        if (buyerFound.cartProducts.filter((element) => element.split("/")[0] === productId).length <= 0) {
          auxCarProduct.push(productId + "/" + cantidad);
        }
      } else {
        auxCarProduct.push(productId + "/" + cantidad)
      }
      buyerFound.cartProducts = auxCarProduct;
      await buyerFound.save()

      return res.status(200).json({ success: true, msg: 'El producto se a agregado al carrito', productsCar: auxCarProduct });

    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async totalMountCar(req, res) {
    try {
      const buyerId = req.params.idBuyer
      const buyerFound = await buyer.findById({ _id: buyerId })

      if (buyerFound == null) { return res.status(200).json({ success: false, msg: 'El comprador no existe' }) }

      let priceTotal = 0;

      buyerFound.cartProducts.forEach(async productAux => {

        let cantidadProduct = parseFloat(productAux.split("/")[1])
        const productFound = await product.findById({ _id: productAux.split("/")[0] })
        console.log(productFound.price * cantidadProduct)

        priceTotal = priceTotal + (productFound.price * cantidadProduct)

      });
      return res.status(200).json({ success: true, msg: 'El producto se a agregado al carrito' }, priceTotal);

    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async eliminarProducto(req, res) {
    try {
      const productId = req.params.idProduct
      const buyerId = req.params.idBuyer
      const productFound = await product.findById({ _id: productId })
      const buyerFound = await buyer.findById({ _id: buyerId })


      if (buyerFound == null) { return res.status(200).json({ success: false, msg: 'El comprador no existe' }) }
      if (productFound == null) { return res.status(200).json({ success: false, msg: 'El producto no existe' }) }

      let auxCarProduct = []

      buyerFound.cartProducts.forEach(product => {
        let idAux = product.split("/")[0]
        if (!(idAux === productId)) {
          auxCarProduct.push(product)
        }
      });

      buyerFound.cartProducts = auxCarProduct;
      await buyerFound.save()


      return res.status(200).json({ success: true, msg: 'El producto se a eliminado del carrito' });

    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createBuyer(req, res) {
    try {
      const { name, email, password, telephone } = req.body;

      const newBuyer = new buyer({
        name: name,
        email: email,
        password: password,
        telephone: telephone
      });

      await newBuyer.save();
      res.status(200).json(newBuyer);

    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async loginBuyers(req, res) {
    try {
      const email = req.params.email;
      const password = req.params.password;
      const buyerFound = await buyer.findOne({ email: email, password: password })

      if (!buyerFound) {
        return res.json({
          mensaje: 'Correo incorecto o Contraseña incorrecta'
        })
      }
      res.json({
        mensaje: 'Bienvenido de nuevo',
        code: buyerFound._id,
        nombre: buyerFound.name,
        correo: buyerFound.email,
        buyerFound
      })
    } catch (error) {
      res.status(40).json({ message: error });
    }
  }

  static async deleteBuyerById(request, response) {
    try {
      const id = request.params.id;
      await buyer.deleteOne({ _id: id });
      response.status(200).json({ mensaje: 'the buyer was removed' });
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }

  static async updateBuyerById(req, res) {
    try {
      const id = req.params.id;
      const updateData = req.body;

      const buyer = await buyer.findOne({ _id: id });

      if (buyer == null) {
        res.json({
          mensaje: 'Buyer does not exist'
        })

      } else {
        await buyer.updateOne({ _id: id }, updateData);
        res.status(200).json({
          mensaje: "The buyer has been updated"
        });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }

}