import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'
import Header from "../../components/Header/Header";

import {
    Table
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import s from "../../assets/css/Tables.module.scss";

import ellieSmithImg from "../../assets/tables/ellieSmithImg.png";

class Index extends React.Component{
    constructor(){
        super()
        this.state = {
            action: "",
            id_user: "",
            nama: "",
            username: "",
            password: "",
            fillPassword: false,
            id_outlet: "",
            role: "",
            token: "",
            data_user: [],
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
            let url = base_url + "/user/" + selectedItem.id_user

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
            id_user: "",
            nama: "",
            username: "",
            password: "",
            id_outlet: "",
            role: "",
        })
    }

    updateData = selectedItem => {
        this.setState({
            action: "update",
            id_user: selectedItem.id_user,
            nama: selectedItem.nama,
            username: selectedItem.username,
            password: selectedItem.password,
            id_outlet: selectedItem.id_outlet,
            role: selectedItem.role
        })
    }

    submitData = event => {
        event.preventDefault()

        let data = {
            id_user: this.state.id_user,
            nama: this.state.nama,
            username: this.state.username,
            password: this.state.password,
            id_outlet: this.state.id_outlet,
            role: this.state.role
        }

        let url = base_url + "/user"
        
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
                <h3 className="font-weight-bold text-muted text-uppercase mb-3">Crud User</h3>
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
                                            <label className="form-label">Username</label>
                                            <input required type="text" className="form-control" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
                                        </div>
                                        <div className="mb-3">

                                            { this.state.action === "update" && this.state.fillPassword === false ? (
                                                <div class="mb-3 col-6">
                                                    <label className="form-label">Password</label>
                                                    <button className="btn btn-primary"
                                                        type="button"
                                                        onClick={() => this.setState({fillPassword: true})}>
                                                        Change Password
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                <div class=" col-6">
                                                    <label className="form-label">Password</label>
                                                </div>
                                                <div>
                                                    <div class="form-inline">
                                                        <div class="form-group mx-sm-3">
                                                            <input required type="password" className="form-control" 
                                                            placeholder="**********" value={this.state.password} 
                                                            onChange={ev => this.setState({password: ev.target.value})}/>
                                                        </div>
                                                            {this.state.action == "add" ? (
                                                               null 
                                                            ):(
                                                                <button className="btn btn-danger"
                                                                    type="button"
                                                                    onClick={() => this.setState({fillPassword: false})}>
                                                                    Close
                                                                </button>
                                                            )}
                                                    </div>
                                                </div>
                                                </>
                                            )}

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
                                            <label className="form-label">Role</label>
                                            <select className="form-select" aria-label="Default select example"
                                                value={this.state.role} onChange={ev => this.setState({role: ev.target.value})}>
                                                <option selected>Open this select menu</option>
                                                <option value="admin">Admin</option>
                                                <option value="petugas">Petugas</option>
                                            </select>
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
                        <div className="headline-2">Page User</div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.addData()}>Add Data</button>
                        </div>
                    </div>
                    <div className="widget-table-overflow">
                        <Table className={`table-striped table-borderless table-hover ${s.statesTable}`} responsive>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th className="w-25">Nama User</th>
                                <th className="w-25">Username</th>
                                <th className="w-25">Outlet</th>
                                <th className="w-25">Role</th>
                                <th className="w-25">Option</th>
                            </tr>
                            </thead>
                            <tbody>
                                { this.state.data_user.map( item => (
                                    <tr>
                                        <td>{item.id_user}</td>
                                        <td><img className={s.image} src={ellieSmithImg} alt="User"/><span className="ml-3">{item.nama}</span></td>
                                        <td>{item.username}</td>    
                                        <td>{item.tb_outlet.nama}</td>
                                        <td>{item.role}</td>
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