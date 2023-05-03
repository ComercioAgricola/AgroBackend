const mongoose = require('mongoose')
const { Schema } = mongoose

const OrdersSchema = new Schema({

    "products":[{
        type: Schema.Types.ObjectId,
        ref:'Products.model',
        required: [true, "La orden debe tener almenos un producto."]
    }],
    "seller_id":{
        type: Schema.Types.ObjectId,
        ref: 'Sellers.model',
        required: [true, "El codigo del vendedor es obligatorio."]
    },
    "purchase_id":{
        type: Schema.Types.ObjectId,
        ref: 'Buyers.model',
        required: [true, "El codigo de la compra es obligatorio."]
    },
    "state":{
        type: String,
        require: true,
        enum: ["PENDIENTE","CONFIRMADO", "EN_PREPARACION","ENVIADO","ENTREGADO","CANCELADO"],
        default: "PENDIENTE"
    },

})

module.exports = mongoose.model('orders', OrdersSchema)