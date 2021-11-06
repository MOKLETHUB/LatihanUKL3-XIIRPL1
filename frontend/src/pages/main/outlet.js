import React from 'react'
import axios from 'axios'
import base_url from '../../config/base_urls'

class Index extends React.Component{
    constructor(){
        super()
        this.state = {
            nama: "",
            telp: "",
            alamat: "",
            token: ""
        }
        // get token from local.storage
        if(!localStorage.getItem("token")) {
            window.location = "/login"
        } else {
            this.state.token = localStorage.getItem("token")
        }
    }

    submitData = event => {
        event.preventDefault()

        let data = {
            nama: this.state.nama,
            telp: this.state.telp,
            alamat: this.state.alamat
        }

        let url = base_url + "/outlet"
        let token = this.state.token
        
        axios.post(url, data, {headers: {
            Authorization: "Bearer " + token
        }})
    }

    render(){
        return(
            <div>
                <h1>Page Outlet</h1>
                <form method="POST" onSubmit={ev => this.submitData(ev)}>
                <div class="mb-3 col-6">
                    <label class="form-label">Nama</label>
                    <input type="text" class="form-control" required onChange={ev => this.setState({nama: ev.target.value})}/>
                </div>
                <div class="mb-3 col-6">
                    <label class="form-label">Telp</label>
                    <input type="text" class="form-control" required onChange={ev => this.setState({telp: ev.target.value})}/>
                </div>
                <div class="mb-3 col-6">
                    <label class="form-label">Alamat</label>
                    <input type="text" class="form-control" required onChange={ev => this.setState({alamat: ev.target.value})}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Index;