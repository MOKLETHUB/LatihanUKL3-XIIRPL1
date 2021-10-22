const express = require("express")
const app = express()

// call model
const member = require("../models/index").member

// allow request body
app.use(express.urlencoded({extended:true}))

// auth_verify
const verify = require("./auth_verify")
app.use(verify)


// get data by NISN
app.get("/:id_member", async(req,res) => {
    let id_member = {
        id_member: req.params.id_member
    }

    member.findOne({where: id_member, include:[{ all: true, nested: true }]})
    .then(result => {
        if(result){
            res.json({
                message: "Data founded",
                data_member: result, //gas iki opo
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
    member.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            message: "Data founded",
            member: result, 
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
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }

    member.create(data)
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
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }

    let param = {
        id_member: req.body.id_member
    }

    member.update(data, {where: param})
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
app.delete("/:id_member", async(req,res) => {
    // put data
    let param = {
        id_member: req.params.id_member
    }

    member.destroy({where: param})
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