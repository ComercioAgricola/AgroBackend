const mongoose = require('mongoose')
const {Schema} = mongoose

const SellersSchema = new Schema({ 
    "user_id": {
        type: Schema.Types.ObjectId,
        ref: 'Users.model',
        required: [true, "El codigo del usuario es obligatorio."]
    },
    "storeName": {
        type: String,
        required: [true, "El nombre del negocio es obligatorio."],
        trim: true
    },
    "storeDescription": {
        type: String,
        default: "Este es nuestro pequeño emprendimiento",
        trim: true
    },
    
    "accountNumber":{
        type: String,
        required: [true, "El numero de cuenta es obligatorio"]
    },
    "products":[{
        type: Schema.Types.ObjectId,
        ref:'Products.model'
    }],
    "orders":[{
        type: Schema.Types.ObjectId,
        ref: 'Orders.model'
    }]
})

module.exports = mongoose.model('sellers', SellersSchema)