const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    "name": {
        type: String,
        required: [true, "El nombre del producto es obligatorio."]
    },
    "category":{
        type: String,
        required: [true, "El producto debe tener al menos una categoria."],
        enum : ['Frutas','Verduras','Granos','Frutos Secos','Especias'],
    },
    "description": {
        type: String,
        trim: true,
        required: [true, "El producto necesita una breve descripcion."],
    },
    "urlImg": {
        type: String,
        required: [true, "El producto almenos una foto."],
    },
    "price": {
        type: Number,
        required: [true, "El producto debe tener un precio de venta."]
    },
    "unitSale": {
        type: String,
        required: [true, "La unidad de venta del producto es obligatorio."],
        enum : ['Libra','Kilo','Arroba'],
    },
    "state":{
        type: String,
        require: true,
        enum: ["AVIABLE","UNAVIABLE"],
        default: "AVIABLE",
    },
    "seller_id": {
        type: Schema.Types.ObjectId,
        ref: 'Sellers.model',
        required: [true, "El producto debe tener el codigo del vendedor."]
    },
    "comments":[{
        type: [String]
    }],
    "rating":{
        type: [Number],
        enum : [1,2,3,4,5],
    }
});

module.exports = mongoose.model('products', ProductSchema)