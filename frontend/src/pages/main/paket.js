import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'

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
            <div>
                <div>
                    <h1>Page Paket</h1>
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
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nama paket</th>
                                <th scope="col">Jenis</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Outlet</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.data_paket.map( item => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.id_paket}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.nama_paket}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.jenis}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.harga}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.tb_outlet.nama}
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