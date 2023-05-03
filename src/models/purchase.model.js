const mongoose = require('mongoose')
const { Schema } = mongoose

const PurchaseSchema = new Schema({

    "purchaseDate": {
        type: Date,
        require: true,
        default: Date.now
    },
    "totalAmount": {
        type: Number,
        required: [true, "El valor total es obligatorio."]
    },
    "paymentMethod": {
        type: String,
        enum: ["DEBIT", "CREDIT"],
        required: [true, "El metodo de pago es obligatorio."]
    },
    "products": [{
        type: Schema.Types.ObjectId,
        ref: 'Products.model',
        required: [true, "La compra requiera al menos un producto."]
    }],
    "cardNumber": {
        type: String,
        required: [true, "El numero de la targeta es obligatorio."]
    },
    "cardExpiration": {
        type: String,
        required: [true, "La fecha de expiracion de la targeta el obligatorio."]
    },
    "cardCVC": {
        type: String,
        required: [true, "El codigo de seguridad es obligatorio."]
    },
    "state": {
        type: String,
        require: true,
        enum: ["PENDIENTE", "CONFIRMADO", "CANCELADO"],
        default: "PENDIENTE"
    },
    "buyers_id": {
        type: Schema.Types.ObjectId,
        ref: 'Buyers.model',
        required: [true, "El codigo del comprador es obligatorio."]
    }
});

module.exports = mongoose.model('purchase', PurchaseSchema)