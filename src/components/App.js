import { render } from "@testing-library/react";
import { last, result, without } from "lodash";
import React, { Component } from "react";
import '../css/App.css';

import AddAppointment from './AddAppointment';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';


class App extends Component {

  constructor(){
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
  }

  deleteAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments : tempApts
    });
  }

  componentDidMount(){
    fetch('./data.json')
      .then(Response => Response.json())
        .then(result => {
            const apts = result.map(item => {
              item.aptId = this.state.lastIndex;
              this.setState({lastIndex : this.state.lastIndex + 1})
              return item;
            })
          this.setState({
            myAppointments : apts
          });
        });
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
                <ListAppointments appointments={this.state.myAppointments} deleteAppointment={this.deleteAppointment}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };
}

export default App;
