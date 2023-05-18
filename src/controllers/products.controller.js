const user = require('../models/users.model')
const buyer = require('../models/buyers.model')
const seller = require('../models/sellers.model')
const product = require('../models/products.model')

module.exports = class ProductsController {

    static async getAllProducts(req, res) {
        try {
            const result = await product.find({});
            res.status(200).json({ success: true, msg: "Los productos en la db son:", result });
        } catch (err) {
            response.status(404).json({ success: false, msg: err.message });
        }
    }

    static async getAllLastProducts(req, res) {
        try {
            let result = await product.find({});

            result = result.reverse().slice(0, 20)
            res.status(200).json({ success: true, msg: "Los productos en la db son:", result });
        } catch (err) {
            response.status(404).json({ success: false, msg: err.message });
        }
    }



    static async getProductById(id) {
        try {
            const result = await product.findOne({ _id: id })
            return result;
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async getProductSelecById(req,res) {
        try {
            const id = req.params.id
            const result = await product.findOne({ _id: id })
            return res.status(200).json({ success: true, msg:'El producto fue encontrado', dataProduct:result});
        } catch (err) {
            return res.status(404).json({ success: true, message: err.message });
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