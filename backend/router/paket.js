const express = require("express")
const app = express()

// call model
const paket = require("../models/index").tb_paket

// allow request body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// auth_verify
const verify = require("./auth_verify")
app.use(verify)


// get data by NISN
app.get("/:id_paket", async(req,res) => {
    let id_paket = {
        id_paket: req.params.id_paket
    }

    paket.findOne({where: id_paket, include:[{ all: true, nested: true }]})
    .then(result => {
        if(result){
            res.json({
                message: "Data founded",
                data_paket: result, //gas iki opo
                found: true
            })
        } else {
            res.json({
                message: "Data not found",
                found: false
            })
        }
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// get data
app.get("/", async(req,res) => {
    paket.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            message: "Data founded",
            data_paket: result, 
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
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        nama_paket: req.body.nama_paket,
        harga: req.body.harga 
    }

    paket.create(data)
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
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        nama_paket: req.body.nama_paket,
        harga: req.body.harga 
    }

    let param = {
        id_paket: req.body.id_paket
    }

    paket.update(data, {where: param})
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
app.delete("/:id_paket", async(req,res) => {
    // put data
    let param = {
        id_paket: req.params.id_paket
    }

    paket.destroy({where: param})
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