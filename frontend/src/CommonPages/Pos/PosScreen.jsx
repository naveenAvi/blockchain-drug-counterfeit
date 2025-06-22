// eslint-disable-next-line no-unused-vars

import React from 'react'

import { Link } from 'react-router-dom'
import { Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, blogimg1, blogimg2, incomingcall, outgoing, plusicon, refreshicon, searchnormal } from '../../componentsd/imagepath'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import Header from '../Header'
import Sidebar from '../Sidebar'

const PosScreen = () => {
    return (
        <>
            <Header />
            <Sidebar id='menu-item9' id1='menu-items9' activeClassName='voice-call' />
            <>
                <div className="page-wrapper">
                    <div className="content">

                        {/* /Page Header */}
                        <div className="row">
                            <div className="col-xl-3 d-flex">
                                <div className="card chat-box ">
                                    <div className="chat-widgets">
                                        <div className="call-all comman-space-flex">

                                        </div>
                                        <div className="chat-user-group d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar5} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> William Stephin</h5>
                                                    <p>5 min Ago</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>10:35</p>
                                                    <div className="chat-user-icon">
                                                        <img src={incomingcall} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-user-group d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar2} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> William Stephin</h5>
                                                    <p>5 min Ago</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>11:35</p>
                                                    <div className="chat-user-icon">
                                                        <img src={outgoing} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-user-group d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar3} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> William Stephin</h5>
                                                    <p>5 min Ago</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>10:35 </p>
                                                    <div className="chat-user-icon">
                                                        <img src={incomingcall} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-user-group d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar4} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> Bernardo James	</h5>
                                                    <p>06:32 PM</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>11:35</p>
                                                    <div className="chat-user-icon">
                                                        <img src={incomingcall} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-user-group d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar5} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> Harald Kowalski	</h5>
                                                    <p>06:32 PM Yesterday</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>10:15 </p>
                                                    <div className="chat-user-icon">
                                                        <img src={incomingcall} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-user-group d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar6} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> Alexandr Donnelly	</h5>
                                                    <p>05:32 PM Yesterday</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>09:20 </p>
                                                    <div className="chat-user-icon">
                                                        <img src={incomingcall} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-user-group d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar7} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> Regina Dickerson	</h5>
                                                    <p>06:00 PM, 30 Sep 2022</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>11:35</p>
                                                    <div className="chat-user-icon">
                                                        <img src={outgoing} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chat-user-group mb-0 d-flex align-items-center">
                                            <div className="img-users call-user">
                                                <Link to="#"><img src={Avatar8} alt="img" /></Link>
                                            </div>
                                            <div className="chat-users chat-user-blk">
                                                <div className="user-titles ">
                                                    <h5> Forest Kroch</h5>
                                                    <p>05:32 PM Yesterday</p>
                                                </div>
                                                <div className="user-text ">
                                                    <p>10:35</p>
                                                    <div className="chat-user-icon">
                                                        <img src={incomingcall} alt="img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-9">
                            <div className="doctor-search-blk">
                                            <div className="top-nav-search table-search-blk">
                                                <form>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search here"
                                                    />
                                                    <Link className="btn">
                                                        <img
                                                            src={searchnormal}
                                                            alt="#"
                                                        />
                                                    </Link>
                                                </form>
                                            </div>
                                            <div className="add-group">
                                                <Link
                                                    to="/add-doctor"
                                                    className="btn btn-primary add-pluss ms-2"
                                                >
                                                    <img src={plusicon} alt="#" />
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="btn btn-primary doctor-refresh ms-2"
                                                >
                                                    <img src={refreshicon} alt="#" />
                                                </Link>
                                            </div>
                                        </div>
                                <div className="card chat-box ">
                                    <div className=" chat-search-group ">





                                       








                                        <div className="col-sm-6 col-md-6 col-xl-4">
                                            <div className="blog grid-blog">
                                                <div className="blog-image">
                                                    <Link to="/blog">
                                                        <img
                                                            className="img-fluid"
                                                            src={blogimg1}
                                                            alt="#"
                                                        />
                                                    </Link>
                                                    <div className="blog-views">
                                                        <h5>Diabetes</h5>
                                                    </div>
                                                    <ul className="nav view-blog-list blog-views">
                                                        <li>
                                                            <i className="feather-message-square me-1" />
                                                            <FeatherIcon icon="message-square" />
                                                            58
                                                        </li>
                                                        <li>
                                                            <i className="feather-eye me-1" />
                                                            <FeatherIcon icon="eye" />
                                                            500
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="blog-content">
                                                    <div className="blog-grp-blk">
                                                        <div className="blog-img-blk">
                                                            <Link to="/blog">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={blogimg2}
                                                                    alt="#"
                                                                />
                                                            </Link>
                                                            <div className="content-blk-blog ms-2">
                                                                <h4>
                                                                    <Link to="profile.html">Jenifer Robinson</Link>
                                                                </h4>
                                                                <h5>M.B.B.S, Diabetologist</h5>
                                                            </div>
                                                        </div>
                                                        <span>
                                                            <i className="feather-calendar me-1" />
                                                            05 Sep 2022
                                                        </span>
                                                    </div>
                                                    <h3 className="blog-title">
                                                        <Link to="/blog">
                                                            Simple Changes That Lowered My Moms Blood Pressure
                                                        </Link>
                                                    </h3>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua...
                                                    </p>
                                                    <Link to="/blog" className="read-more d-flex">
                                                        {" "}
                                                        Read more in 8 Minutes
                                                        <i className="fa fa-long-arrow-right ms-2" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="col-sm-6 col-md-8 col-xl-4">
                                            <div className="blog grid-blog">
                                                <div className="blog-image">
                                                    <Link to="/blog">
                                                        <img
                                                            className="img-fluid"
                                                            src={blogimg1}
                                                            alt="#"
                                                        />
                                                    </Link>
                                                    <div className="blog-views">
                                                        <h5>Diabetes</h5>
                                                    </div>
                                                    <ul className="nav view-blog-list blog-views">
                                                        <li>
                                                            <i className="feather-message-square me-1" />
                                                            <FeatherIcon icon="message-square" />
                                                            58
                                                        </li>
                                                        <li>
                                                            <i className="feather-eye me-1" />
                                                            <FeatherIcon icon="eye" />
                                                            500
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="blog-content">
                                                    <div className="blog-grp-blk">
                                                        <div className="blog-img-blk">
                                                            <Link to="/blog">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={blogimg2}
                                                                    alt="#"
                                                                />
                                                            </Link>
                                                            <div className="content-blk-blog ms-2">
                                                                <h4>
                                                                    <Link to="profile.html">Jenifer Robinson</Link>
                                                                </h4>
                                                                <h5>M.B.B.S, Diabetologist</h5>
                                                            </div>
                                                        </div>
                                                        <span>
                                                            <i className="feather-calendar me-1" />
                                                            05 Sep 2022
                                                        </span>
                                                    </div>
                                                    <h3 className="blog-title">
                                                        <Link to="/blog">
                                                            Simple Changes That Lowered My Moms Blood Pressure
                                                        </Link>
                                                    </h3>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua...
                                                    </p>
                                                    <Link to="/blog" className="read-more d-flex">
                                                        {" "}
                                                        Read more in 8 Minutes
                                                        <i className="fa fa-long-arrow-right ms-2" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>







                                        <div className="col-sm-6 col-md-6 col-xl-4">
                                            <div className="blog grid-blog">
                                                <div className="blog-image">
                                                    <Link to="/blog">
                                                        <img
                                                            className="img-fluid"
                                                            src={blogimg1}
                                                            alt="#"
                                                        />
                                                    </Link>
                                                    <div className="blog-views">
                                                        <h5>Diabetes</h5>
                                                    </div>
                                                    <ul className="nav view-blog-list blog-views">
                                                        <li>
                                                            <i className="feather-message-square me-1" />
                                                            <FeatherIcon icon="message-square" />
                                                            58
                                                        </li>
                                                        <li>
                                                            <i className="feather-eye me-1" />
                                                            <FeatherIcon icon="eye" />
                                                            500
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="blog-content">
                                                    <div className="blog-grp-blk">
                                                        <div className="blog-img-blk">
                                                            <Link to="/blog">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={blogimg2}
                                                                    alt="#"
                                                                />
                                                            </Link>
                                                            <div className="content-blk-blog ms-2">
                                                                <h4>
                                                                    <Link to="profile.html">Jenifer Robinson</Link>
                                                                </h4>
                                                                <h5>M.B.B.S, Diabetologist</h5>
                                                            </div>
                                                        </div>
                                                        <span>
                                                            <i className="feather-calendar me-1" />
                                                            05 Sep 2022
                                                        </span>
                                                    </div>
                                                    <h3 className="blog-title">
                                                        <Link to="/blog">
                                                            Simple Changes That Lowered My Moms Blood Pressure
                                                        </Link>
                                                    </h3>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua...
                                                    </p>
                                                    <Link to="/blog" className="read-more d-flex">
                                                        {" "}
                                                        Read more in 8 Minutes
                                                        <i className="fa fa-long-arrow-right ms-2" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>








                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        </>
    )
}

export default PosScreen
