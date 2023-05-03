const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    "type": {
        type: String,
        enum: ['BUYER', 'SELLER'],
        required: [true, "El tipo de usuario es obligatorio."]
    },
    "name": {
        type: String,
        required: [true, "El nombre es obligatorio."]
    },
    "telephone": {
        type: String,
        required: [true, "El telefono es obligatorio."],
        minLength: 10,
        maxLength: 10
    },
    "location": {
        type: String,
        required: [true, "La ubicacion es obligatoria"]
    },
    "email": {
        type: String,
        required: [true, "El correo es obligatorio."],
        unique: true
    },
    "password": {
        type: String,
        required: [true, "La contraseña es obligatorio."],
    }, 
    "urlImg": {
        type: String,
        default: "https://res.cloudinary.com/dymmwpkdg/image/upload/v1682895835/mediaAgroMarketPlace/zcf0qvxjnpqmabjjykkh.svg"
    },
    "state": {
        type: String,
        require: true,
        enum: ["UNVERIFIED", "VERIFIED"],
        default: "UNVERIFIED",
    },
})

UserSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject.password 
    }
})

module.exports = mongoose.model('users', UserSchema)