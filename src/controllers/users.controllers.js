const user = require('../models/users.model')
const buyer = require('../models/buyers.model')
const seller = require('../models/sellers.model')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const { getToken, getTokenData } = require('../config/jwt.config');
const { getTemplate, sendEmail } = require('../config/mail.config');

const saltRounds = 10;

module.exports = class BuyersController {

    static async singUp(req, res) {
        try {

            const { type, name, email, password, telephone, location, urlImg, address, storeName, storeDescription, accountNumber } = req.body;
            const userFound = await user.findOne({ email: email })
            if (userFound != null) {
                return res.status(202).json({success: false, msg: 'Ya existe un usuario con el correo ingresado' });
            }
            const newUser = new user({
                type: type,
                name: name,
                email: email,
                password: await promisify(bcrypt.hash)(password, saltRounds),
                telephone: telephone,
                location: location,
                urlImg: urlImg,
            });
            await newUser.save();
            const token = getToken({ email });
            const template = getTemplate(name, token);
            
            if (type != "SELLER") {
                const newBuyer = new buyer({
                    user_id: newUser._id,
                    address: address
                });
                await newBuyer.save();
            } else {
                const newSeller = new seller({
                    user_id: newUser._id,
                    storeName: storeName,
                    storeDescription: storeDescription,
                    accountNumber: accountNumber,
                });
                await newSeller.save();
            }

            await sendEmail(email, 'Verificacion de la cuenta', template);

            return res.status(200).json({ success: true, msg: '¡Registro exitoso! Recuerda verificar tu cuenta' });
        } catch (error) {
            console.log(error)
            res.status(404).json({ success: false, msg: error.message });
        }
    }

    static async confirmSingUp(req, res) {
        try {
            const token = req.params.token;
            const data = await getTokenData(token);
            if (data == null) { return res.status(200).json({ success: false, msg: 'Error al obtener data' }) }

            const { email } = data.data
            const userVerified = await user.findOne({ email }) || null;

            if (userVerified == null) { return res.status(200).json({ success: false, msg: 'No existe un usuario con el correo: ' + email }) }

            userVerified.state = 'VERIFIED'
            userVerified.save();

            return res.status(200).json({ success: true, msg:'El correo se a verificado con exito'});

        } catch (error) {
            return res.status(404).json({ success: false, msg: 'Error al confirmar el usuario ' + error.message });
        }
    }

    static async singIn(req, res) {
        try {
            const { email, password } = req.params;
            const userFound = await user.findOne({ email: email })

            if (!userFound) { return res.status(202).json({ success: false, msg: 'El correo ingresado es incorrecto' }) }

            const match = await bcrypt.compare(password, userFound.password);

            if (userFound.state == 'VERIFIED') {
                if (match) {
                    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET)
                    if (userFound.type != "SELLER") {
                        const dataBuyer = await buyer.findOne({ user_id: userFound._id });
                        return res.status(202).json({ success: true, msg: 'Inicio de sesion exitoso', userFound, dataBuyer, token });
                    } else {
                        const dataSeller = await seller.findOne({ user_id: userFound._id });
                        return res.status(200).json({ success: true, msg: 'Inicio de sesion exitoso', userFound, dataSeller, token });
                    }
                } else {
                    return res.status(202).json({ success: false, msg: 'La contraseña ingresada es incorrecta' })
                }
            } else {
                return res.status(202).json({ success: false, msg: 'Tu cuenta no ha sido verificada' })
            }
        } catch (error) {
            return res.status(404).json({ success: false, msg: 'Error al iniciar sesion ' + error.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const result = await user.find({});
            res.status(200).json({ success: true, msg: "Los usuarios en la db son:", result });
        } catch (err) {
            response.status(404).json({ success: false, msg: err.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const result = await user.findOne({ _id: req.params.id });
            result != null
                ? res.status(200).json({ success: true, msg: "El usuario encontrado es:", result })
                : res.status(204).json({ success: false, mensaje: 'the buyer user does not exist' });
        } catch (err) {
            res.status(404).json({ success: false, msg: err.message });
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