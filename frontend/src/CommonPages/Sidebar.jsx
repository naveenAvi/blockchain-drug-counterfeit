/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { blog, dashboard, doctor, doctorschedule, logout, menuicon04, menuicon06, menuicon08, menuicon09, menuicon10, menuicon11, menuicon12, menuicon14, menuicon15, menuicon16, patients, sidemenu } from './imagepath';
import Scrollbars from "react-custom-scrollbars-2";


const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");
  const handleClick = (e, item, item1, item3) => {
    const div = document.querySelector(`#${item}`);
    const ulDiv = document.querySelector(`.${item1}`);
    e?.target?.className ? ulDiv.style.display = 'none' : ulDiv.style.display = 'block'
    e?.target?.className ? div.classList.remove('subdrop') : div.classList.add('subdrop');
  }

  useEffect(() => {
    if (props?.id && props?.id1) {
      const ele = document.getElementById(`${props?.id}`);
      if (ele) {
        handleClick(ele, props?.id, props?.id1);

      }
    }
  }, [])


  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu"
              onMouseLeave={expandMenu}
              onMouseOver={expandMenuOpen}
            >
              <ul>
                <li className="menu-title">Main</li>
                <li className="submenu" >
                  <Link to="#" id="menu-item" onClick={(e) => {

                    handleClick(e, "menu-item", "menu-items")
                  }}>
                    <span className="menu-side">
                      <img src={dashboard} alt="" />
                    </span>{" "}
                    <span> Dashboard </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: sidebar === 'Dashboard' ? 'block' : "none" }} className='menu-items'>
                    <li>
                      <Link className={props?.activeClassName === 'Manufacturer-dashboard' ? 'active' : ''} to="/Manufacturer-dashboard">Manufacturer Dashboard</Link>
                    </li>
                  </ul>
                </li>











                <li className="submenu">
                  <Link to="#" id="menu-item1" onClick={(e) => {
                    // setSidebar('Doctors')
                    handleClick(e, "menu-item1", "menu-items1")
                  }}>
                    <span className="menu-side">
                      <img src={doctor} alt="" />
                    </span>{" "}
                    <span> Drugs </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: sidebar === 'Doctors' ? 'block' : 'none' }} className="menu-items1">
                    <li>
                      <Link className={props?.activeClassName === 'create-drug' ? 'active' : ''} to="/create-drug">Add Drug</Link>
                    </li>
                    <li>
                      <Link className={props?.activeClassName === 'create-drug' ? 'active' : ''} to="/create-drug">
                        Drug List</Link>
                    </li>
                    <li>
                      <Link className={props?.activeClassName === 'create-drug' ? 'active' : ''} to="/create-drug">
                        Dossages</Link>
                    </li>
                  </ul>
                </li>



                <li className="submenu">
                  <Link to="#" id="menu-create" onClick={(e) => {
                    handleClick(e, "menu-create", "menu-Creates")
                  }}>
                    <span className="menu-side">
                      <img src={doctor} alt="" />
                    </span>{" "}
                    <span> Parties </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: sidebar === 'Orders' ? 'block' : 'none' }} className="menu-Creates">
                    <li>
                      <Link className={props?.activeClassName === 'create-manufacturer' ? 'active' : ''} to="/create/manufacturer">
                        Create Manufacturer</Link>
                    </li>

                    <li>
                      <Link className={props?.activeClassName === 'create-importers' ? 'active' : ''} to="/create/importers">
                        Create Importers</Link>
                    </li>

                    <li>
                      <Link className={props?.activeClassName === 'create-importers' ? 'active' : ''} to="/create/distributor">
                        Create Distributors</Link>
                    </li>
                    <li>
                      <Link className={props?.activeClassName === 'create-importers' ? 'active' : ''} to="/create/pharmacy">
                        Create Pharmacies</Link>
                    </li>
                    <li>
                      <Link className={props?.activeClassName === 'order-list' ? 'active' : ''} to="/order-list">
                        Importer List</Link>
                    </li>
                  </ul>
                </li>


                <li className="submenu">
                  <Link to="#" id="menu-order" onClick={(e) => {
                    handleClick(e, "menu-order", "menu-Orders")
                  }}>
                    <span className="menu-side">
                      <img src={doctor} alt="" />
                    </span>{" "}
                    <span> Orders </span> <span className="menu-arrow" />
                  </Link>
                  <ul style={{ display: sidebar === 'Orders' ? 'block' : 'none' }} className="menu-Orders">
                    <li>
                      <Link className={props?.activeClassName === 'create-order' ? 'active' : ''} to="/create-order">Add order</Link>
                    </li>
                    <li>
                      <Link className={props?.activeClassName === 'order-list' ? 'active' : ''} to="/order-list">
                        Order List</Link>
                    </li>

                  </ul>
                </li>



              </ul>
              <div className="logout-btn">
                <Link to="/login">
                  <span className="menu-side">
                    <img src={logout} alt="" />
                  </span>{" "}
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  )
}
export default Sidebar
