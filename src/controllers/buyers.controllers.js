const Buyer = require("../models/buyers.model")

module.exports = class BuyersController {

  static async getAllBuyers(request, response) {
    try {
      const result = await Buyer.find({});
      response.status(200).json(result);
    } catch (err) {
      response.status(404).json({ message: err.message });
    }
  }

  static async getBuyerById(request, response) {
    try {
      const result = await Buyer.findOne({ _id: request.params.id });
      result != null ? response.status(200).json(result) : response.status(400).json({ mensaje: 'the buyer user does not exist' });
    } catch (err) {
      response.status(404).json({ message: err.message });
    }
  }

  static async createBuyer(req, res) {
    try {
      const { name, email, password, telephone } = req.body;

      const newBuyer = new Buyer({
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
      const buyerFound = await Buyer.findOne({ email: email, password: password })

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
      await Buyer.deleteOne({ _id: id });
      response.status(200).json({ mensaje: 'the buyer was removed' });
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }

  static async updateBuyerById(req, res) {
    try {
      const id = req.params.id;
      const updateData = req.body;

      const buyer = await Buyer.findOne({ _id: id });

      if (buyer == null) {
        res.json({
          mensaje: 'Buyer does not exist'
        })

      } else {
        await Buyer.updateOne({ _id: id }, updateData);
        res.status(200).json({
          mensaje: "The buyer has been updated"
        });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }

}