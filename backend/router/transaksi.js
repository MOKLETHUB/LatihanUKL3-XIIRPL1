const express = require("express")
const app = express()

// call model
const transaksi = require("../models/index").tb_transaksi

// allow request body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// auth_verify
const verify = require("./auth_verify")
app.use(verify)


// get data by NISN
app.get("/:id_transaksi", async(req,res) => {
    let id_transaksi = {
        id_transaksi: req.params.id_transaksi
    }

    transaksi.findOne({where: id_transaksi, include:[{ all: true, nested: true }]})
    .then(result => {
        if(result){
            res.json({
                message: "Data founded",
                data_transaksi: result, //gas iki opo
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
    transaksi.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            message: "Data founded",
            data_transaksi: result, 
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
        kode_invoice: req.body.kode_invoice,
        id_member: req.body.id_member,
        tgl: req.body.tgl,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        biaya_tambahan: req.body.biaya_tambahan,
        diskon: req.body.diskon,
        pajak: req.body.pajak,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }

    transaksi.create(data)
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
        kode_invoice: req.body.kode_invoice,
        id_member: req.body.id_member,
        tgl: req.body.tgl,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        biaya_tambahan: req.body.biaya_tambahan,
        diskon: req.body.diskon,
        pajak: req.body.pajak,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }

    let param = {
        id_transaksi: req.body.id_transaksi
    }

    transaksi.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data updated",
            data_transaksi: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// delete data
app.delete("/:id_transaksi", async(req,res) => {
    // put data
    let param = {
        id_transaksi: req.params.id_transaksi
    }

    transaksi.destroy({where: param})
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