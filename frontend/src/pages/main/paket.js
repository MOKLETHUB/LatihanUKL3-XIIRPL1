import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'
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
            id_paket: "",
            id_outlet: "",
            jenis: "",
            nama_paket: "",
            harga: "",
            token: "",
            data_paket: [],
            data_outlet: [],
            message: ""
        }
        // get token from local.storage
        if(!localStorage.getItem("token")) {
            window.location = "/login"
        } else {
            this.state.token = localStorage.getItem("token")
        }
    }

    getData = () => {
        let url = base_url + "/paket"

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data = JSON.parse(JSON.stringify(response.data.data_paket))
            this.setState({ data_paket: data })
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

    dropData = selectedItem => {
        if(window.confirm("Yakin nih dihapus?")) {
            let url = base_url + "/paket/" + selectedItem.id_paket

            axios.delete(url, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => this.setState({ messsage: error}))
        }
    }

    addData = () => {
        this.setState({
            action: "add",
            id_paket: "",
            id_outlet: "",
            jenis: "",
            nama_paket: "",
            harga: ""
        })
    }

    updateData = selectedItem => {
        this.setState({
            action: "update",
            id_paket: selectedItem.id_paket,
            id_outlet: selectedItem.id_outlet,
            jenis: selectedItem.jenis,
            nama_paket: selectedItem.nama_paket,
            harga: selectedItem.harga
        })
    }

    submitData = event => {
        event.preventDefault()

        let data = {
            id_paket: this.state.id_paket,
            id_outlet: this.state.id_outlet,
            jenis: this.state.jenis,
            nama_paket: this.state.nama_paket,
            harga: this.state.harga
        }

        let url = base_url + "/paket"
        
        if(this.state.action === "add"){
            axios.post(url, data, { headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                this.getData()
            })
            .catch(error => this.setState({ messsage: error}))
        } else if(this.state.action === "update"){
            axios.put(url, data, { headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                this.getData()
            })
            .catch(error => this.setState({ messsage: error}))
        }
    }

    componentDidMount(){
        this.getData()
        this.getDataOutlet()
    }
    render(){
        return(
            <>
                <Header/>
                <div className="container pt-4">
                    <h3 className="font-weight-bold text-muted text-uppercase mb-3">Crud Paket</h3>
                    <div>
                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="modalData" tabindex="-1" aria-labelledby="modalDataLabel" aria-hidden="true">
                            {/* <!-- Vertically centered modal --> */}
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="modalDataLabel">Add Data</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form method="POST" onSubmit={ev => this.submitData(ev)}>
                                        <div className="modal-body">
                                                <div className="mb-3 col-6">
                                                    <label className="form-label">Nama Paket</label>
                                                    <input required type="text" className="form-control" value={this.state.nama_paket} onChange={ev => this.setState({nama_paket: ev.target.value})}/>
                                                </div>
                                                <div className="mb-3 col-6">
                                                    <label className="form-label">Jenis Paket</label>
                                                    <input required type="text" className="form-control" value={this.state.jenis} onChange={ev => this.setState({jenis: ev.target.value})}/>
                                                </div>
                                                <div className="mb-3 col-6">
                                                    <label className="form-label">Harga</label>
                                                    <input required type="text" className="form-control" value={this.state.harga} onChange={ev => this.setState({harga: ev.target.value})}/>
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
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Widget className="p-4">
                        <div className={s.tableTitle}>
                            <div className="headline-2">Page Paket</div>
                            <div className="d-flex">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.addData()}>Add Data</button>
                            </div>
                        </div>
                        <div className="widget-table-overflow">
                            <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th className="w-25">Nama paket</th>
                                    <th className="w-25">Jenis</th>
                                    <th className="w-25">Harga</th>
                                    <th className="w-25">Outlet</th>
                                    <th className="w-25">Option</th>
                                </tr>
                                </thead>
                                <tbody>
                                { this.state.data_paket.map( item => (
                                <tr>
                                    <td>{item.id_paket}</td>
                                    <td>{item.nama_paket}</td>
                                    <td>{item.jenis}</td>
                                    <td>Rp{item.harga},00</td>
                                    <td>{item.tb_outlet.nama}</td>
                                    <td>
                                        <div class="btn-group">
                                            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                                Option
                                            </button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item text-primary" href="#" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.updateData(item)}>Edit</a>
                                                <a class="dropdown-item text-danger" href="#" onClick={() => this.dropData(item)}>Delete</a>
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