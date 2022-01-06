import React, { Component } from "react";
import Trainingtabel from "./Trainingtabel";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      name: "",
      startdate: "",
      enddate: "",
      isEmpty: false,
    };

    this.handelChange = this.handelChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.addTraining = this.addTraining.bind(this);
  }

  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //hit api to get data
  fetchData = () => {
    fetch("http://localhost:9090/api/training")
      .then((response) => response.json())
      .then((json) => {
        if (json.length === 0) {
          this.setState({
            isEmpty: true,
          });
        } else {
          this.setState({
            isEmpty: false,
          });
        }
        this.setState({
          data: json,
          isLoading: false,
        });
        console.log(json);
      });
  };
  componentDidMount() {
    this.fetchData();
  }

  //add data to the database
  addTraining = () => {
    this.setState({
      isLoading: true,
    });
    fetch("http://localhost:9090/api/training", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        name: this.state.name,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoading: false,
        });
        console.log(json);
        this.fetchData();
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-4">
            <h1 className="h1 ">
              <i className="fas fa-running"></i>Training App
            </h1>
            <div className="card  cardshadow">
              <div className="card-body">
                <h5 className="card-title">Add Your Training</h5>
                <p className="card-text">Add your training to the database.</p>
                <p className="card-text">
                  <label htmlFor="trainingname" className="form-label mt-1">
                    Training Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="trainingname"
                    placeholder="Training Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handelChange}
                  />
                  <label htmlFor="trainingdatefrom" className="form-label mt-1">
                    Training Date from
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="trainingdatefrom"
                    placeholder="Training Date from"
                    name="startdate"
                    value={this.state.startdate}
                    onChange={this.handelChange}
                  />
                  <label htmlFor="trainingdateto" className="form-label mt-1">
                    Training Date to
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="trainingdateto"
                    placeholder="Training Date to"
                    name="enddate"
                    value={this.state.enddate}
                    onChange={this.handelChange}
                  />
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={this.addTraining}
                  >
                    {" "}
                    +Add Training
                  </button>
                  <button className="btn btn-outline-danger mx-2">Reset</button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6  mt-4">
            {/* tabel */}
            {this.state.isLoading ? (
              <div
                className="spinner-border text-primary text-center"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : this.state.isEmpty ? (
              <div className="alert alert-danger">
                <h4 className="alert-heading">
                  <i className="fas fa-exclamation-triangle"></i> No Training
                  Found
                </h4>
              </div>
            ) : (
              <Trainingtabel
                datafortable={this.state.data}
                handler={this.fetchData}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
