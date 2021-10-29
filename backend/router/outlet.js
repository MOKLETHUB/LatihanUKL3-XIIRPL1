const express = require("express")
const app = express()

// call model
const outlet = require("../models/index").tb_outlet

// allow request body
app.use(express.urlencoded({extended:true}))

// auth_verify
const verify = require("./auth_verify")
app.use(verify)


// get data by NISN
app.get("/:id_outlet", async(req,res) => {
    let id_outlet = {
        id_outlet: req.params.id_outlet
    }

    outlet.findOne({where: id_outlet, include:[{ all: true, nested: true }]})
    .then(result => {
        if(result){
            res.json({
                message: "Data founded",
                data_outlet: result, //gas iki opo
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
    outlet.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            message: "Data founded",
            outlet: result, 
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
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }

    outlet.create(data)
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
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }

    let param = {
        id_outlet: req.body.id_outlet
    }

    outlet.update(data, {where: param})
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
app.delete("/:id_outlet", async(req,res) => {
    // put data
    let param = {
        id_outlet: req.params.id_outlet
    }

    outlet.destroy({where: param})
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