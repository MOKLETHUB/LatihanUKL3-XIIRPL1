import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import s from "./Header.module.scss";
import "animate.css";

const Header = (props) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  let dataUser = JSON.parse(localStorage.getItem('user'))

  const dropDown = () => {
    setDropDownOpen(!dropDownOpen);
  }

  const Logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location = "/login"
  }

  return (
    <Navbar className={`${s.root} d-print-none`}>
      <div className="container">
        <Nav className="d-none d-sm-block">
          <NavItem className="mr-4">
            <NavLink className="" href="#">
              <Link className="btn btn-primary mr-2" to="/">Dashboard</Link>
            </NavLink>
            <NavLink className="" href="#">
              <Link className="btn btn-secondary mr-2" to="/laporan">Laporan</Link>
            </NavLink>
            <NavLink className="" href="#">
              <Link className="btn btn-secondary mr-2" to="/transaksi">Transaksi</Link>
            </NavLink>
            <NavLink className="" href="#">
              <Link className="btn btn-secondary mr-2" to="/paket">Paket</Link>
            </NavLink>
            <NavLink className="" href="#">
              <Link className="btn btn-secondary mr-2" to="/outlet">Outlet</Link>
            </NavLink>
            <NavLink className="" href="#">
              <Link className="btn btn-secondary mr-2" to="/customer">Customer</Link>
            </NavLink>
            <NavLink className="" href="#">
              <Link className="btn btn-secondary mr-2" to="/user">User</Link>
            </NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">
          <Dropdown isOpen={dropDownOpen} toggle={() => dropDown()} nav id="basic-nav-dropdown" className="">
            <DropdownToggle nav caret className="navbar-dropdown-toggle">
              <span className="small d-none d-sm-block body-1"><span className="font-weight-bold text-uppercase">{dataUser.role},</span> {dataUser.nama}</span>
            </DropdownToggle>
            <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
              <NavItem>
                <NavLink href="#">
                  <button className="btn btn-primary rounded-pill mx-auto" type="submit" onClick={() => Logout()}><img src={logoutIcon} alt="Logout"/><span className="ml-1">Logout</span></button>
                </NavLink>
              </NavItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </div>
    </Navbar>
  )
}

export default Header;

