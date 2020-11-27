import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
toast.configure();

class AllTask extends Component {
    //redirecting to update todo
    handleUpdate = (e) => {
        const id = e.target.id;
        console.log(id);
        e.preventDefault();
        this.props.history.push({ pathname: "/update-todo", store: id });
    };

    //deleting particular todo
    handlechange = async (e) => {
        e.preventDefault();
        const id1 = e.target.id;

        const datas = await axios.post(`/deleteTask/${id1}`);

        if (datas.status === 200) {
            toast.success("Deleted Succefully!", {
                position: toast.POSITION.TOP_CENTER,
            });
            this.props.history.push("/");
        }
    };
    render() {
        console.log(this.props.user);
        return (
            <div>
                <div>
                    {this.props.user ? (
                        <div>
                            {this.props.user.map((p) => (
                                <div
                                    class="card"
                                    style={{
                                        backgroundColor: "lightblue",
                                    }}
                                >
                                    <div class="card-header">
                                        Priority To Task :{p.priority_of_task}
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{p.name}</h5>
                                        <p class="card-text">
                                            Description:{p.description}
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
                    ) : (
                        <div>Loading</div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.todo,
    };
};
export default connect(mapStateToProps)(withRouter(AllTask));
