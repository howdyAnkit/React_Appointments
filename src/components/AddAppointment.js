import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class AddAppointments extends Component {

    constructor(){
        super();
        this.state ={
            petName:'',
            ownerName: '',
            aptDate: '',
            aptTime: '',
            aptNote: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(e){
      e.preventDefault();
      let tempApt = {
        petName: this.state.petName,
        ownerName: this.state.ownerName,
        aptDate: this.state.aptDate + ' ' + this.state.aptTime,
        aptNote: this.state.aptNote
      };
      this.props.addAppointment(tempApt);
      this.setState({                                             //After adding form Making form Empty again
        petName:'',
        ownerName: '',
        aptDate: '',
        aptTime: '',
        aptNote: ''
      });
      this.props.toggleForm();                                  //Closing the form Back Agagin after Submitting
                                                                //Closes form using props in App.js
    }
    
    handleChange(e){
        const target = e.target;
        const value =target.value;
        const name = target.name;
        this.setState({
            [name] : value
        });
    }

  render() {
    return (
      <div
        className={'card textcenter mt-3 ' + (this.props.formDisplay ? '' : 'add-appointment')
        }
      >
        <div className="apt-addheading card-header bg-primary text-white" onClick={this.props.toggleForm}>
        <FaPlus />  Add Appointment
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label className="col-md-2 col-form-label text-md-right" htmlFor="petName" readOnly>Pet Name</label>
              <div className="col-md-10">
                <input type="text" className="form-control" name="petName" placeholder="Pet's Name" value={this.setState.petName} onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 col-form-label text-md-right" htmlFor="ownerName">Pet Owner</label>
              <div className="col-md-10">
                <input type="text" className="form-control" name="ownerName" placeholder="Owner's Name"/>
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 col-form-label text-md-right" htmlFor="aptDate">Date</label>
              <div className="col-md-4">
                <input type="date" className="form-control" name="aptDate" id="aptDate"/>
              </div>
              <label className="col-md-2 col-form-label text-md-right" htmlFor="aptTime">Time</label>
              <div className="col-md-4">
                <input type="time" className="form-control" name="aptTime" id="aptTime"/>
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">Apt. Notes</label>
              <div className="col-md-10">
                <textarea className="form-control" rows="4" cols="50" name="aptNotes" id="aptNotes" placeholder="Appointment Notes"/>
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button type="submit" className="btn btn-primary d-block ml-auto">
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAppointments;