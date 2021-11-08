import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'

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
            <div>
                <h1>Page Customer</h1>
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
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Member</th>
                            <th scope="col">Alamat</th>
                            <th scope="col">Jenis Kelamin</th>
                            <th scope="col">Telp</th>
                            <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.data_member.map( item => (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {item.id_member}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {item.nama}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {item.alamat}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {item.jenis_kelamin}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {item.tlp}
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
        )
    }
}

export default Index;