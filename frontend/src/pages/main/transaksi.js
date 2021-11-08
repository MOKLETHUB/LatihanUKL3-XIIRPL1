import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'
import moment from 'moment'

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
            <div>
                <h1>Page Transaksi</h1>
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
                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID Transaksi</th>
                                <th scope="col">ID Outlet</th>
                                <th scope="col">ID User</th>
                                <th scope="col">ID Member</th>
                                <th scope="col">Kode Invoice</th>
                                <th scope="col">Tanggal</th>
                                <th scope="col">Batas Waktu</th>
                                <th scope="col">Tanggal Bayar</th>
                                <th scope="col">Biaya Tambahan</th>
                                <th scope="col">Diskon</th>
                                <th scope="col">Pajak</th>
                                <th scope="col">Status</th>
                                <th scope="col">Dibayar</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.data_transaksi.map( item => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.id_transaksi}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.id_outlet}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.id_user}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.id_member}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.kode_invoice}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {moment.utc(item.tgl).format("MM/DD/YY")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {moment.utc(item.batas_waktu).format("MM/DD/YY")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {moment.utc(item.tgl_bayar).format("MM/DD/YY")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.biaya_tambahan}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.diskon}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.pajak}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {item.dibayar}
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