const Empleado = require('../models/empleado');
const crypto = require('crypto-random-string');

//POST Nuevo empleado
module.exports.nuevoEmpleado = (req, res) => {

    let empleado = new Empleado({
        email: req.body.email,
        tag: crypto(15)
    });

    if (req.user.email === 'admin') {
        if (req.user.password === '1234567890') {
            empleado.save((err, result) => {
                if (err) {
                    //Error: token de Admin no válido
                    return res.status(500);
                } else {
                    res.status(201).jsonp(result);
                }
            });
        } else {
            res.status(403);
        }
    } else {
        res.status(403);
    }
};

//POST Nuevo tag empleado
module.exports.nuevoTag = (req, res) => {
    if(req.user.email === 'admin' && req.user.password === '1234567890'){
        Empleado.findOne({email: req.body.email}, (err, empleado) => {
            if(err)
                return res.status(404);
            empleado.tag = crypto(15);
            empleado.save((err, result) => {
                if(err) return res.status(500);
                res.status(200).jsonp({
                    email: result.email,
                    tag: result.tag
                });
            });
        })
    }else{
        res.status(403);
    }
};

//POST Listar empleados
module.exports.listaEmpleados = (req, res) => {
    if (req.user.email === 'admin') {
        if (req.user.password === '1234567890') {
            Empleado.find((err, empleado) => {
                if (err)
                    return res.status(404);
                result.status(200).jsonp(empleado);
            });
        } else {
            res.status(403);
        }
    } else {
        res.status(403);
    }
};

//GET Comprobar autorización de usuario
module.exports.autorizacion = (req, res) => {
    Empleado.findOne({tag: req.params.tag}, (err, empleado) => {
       if(err)
           return res.status(403);
       res.status(200).jsonp({
           email: empleado.email
       })
    });
};