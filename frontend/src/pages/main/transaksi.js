import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'
import moment from 'moment'
import Header from "../../components/Header/Header";

import {
    Table
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import s from "../../assets/css/Tables.module.scss";


class Index extends React.Component{
    constructor(){
        super()
        this.state = {
            action: "",
            id_transaksi: "",
            id_outlet: "",
            id_member: "",
            id_user: "",
            kode_invoice: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            biaya_tambahan: 0,
            diskon: 0,
            pajak: 0,
            dibayar: 0,
            status: "",
            token: "",
            data_outlet: [],
            data_member: [],
            data_user: [],
            data_transaksi: [],
            message: ""
        }
        // get token from local.storage
        if(!localStorage.getItem("token")) {
            window.location = "/login"
        } else {
            this.state.token = localStorage.getItem("token")
        }
    }

    getDataTransaksi = () => {
        let url = base_url + "/transaksi"

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data = JSON.parse(JSON.stringify(response.data.data_transaksi))
            this.setState({ data_transaksi: data })
        })
        .catch(error => this.setState({ messsage: error}))
    }

    getDataOutlet = () => {
        let url = base_url + "/outlet"

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data = JSON.parse(JSON.stringify(response.data.data_outlet))
            this.setState({ data_outlet: data })
        })
        .catch(error => this.setState({ messsage: error}))
    }

    getDataMember = () => {
        let url = base_url + "/member"

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data = JSON.parse(JSON.stringify(response.data.data_member))
            this.setState({ data_member: data })
        })
        .catch(error => this.setState({ messsage: error}))
    }

    getDataUser = () => {
        let url = base_url + "/user"

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data = JSON.parse(JSON.stringify(response.data.data_user))
            this.setState({ data_user: data })
        })
        .catch(error => this.setState({ messsage: error}))
    }

    dropData = selectedItem => {
        if(window.confirm("Yakin nih dihapus?")) {
            let url = base_url + "/transaksi/" + selectedItem.id_transaksi

            axios.delete(url, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                window.alert(response.data.message)
                this.getDataTransaksi()
            })
            .catch(error => this.setState({ messsage: error}))
        }
    }

    addData = () => {
        this.setState({
            action: "add",
            id_outlet: "",
            id_member: "",
            id_user: "",
            kode_invoice: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            biaya_tambahan: "",
            diskon: "",
            pajak: "",
            status: "",
            dibayar: "",
        })
    }

    updateData = selectedItem => {
        this.setState({
            action: "update",
            id_transaksi: selectedItem.id_transaksi,
            id_outlet: selectedItem.id_outlet,
            id_member: selectedItem.id_member,
            id_user: selectedItem.id_user,
            kode_invoice: selectedItem.kode_invoice,
            tgl: selectedItem.tgl,
            batas_waktu: selectedItem.batas_waktu,
            tgl_bayar: selectedItem.tgl_bayar,
            biaya_tambahan: selectedItem.biaya_tambahan,
            diskon: selectedItem.diskon,
            pajak: selectedItem.pajak,
            status: selectedItem.status,
            dibayar: selectedItem.dibayar
        })
    }

    submitData = event => {
        event.preventDefault()

        let data = {
            id_transaksi: this.state.id_transaksi,
            id_outlet: this.state.id_outlet,
            id_member: this.state.id_member,
            id_user: this.state.id_user,
            kode_invoice: this.state.kode_invoice,
            tgl: this.state.tgl,
            batas_waktu: this.state.batas_waktu,
            tgl_bayar: this.state.tgl_bayar,
            biaya_tambahan: this.state.biaya_tambahan,
            diskon: this.state.diskon,
            pajak: this.state.pajak,
            status: this.state.status,
            dibayar: this.state.dibayar
        }

        let url = base_url + "/transaksi"
        
        if(this.state.action === "add"){
            axios.post(url, data, { headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                this.getDataTransaksi()
            })
            .catch(error => this.setState({ messsage: error}))
        } else if(this.state.action === "update"){
            axios.put(url, data, { headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                this.getDataTransaksi()
            })
            .catch(error => this.setState({ messsage: error}))
        }
    }

    componentDidMount(){
        this.getDataTransaksi()
        this.getDataOutlet()
        this.getDataMember()
        this.getDataUser()
    }
    render(){
        return(
            <>
                <Header/>
                <div className="container pt-4">
                    <h3 className="font-weight-bold text-muted text-uppercase mb-3">Crud Transaksi</h3>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="modalData" tabindex="-1" aria-labelledby="modalDataLabel" aria-hidden="true">
                        {/* <!-- Vertically centered modal --> */}
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalDataLabel">{this.state.action} Data</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form method="POST" onSubmit={ev => this.submitData(ev)}>
                                    <div className="modal-body">
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Kode Invoice</label>
                                            <input required type="text" className="form-control" value={this.state.kode_invoice} onChange={ev => this.setState({kode_invoice: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Outlet</label>
                                            <select className="form-select" aria-label="Default select example"
                                                value={this.state.id_outlet} onChange={ev => this.setState({id_outlet: ev.target.value})}>
                                                <option selected>Open this select menu</option>
                                                {
                                                    this.state.data_outlet.map(item => (
                                                        <option value={item.id_outlet}>{item.nama}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">user</label>
                                            <select className="form-select" aria-label="Default select example"
                                                value={this.state.id_user} onChange={ev => this.setState({id_user: ev.target.value})}>
                                                <option selected>Open this select menu</option>
                                                {
                                                    this.state.data_user.map(item => (
                                                        <option value={item.id_user}>{item.nama}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">member</label>
                                            <select className="form-select" aria-label="Default select example"
                                                value={this.state.id_member} onChange={ev => this.setState({id_member: ev.target.value})}>
                                                <option selected>Open this select menu</option>
                                                {
                                                    this.state.data_member.map(item => (
                                                        <option value={item.id_member}>{item.nama}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Tanggal Laundry</label>
                                            <input required type="date" className="form-control" value={moment.utc(this.state.tgl).format("yy-MM-DD")} onChange={ev => this.setState({tgl: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Batas Waktu</label>
                                            <input required type="date" className="form-control" value={moment.utc(this.state.batas_waktu).format("yy-MM-DD")} onChange={ev => this.setState({batas_waktu: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Tanggal Bayar</label>
                                            <input required type="date" className="form-control" value={moment.utc(this.state.tgl_bayar).format("yy-MM-DD")} onChange={ev => this.setState({tgl_bayar: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Biaya Tambahan</label>
                                            <input required type="text" className="form-control" value={this.state.biaya_tambahan} onChange={ev => this.setState({biaya_tambahan: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Diskon</label>
                                            <input required type="text" className="form-control" value={this.state.diskon} onChange={ev => this.setState({diskon: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Pajak</label>
                                            <input required type="text" className="form-control" value={this.state.pajak} onChange={ev => this.setState({pajak: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Dibayar</label>
                                            <input required type="text" className="form-control" value={this.state.dibayar} onChange={ev => this.setState({dibayar: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Status</label>
                                            <input required type="text" className="form-control" value={this.state.status} onChange={ev => this.setState({status: ev.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* Modal-Details */}
                    <div className="modal fade" id="modalDetailTransaksi" tabindex="-1" aria-labelledby="modalDataLabel" aria-hidden="true">
                        {/* <!-- Vertically centered modal --> */}
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalDataLabel">Details Transaksi</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div>
                                    Detail transaksi
                                </div>
                            </div>
                        </div>
                    </div>

                    <Widget className="p-4">
                    <div className={s.tableTitle}>
                        <div className="headline-2">Page Transaksi</div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.addData()}>Add Data</button>
                        </div>
                    </div>
                    <div className="widget-table-overflow">
                        <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                            <thead>
                            <tr>
                                <th className="w-25">Invoice</th>
                                <th className="w-25">Status</th>
                                <th className="w-25">Tanggal</th>
                                <th className="w-25">Batas Waktu</th>
                                <th className="w-25">Tanggal Bayar</th>
                                <th className="w-25">Biaya Tambahan</th>
                                <th className="w-25">Diskon</th>
                                <th className="w-25">Pajak</th>
                                <th className="w-25">Dibayar</th>
                                <th className="w-25">Option</th>
                            </tr>
                            </thead>
                            <tbody>
                                { this.state.data_transaksi.map( item => (
                                    <tr>
                                        <td><a href="#" className="badge badge-dark" data-bs-toggle="modal" data-bs-target="#modalDetailTransaksi">{item.kode_invoice}</a></td>
                                        <td>
                                            {item.status === "lunas" ? (
                                                <span className="badge badge-success">
                                                    {item.status}
                                                </span>
                                            ):(
                                                <span className="badge badge-danger">
                                                    {item.status}
                                                </span>
                                            )}
                                        </td>
                                        <td>{moment.utc(item.tgl).format("MM/DD/YY")}</td>
                                        <td>{moment.utc(item.batas_waktu).format("MM/DD/YY")}</td>
                                        <td>{moment.utc(item.tgl_bayar).format("MM/DD/YY")}</td>
                                        <td>{item.biaya_tambahan}</td>
                                        <td>{item.diskon}</td>
                                        <td>{item.pajak}</td>
                                        <td>{item.dibayar}</td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                                    Option
                                                </button>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item text-primary" href="#" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.updateData(item)}>Edit</a>
                                                    <a class="dropdown-item text-danger" href="#" onClick={() => this.dropData(item)}>Delete</a>
                                                    <a class="dropdown-item text-warning" href="#" data-bs-toggle="modal" data-bs-target="#modalDetailTransaksi">Details</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </Table>
                    </div>
                </Widget>
                </div>
            </>
        )
    }
}

export default Index;