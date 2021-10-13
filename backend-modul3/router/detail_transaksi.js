const express = require("express")
const app = express()

// call model
const detail_transaksi = require("../models/index").tb_detail_transaksi

// allow request body
app.use(express.urlencoded({extended:true}))

// auth_verify
const verify = require("./auth_verify")
app.use(verify)


// get data by NISN
app.get("/:id_detail_transaksi", async(req,res) => {
    let id_detail_transaksi = {
        id_detail_transaksi: req.params.id_detail_transaksi
    }

    detail_transaksi.findOne({where: id_detail_transaksi, include:[{ all: true, nested: true }]})
    .then(result => {
        if(result){
            res.json({
                message: "Data founded",
                data_detail_transaksi: result, //gas iki opo
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
    detail_transaksi.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            message: "Data founded",
            detail_transaksi: result, 
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
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
        keterangan: req.body.keterangan
    }

    detail_transaksi.create(data)
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
        id_transaksi: req.body.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
        keterangan: req.body.keterangan
    }

    let param = {
        id_detail_transaksi: req.body.id_detail_transaksi
    }

    detail_transaksi.update(data, {where: param})
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
app.delete("/:id_detail_transaksi", async(req,res) => {
    // put data
    let param = {
        id_detail_transaksi: req.params.id_detail_transaksi
    }

    detail_transaksi.destroy({where: param})
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