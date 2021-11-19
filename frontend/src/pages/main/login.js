import React, { Component } from "react";
import axios from "axios";
import base_url from "../../config/base_urls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Row,
  Col,
  FormGroup,
  FormText,
  Input,
} from "reactstrap";
import Widget from "../../components/Widget/Widget";
import loginImage from "../../assets/loginBanner.jpeg";
import SofiaLogo from "../../components/Icons/SofiaLogo.js";

import Alert from "../../components/Notification/Notification.js";
export class Login extends Component {

  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      role: "admin",
      token: "",
      logged: true,
      isError: false,
      message: ""
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
        logged: response.data.logged,
        isError: false
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
    .catch(error => {
      this.setState({
        isError: true,
        message: error
      })
    })
  }

  componentDidMount(){
    // get token from local.storage
    if(localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
      window.location = "/"
    }
    
  }

  render() {
    return (
        <div className="auth-page">
          <Container className="col-12">
            <Row className="d-flex align-items-center">
              <Col xs={12} lg={6} className="left-column">
                <Widget className="widget-auth widget-p-lg">
                  <div className="d-flex align-items-center justify-content-between py-3">
                    <p className="auth-header mb-0">Login</p>
                    <div className="logo-block">
                      <SofiaLogo />
                      <p className="mb-0">LaundryKu</p>
                    </div>
                  </div>
                  <div className="auth-info my-2">
                    <p>Gunakan akun yang terdaftar dan pilih role <b>"Admin / Petugas"</b> untuk masuk ke dashboard!</p>
                  </div>
                  { this.state.message ? (
                    <Alert type="error" withIcon text={this.state.message}/>
                  ):null}
                  <form onSubmit={ev => this.Login(ev)}>
                    <FormGroup className="my-3">
                      <FormText>Username</FormText>
                      <Input
                        id="username"
                        className="input-transparent pl-3"
                        value={this.state.username} 
                        onChange={ ev => this.setState({ username: ev.target.value }) } 
                        type="username"
                        required
                        name="username"
                        placeholder="Username"
                      />
                    </FormGroup>
                    <FormGroup  className="my-3">
                      <div className="d-flex justify-content-between">
                        <FormText>Password</FormText>
                        {/* <Link to="/error">Forgot password?</Link> */}
                      </div>
                      <Input
                        id="password"
                        className="input-transparent pl-3"
                        value={this.state.password} 
                        onChange={ ev => this.setState({ password: ev.target.value }) }
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                      />
                    </FormGroup>
                    <FormGroup className="my-3">
                    <div className="d-flex justify-content-between">
                      <FormText>Role</FormText>
                      {/* <Link to="/error">Forgot password?</Link> */}
                    </div>
                    <select 
                      required 
                      className="input-transparent pl-3 form-control"
                      value={this.state.role} 
                      onChange={ ev => this.setState({ role: ev.target.value }) }>
                        <option value="admin">Admin</option>
                        <option value="petugas" >Petugas</option>
                    </select>
                    </FormGroup>
                    <div className="bg-widget d-flex justify-content-center">
                      <button type="submit" className="btn text-white btn-primary rounded-pill my-3">Login</button>
                    </div>  
                    </form>
                </Widget>
              </Col>
              <Col xs={0} lg={6} className="right-column overflow-hidden">
                <div>
                  <img src={loginImage} alt="Error page" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    );
  }
}

export default Login;