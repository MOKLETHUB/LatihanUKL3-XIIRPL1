import React from 'react'
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Progress,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import Widget from "../../../components/Widget/Widget.js";
import ApexActivityChart from "./components/ActivityChart.js";
import meal1 from "../../../assets/dashboard/meal-1.svg";
import meal2 from "../../../assets/dashboard/meal-2.svg";
import meal3 from "../../../assets/dashboard/meal-3.svg";
import upgradeImage from "../../../assets/dashboard/upgradeImage.svg";
import heartRed from "../../../assets/dashboard/heartRed.svg";
import heartTeal from "../../../assets/dashboard/heartTeal.svg";
import heartViolet from "../../../assets/dashboard/heartViolet.svg";
import heartYellow from "../../../assets/dashboard/heartYellow.svg";
import gymIcon from "../../../assets/dashboard/gymIcon.svg";
import therapyIcon from "../../../assets/dashboard/therapyIcon.svg";
import user from "../../../assets/user.svg";
import statsPie from "../../../assets/dashboard/statsPie.svg";

import s from "./Dashboard.module.scss";

// -- Custom Components
import Header from "../../../components/Header/Header";

class Index extends React.Component{
    constructor(){
        super()
        this.state = {
            meals: [meal1, meal2, meal3]
        }
        // get token from local.storage
        if(!localStorage.getItem("token")) {
            window.location = "/login"
        }
    }

    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }

    render(){
        return(
        <>
            <Header />
            <div className="container pt-4">
                <h3 className="font-weight-bold text-muted text-uppercase mb-3">Dashboard</h3>
                <Row className="gutter mb-4">
                    <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
                        <Widget className="widget-p-sm">
                            <div className={s.smallWidget}>
                            <div className="d-flex mb-4">
                                <img className="py-1 mr-2 img-fluid" src={heartRed} alt="..." />
                                <div className="d-flex flex-column">
                                <p className="headline-3">Total Transaksi</p>
                                <p className="body-2"><h5>150<span className="body-3 muted">x</span></h5></p>
                                </div>
                            </div>
                            <div>
                                <Progress color="secondary-red" className={`progress-xs ${s.mutedPink}`} value="75" />
                            </div>
                            </div>
                        </Widget>
                    </Col>
                    <Col className="mb-4 mb-xl-0" xs={6} sm={6} xl={3}>
                        <Widget className="widget-p-sm">
                            <div className={s.smallWidget}>
                            <div className="d-flex mb-4">
                                <img className="py-1 mr-2 img-fluid" src={heartYellow} alt="..." />
                                <div className="d-flex flex-column">
                                <p className="headline-3">Total Paket Cucian</p>
                                <p className="body-2"><h5>50<span className="body-3 muted">/pcs</span></h5></p>
                                </div>
                            </div>
                            <div>
                                <Progress color="secondary-yellow" className={`progress-xs ${s.mutedYellow}`} value="75" />
                            </div>
                            </div>
                        </Widget>
                    </Col>
                    <Col xs={6} sm={6} xl={3}>
                        <Widget className="widget-p-sm">
                            <div className={s.smallWidget}>
                            <div className="d-flex mb-4">
                                <img className="py-1 mr-2 img-fluid" src={heartTeal} alt="..." />
                                <div className="d-flex flex-column">
                                <p className="headline-3">Total Outlet</p>
                                <p className="body-2"><h5>75<span className="body-3 muted">/gerai</span></h5></p>
                                </div>
                            </div>
                            <div>
                                <Progress color="secondary-cyan" className={`progress-xs ${s.mutedTeal}`} value="75" />
                            </div>
                            </div>
                        </Widget>
                    </Col>
                    <Col xs={6} sm={6} xl={3}>
                        <Widget className="widget-p-sm">
                            <div className={s.smallWidget}>
                            <div className="d-flex mb-4">
                                <img className="py-1 mr-2 img-fluid" src={heartViolet} alt="..." />
                                <div className="d-flex flex-column">
                                <p className="headline-3">Total Member</p>
                                <p className="body-2"><h5>34<span className="body-3 muted">/org</span></h5></p>
                                </div>
                            </div>
                            <div>
                                <Progress color="violet" className={`progress-xs ${s.mutedViolet}`} value="75" />
                            </div>
                            </div>
                        </Widget>
                    </Col>
                </Row>
                
                <Row>
                    <Col className="pr-grid-col" xs={12} lg={12}>
                    <Row className="gutter mb-4">
                        <Col xs={12}>
                        <Widget className="widget-p-none">
                            <div className="d-flex flex-wrap align-items-center justify-content-center">
                            <div className="d-flex flex-column align-items-center col-12 col-xl-6 p-sm-4">
                                <p className="headline-1">Don't burnout ;)</p>
                                <p className="body-3">Let's make money and be grateful</p>
                                <div className="d-flex justify-content-between my-4">
                                <Button className="rounded-pill mr-3" color="primary" onClick={() => this.Logout()}>Travelling mode</Button>
                                {/* <Button className="rounded-pill body-3" outline color="dark">Try for free</Button> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center col-12 col-xl-6">
                                <img className="p-1 img-fluid" src={upgradeImage} alt="..." />
                            </div>
                            </div>
                        </Widget>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </div>
        </>
        )
    }
}

export default Index;