import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
} from "reactstrap";

import { closeSidebar, openSidebar } from "../../actions/navigation";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon";
import SearchBarIcon from "../Icons/HeaderIcons/SearchBarIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon";

import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import userImg from "../../assets/user.svg";

import s from "./Header.module.scss";
import "animate.css";

const Header = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  let dataUser = JSON.parse(localStorage.getItem('user'))

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const toggleSidebar = () => {
    if (props.sidebarOpened) {
      props.dispatch(closeSidebar());
    } else {
      const paths = props.location.pathname.split('/');
      paths.pop();
      props.dispatch(openSidebar());
    }
  }

  const Logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location = "/login"
  }

  return (
    <Navbar className={`${s.root} d-print-none`}>
      <div>
        <NavLink
          onClick={() => toggleSidebar()}
          className={`d-md-none mr-3 ${s.navItem}`}
          href="#"
        >
          <MenuIcon className={s.menuIcon} />
        </NavLink>
      </div>
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
          <NavItem className="d-sm-none mr-4">
            <NavLink
              className=""
              href="#"
            >
              <SearchIcon />
            </NavLink>
          </NavItem>
          <Dropdown isOpen={notificationsOpen} toggle={() => toggleNotifications()} nav id="basic-nav-dropdown" className="">
            <DropdownToggle nav caret className="navbar-dropdown-toggle">
              {/* <span className={`${s.avatar} rounded-circle float-left mr-2`}>
                <img src={userImg} alt="User"/>
              </span> */}
              <span className="small d-none d-sm-block body-1"><span className="font-weight-bold text-uppercase">{dataUser.role},</span> {dataUser.nama}</span>
            </DropdownToggle>
            <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
              {/* <DropdownItem className={s.dropdownProfileItem}><ProfileIcon/><span>Profile</span></DropdownItem> */}
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

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool,
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default Header;

