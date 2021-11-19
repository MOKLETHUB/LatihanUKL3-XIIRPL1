import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'

import {
    Table
  } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import s from "../../assets/css/Tables.module.scss";
import Header from "../../components/Header/Header";

import ellieSmithImg from "../../assets/tables/ellieSmithImg.png";

class Index extends React.Component{
    constructor(){
        super()
        this.state = {
            action: "",
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            data_member: [],
            token: "",
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

    dropData = selectedItem => {
        if(window.confirm("Yakin nih dihapus?")) {
            let url = base_url + "/member/" + selectedItem.id_member

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
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
        })
    }

    updateData = selectedItem => {
        this.setState({
            action: "update",
            id_member: selectedItem.id_member,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            jenis_kelamin: selectedItem.jenis_kelamin,
            tlp: selectedItem.tlp
        })
    }

    submitData = event => {
        event.preventDefault()

        let data = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }

        let url = base_url + "/member"

        if(this.state.action === "add"){
            axios.post(url, data, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                this.getData()
            })
            .catch(error => this.setState({message: error}))
        } else if(this.state.action === "update"){
            axios.put(url, data, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                this.getData()
            })
            .catch(error => this.setState({message: error}))
        }
    }

    componentDidMount() {
        this.getData()
    }
    render(){
        return(
            <>
                <Header/>
                <div className="container pt-4">
                    <h3 className="font-weight-bold text-muted text-uppercase mb-3">Crud Member</h3>
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
                                                <label className="form-label">Nama</label>
                                                <input required type="text" className="form-control" value={this.state.nama} onChange={ev => this.setState({nama: ev.target.value})}/>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label className="form-label">Alamat</label>
                                                <input required type="text" className="form-control" value={this.state.alamat} onChange={ev => this.setState({alamat: ev.target.value})}/>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label className="form-label">Jenis Kelamin</label>
                                                <input required type="text" className="form-control" value={this.state.jenis_kelamin} onChange={ev => this.setState({jenis_kelamin: ev.target.value})}/>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <label className="form-label">Tlp</label>
                                                <input required type="text" className="form-control" value={this.state.tlp} onChange={ev => this.setState({tlp: ev.target.value})}/>
                                            </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <Widget className="p-4">
                        <div className={s.tableTitle}>
                            <div className="headline-2">Page Customer</div>
                            <div className="d-flex">
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.addData()}>Add Data</button>
                            </div>
                        </div>
                        <div className="widget-table-overflow">
                            <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                                <thead>
                                    <tr>
                                        <th className="w-25">ID</th>
                                        <th className="w-25">Nama Member</th>
                                        <th className="w-25">Alamat</th>
                                        <th className="w-25">Jenis Kelamin</th>
                                        <th className="w-25">Telp</th>
                                        <th className="w-25">Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.data_member.map( item => (
                                        <tr>
                                            <td>{item.id_member}</td>
                                            <td><img className={s.image} src={ellieSmithImg} alt="User"/><span className="ml-3">{item.nama}</span></td> 
                                            <td>{item.alamat}</td>
                                            <td>{item.jenis_kelamin}</td>
                                            <td>{item.tlp}</td>
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