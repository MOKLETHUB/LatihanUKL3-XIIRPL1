import React, { Component } from "react";
import axios from "axios";
import base_url from "../../config/base_urls";

export class Login extends Component {

  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      role: "admin",
      token: "",
      logged: true
    }

    // get token from local.storage
    if(localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
      window.location = "/"
    }
  }

  Login = event => {
    event.preventDefault()

    let data = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    }

    let url = base_url + "/auth"

    axios.post(url, data)
    .then(response => {
      this.setState({
        logged: response.data.logged
      })
      if(this.state.logged){
        let userData = response.data.data
        let token = response.data.token

        // set to local storage
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)

        // redirect
        window.location = '/'
      } else {
        this.setState({
          message: response.data.message
        })
      }
    })
    .catch(error => alert(error))
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <div className="row">
          <div className="col-6">
            <form onSubmit= { ev => this.Login(ev) }>
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="Username" placeholder="Username" 
                  value={this.state.username} onChange={ ev => this.setState({ username: ev.target.value }) } required/>
                <input type="text" className="form-control" aria-label="Password" placeholder="Password" 
                  value={this.state.password} onChange={ ev => this.setState({ password: ev.target.value }) } required/>
                <select required className="btn btn-warning dropdown-toggle" aria-label="role"
                  value={this.state.role} onChange={ ev => this.setState({ role: ev.target.value }) }>
                    <option value="admin">Admin</option>
                    <option value="petugas" >Petugas</option>
                </select>
                <button type="submit" className="btn text-white btn-success">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;