/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { blog, dashboard, doctor, doctorschedule, logout, menuicon04, menuicon06, menuicon08, menuicon09, menuicon10, menuicon11, menuicon12, menuicon14, menuicon15, menuicon16, patients, sidemenu } from './imagepath';
import Scrollbars from "react-custom-scrollbars-2";
import sidebarMenu from '../Shared/data/sidebarMenu';
import { useUser } from '../Shared/contexts/userContext';


const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");
  const [openMenu, setOpenMenu] = useState('');
  const { user } = useUser();
  const userRole = user?.role;
  const handleClick = (e, item, item1, item3) => {
    e.preventDefault()
    const div = document.querySelector(`#${item}`);
    const ulDiv = document.querySelector(`.${item1}`);
    e?.target?.className ? ulDiv.style.display = 'none' : ulDiv.style.display = 'block'
    e?.target?.className ? div.classList.remove('subdrop') : div.classList.add('subdrop');
    setOpenMenu((prev) => (prev === item ? '' : item));
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

  const isRoleAllowed = (allowedRoles) => {
    return allowedRoles === 'all' || allowedRoles.includes(userRole);
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
                



                {sidebarMenu.map((menu, index) => {
                  if (!isRoleAllowed(menu.allowedRoles)) return null;

                  return (
                    <li className="submenu" key={index}>
                      <Link id={menu.id} onClick={(e) => handleClick(e, menu.id, menu.id + 's')}>
                        <span className="menu-side">
                          <img src={menu.icon} alt="" />
                        </span>
                        <span>{menu.menuName}</span>
                        <span className="menu-arrow" />
                      </Link>

                      <ul
                        style={{ display: openMenu === menu.id ? 'block' : 'none' }}
                        className={menu.id + 's'}
                      >
                        {menu.submenuItems.map((item, subIndex) => {
                          if (!isRoleAllowed(item.allowedRoles)) return null;

                          return (
                            <li key={subIndex}>
                              <Link
                                className={location.pathname === item.path ? 'active' : ''}
                                to={item.path}
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}













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
