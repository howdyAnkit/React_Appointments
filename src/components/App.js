import { render } from "@testing-library/react";
import { result } from "lodash";
import React, { Component } from "react";
import '../css/App.css';

import AddAppointment from './AddAppointment';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

class App extends Component {

  constructor(){
    super();
    this.state = {
      myAppointments: []
    };
  }

  componentDidMount(){
    fetch('./data.json')
      .then(Response => Response.json())
        .then(result => {
            const apts = result.map(item => {
              return item;
            })
          this.setState({
            myAppointments : apts
          });
      })
  };

  render(){


    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointment />
                <SearchAppointments />
                <ListAppointments appointments={this.state.myAppointments}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };
}

export default App;
