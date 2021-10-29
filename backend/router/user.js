const express = require("express")
const app = express()
var md5 = require('md5');

// call model
const user = require("../models/index").tb_user

// allow request body
app.use(express.urlencoded({extended:true}))

// auth_verify
// const verify = require("./auth_verify")
// app.use(verify)

// get data
app.get("/", async(req,res) => {
    user.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            user: result,
            found: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            found: false
        })
    })
})

// add data
app.post("/", async(req,res) => {
    // put data
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }

    user.create(data)
    .then(result => {
        res.json({
            message: "Data inserted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// update data
app.put("/", async(req,res) => {
    // put data
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }

    let param = {
        id_user: req.body.id_user
    }

    user.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// delete data
app.delete("/:id_user", async(req,res) => {
    // put data
    let param = {
        id_user: req.params.id_user
    }

    user.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data deleted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app;