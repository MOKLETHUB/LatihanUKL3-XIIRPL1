import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'

class Index extends React.Component{
    constructor(){
        super()
        this.state = {
            action: "",
            id_user: "",
            nama: "",
            username: "",
            password: "",
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
            <div>
                <h1>Page User</h1>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.addData()}>Add Data</button>
                </div>

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
                                        <div className="mb-3 col-6">
                                            <label className="form-label">Password</label>
                                            <input required type="text" className="form-control" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})}/>
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
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nama User</th>
                                <th scope="col">Username</th>
                                <th scope="col">Password</th>
                                <th scope="col">Outlet</th>
                                <th scope="col">Role</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.data_user.map( item => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.id_user}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.nama}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.username}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.password}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.tb_outlet.nama}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalData" onClick={() => this.updateData(item)}>Edit</button>|
                                            <button type="button" className="btn btn-danger" onClick={() => this.dropData(item)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Index;