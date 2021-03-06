import React, { Component } from "react";
import axios from "axios";
import "./css/App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class LobbyNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Route>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal text-white">
            {" "}
            <Link
              className="navbar-logo"
              to="/"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              Cards Against Internet
            </Link>
          </h5>
          <nav className="my-2 my-md-0 mr-md-3 lobby-nav-container">
            <a
              className="navbar-a p-2 text-white"
              style={{ color: "white", textDecoration: "none" }}
            >
              {this.props.userData.username
                ? `Logged in as: ${this.props.userData.username}`
                : null}
            </a>
            {this.props.userData.username ? (
              <button
                className="btn btn-dark sign-up-button btn-md create-room-button"
                onClick={this.props.onLogout}
              >
                Log Out
              </button>
            ) : null}
            {this.props.userData.username ? (
              <button
              onClick={this.props.createRoom}
              className="btn btn-dark btn-lg create-room-button"
            >
              Create Room
            </button>
            ) : null}
          </nav>
        </div>
      </Route>
    );
  }
}

export default LobbyNav;

