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
      formDisplay: false,
      lastIndex: 0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
  }
  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  addAppointment(apt){
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;      //Create and Index at the end of the form Since it dosent have Index
    tempApts.unshift(apt);                 //Adds the Appointment to the First of Array In the List
    this.setState({
      myAppointments: tempApts,             //Sets State to the Data
      lastIndex: this.state.lastIndex + 1   //Increase the Index Count
    });
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
                <AddAppointment 
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment}
                />
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
