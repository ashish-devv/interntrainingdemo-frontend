import React, { Component } from "react";

export default class Trainingtabel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteTraining = this.deleteTraining.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  // function to delete a row
  deleteTraining(id) {
    fetch("http://localhost:9090/api/training/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  refresh() {
    this.props.handler();
  }

  render() {
    return (
      <div className="tabel-responsive">
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Training Name</th>
              <th scope="col">Training Date from</th>
              <th scope="col">Training Date to</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.datafortable.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.startdate}</td>
                <td>{item.enddate}</td>
                <td>
                  <button
                    className="btn btn-outline-danger mx-1"
                    onClick={() => this.deleteTraining(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                  <button className="btn btn-outline-primary mx-1">
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
