import React, { Component } from "react";
import "./style/home.css";
import { Redirect, withRouter, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logoutUser, AllTodo } from "../redux/actions/userAction";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

class Home extends Component {
    state = {
        task: "",
        user: "",
        token: null,
    };

    //redirecting to create new todo
    todoSubmit = (e) => {
        e.preventDefault();
        if (this.props.user.isAuthenticated !== true) {
            this.props.history.push({ pathname: "/register" });
        } else {
            this.props.history.push({ pathname: "/create-todo" });
        }
    };
    handleLogout = async (e) => {
        e.preventDefault();
        //dispatchng data
        this.props.logoutUser();
        toast.success("Logout Successfully!", {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    alltodo = async (e) => {
        e.preventDefault();

        this.props.AllTodo();
        if (this.props.user.isAuthenticated !== true) {
            this.props.history.push({ pathname: "/register" });
        } else {
            this.props.history.push({ pathname: "/all-todo" });
        }
    };
    render() {
        console.log(this.props.user);
        console.log(this.props.user.user.id);
        return (
            <div className="main">
                <div className="flex">
                    <nav
                        class="navbar navbar-expand-lg navbar-light "
                        style={{
                            maxWidth: "50rem",
                        }}
                    >
                        <b style={{ color: "white" }}> Todo Application</b>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div
                            class="collapse navbar-collapse"
                            id="navbarNavAltMarkup"
                        >
                            <div className="navbar-nav mr-0 my-2 my-lg-0">
                                {this.props.user.isAuthenticated !== false ? (
                                    <div className="logout">
                                        <button
                                            className="btn btn-primary "
                                            onClick={this.handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="register">
                                        <div>
                                            <ul className="navbar-nav mr-0 my-2 my-lg-0">
                                                <li class="btn btn-warning mr-sm-2">
                                                    <Link
                                                        class="nav-item nav-link register"
                                                        to="/register"
                                                        style={{
                                                            fontWeight:
                                                                "bolder",
                                                        }}
                                                    >
                                                        Register
                                                    </Link>
                                                </li>
                                                <li class="btn btn-warning mr-sm-2">
                                                    <Link
                                                        class="nav-item nav-link "
                                                        to="/login"
                                                        style={{
                                                            fontWeight:
                                                                "bolder",
                                                        }}
                                                    >
                                                        Login
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="login"></div>
                                    </div>
                                )}

                                {/* <a class="nav-item nav-link disabled" href="#">
                                Disabled
                            </a> */}
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="main2 ">
                    <h3 className="text">WanT To Create Todo??</h3>
                    <div className="main3 row">
                        <div className="col-3"></div>
                        <div className="leftPart col-3">
                            <button
                                className="btn btn-dark"
                                onClick={this.todoSubmit}
                                style={{ color: "white" }}
                            >
                                Create Todo
                            </button>
                        </div>
                        <div className="rightPart col-3 ">
                            <button
                                className="btn btn-dark"
                                style={{ color: "white" }}
                                onClick={this.alltodo}
                            >
                                Get All Todo
                            </button>
                        </div>
                        <div className="col-3"></div>
                    </div>

                    {/* <div className="rightPart col-8">
                        <div className="">
                            {this.state.task === "" ? (
                                <div></div>
                            ) : (
                                <div>
                                    {this.state.task.map((p) => (
                                        <div class="card">
                                            <div class="card-header">
                                                Priority To Task :
                                                {p.priority_of_task}
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">
                                                    {p.name}
                                                </h5>
                                                <p class="card-text">
                                                    {p.description}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-danger firstbutton"
                                                id={p._id}
                                                onClick={this.handlechange}
                                            >
                                                Delet Task
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger secondbutton"
                                                id={p._id}
                                                onClick={this.handleUpdate}
                                            >
                                                Update Task
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps, { logoutUser, AllTodo })(
    withRouter(Home)
);
