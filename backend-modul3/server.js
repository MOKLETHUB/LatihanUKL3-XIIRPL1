const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors()) 

app.use(express.static(__dirname))

// router
const user = require("./router/user")
const member = require("./router/member")
const paket = require("./router/paket")
const transaksi = require("./router/transaksi")
const detail_transaksi = require("./router/detail_transaksi")
const auth = require("./router/auth")

app.use("/auth", auth)
app.use("/user", user)
app.use("/member", member)
app.use("/paket", paket)
app.use("/transaksi", transaksi)
app.use("/detail_transaksi", detail_transaksi)

app.listen(8000, () => {
    console.log("Server run on 8000")
})
