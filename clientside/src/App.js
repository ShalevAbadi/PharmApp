import React, { Component } from 'react';
import './App.css';
import { UserDrugs } from './userDrug.comp';

class App extends Component {
  state = {
    drugs: [
      { id: 0, name: 'Acamol', daysAfterOpened: 180 },
      { id: 1, name: 'Bcamol', daysAfterOpened: 6 },
      { id: 2, name: 'Ccamol', daysAfterOpened: 180 },
      { id: 3, name: 'Dcamol', daysAfterOpened: Infinity },
      { id: 4, name: 'Ecamol', daysAfterOpened: 180 },
      { id: 5, name: 'Fcamol', daysAfterOpened: 180 },
      { id: 6, name: 'Gcamol', daysAfterOpened: 180 }
    ],
    userDrugs: [
      { id: 0, userName: 'userTest', drugName: 'Acamol', expirationDate: new Date(), isOpened: false },
      { id: 1, userName: 'userTest', drugName: 'Bcamol', expirationDate: new Date(), isOpened: false },
      { id: 2, userName: 'userTest', drugName: 'Ccamol', expirationDate: new Date(), isOpened: false },
      { id: 3, userName: 'userTest', drugName: 'Dcamol', expirationDate: new Date(), isOpened: false }
    ]
  }

  onDrugDeleted = (drugToDelete) => {
    let newUserDrugs = this.state.userDrugs.filter((currentDrug) => {
      return currentDrug !== drugToDelete;
    })
    this.setState({userDrugs : newUserDrugs});
  }

  onDrugOpened = (drugToOpen) => {
    let daysAfterOpened = this.getDaysAfterOpened(drugToOpen.drugName);
    let newDrug = this.setNewDate(drugToOpen, daysAfterOpened);
    let newUserDrugs = this.state.userDrugs.map((currentDrug) => {
      if (currentDrug.id === newDrug.id) {
        return newDrug;
      }
      return currentDrug;
    });
    this.setState({ userDrugs: newUserDrugs });
  }

  setNewDate = (drugToUpdate, daysUntillExpire) => {
    if (daysUntillExpire === Infinity) {
      return { ...drugToUpdate, isOpened: true };
    }
    let today = new Date();
    let newDate = new Date(today.getTime() + (86400000 * daysUntillExpire))
    let newDrug = { ...drugToUpdate, expirationDate: newDate, isOpened: true };
    return newDrug;
  }

  getDaysAfterOpened = (drugToSearchName) => {
    let drugFound = this.state.drugs.find((drugToCheck) => {
      return drugToCheck.name === drugToSearchName;
    })
    return drugFound.daysAfterOpened;
  }


  render() {
    return (
      <div>
        <div className='user-welcome'>
          <h1>Hello {this.props.user.name}</h1>
          <p> you logged at {this.props.user.loggedAt.toString()}</p>
        </div>
        <div className='user-drugs'>
          <h1> here all your drugs</h1>
          <UserDrugs userDrugsList={this.state.userDrugs} drugOpened={this.onDrugOpened} drugDeleted={this.onDrugDeleted} />
        </div>
        <div className='drugs-list'>
        </div>
      </div>
    );
  }
}

export default App;
