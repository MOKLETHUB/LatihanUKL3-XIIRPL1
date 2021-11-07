import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'

class Index extends React.Component{
    constructor(){
        super()
        this.state = {
            action: "",
            id_outlet: "",
            nama: "",
            alamat: "",
            tlp: "",
            token: "",
            data_outlet: []
        }
        // get token from local.storage
        if(!localStorage.getItem("token")) {
            window.location = "/login"
        } else {
            this.state.token = localStorage.getItem("token")
        }
    }

    getData = () => {
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
    }

    dropData = selectedItem => {
        if(window.confirm("Yakin nih dihapus?")) {
            let url = base_url + "/outlet/" + selectedItem.id_outlet

            axios.delete(url, {
                headers: {
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
        }
    }

    addData = () => {
        this.setState({
            action: "add",
            nama: "",
            alamat: "",
            tlp: "",
        })
    }

    updateData = selectedItem => {
        this.setState({
            action: "update",
            id_outlet: selectedItem.id_outlet,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            tlp: selectedItem.tlp,
        })
    }

    submitData = event => {
        event.preventDefault()

        let data = {
            id_outlet: this.state.id_outlet,
            nama: this.state.nama,
            alamat: this.state.alamat,
            tlp: this.state.tlp
        }

        let url = base_url + "/outlet"
        
        if(this.state.action === "add"){
            axios.post(url, data, { headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                this.getData()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update"){
            axios.put(url, data, { headers:{ 
                Authorization: "Bearer " + this.state.token
            }})
            .then(response => {
                this.getData()
            })
            .catch(error => console.log(error))
        }
    }

    componentDidMount(){
        this.getData()
    }
    render(){
        return(
            <div>
                <div>
                    <h1>Page Outlet</h1>
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
                </div>
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nama Outlet</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">Telp</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.data_outlet.map( item => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.id_outlet}
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
            </div>
        )
    }
}

export default Index;