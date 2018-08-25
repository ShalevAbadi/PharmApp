import React, { Component } from 'react';
import './App.css';
import { UserDrugs } from './userDrug.comp';

class App extends Component {
  state = {
    drugs: [
      { id: 0, name: 'Acamol', daysAfterOpened: 10 },
      { id: 1, name: 'Bcamol', daysAfterOpened: 6 },
      { id: 2, name: 'Ccamol', daysAfterOpened: 0 },
      { id: 3, name: 'Dcamol', daysAfterOpened: Infinity },
      { id: 4, name: 'Ecamol', daysAfterOpened: 180 },
      { id: 5, name: 'Fcamol', daysAfterOpened: 180 },
      { id: 6, name: 'Gcamol', daysAfterOpened: 180 }
    ],
    userDrugs: [
      { id: 0, userName: 'userTest', drugName: 'Acamol', expirationDate: new Date(), isOpened: false, isDeleted: false },
      { id: 1, userName: 'userTest', drugName: 'Bcamol', expirationDate: new Date((new Date()).getTime() + (86400000 * 90)), isOpened: false, isDeleted: false },
      { id: 2, userName: 'userTest', drugName: 'Ccamol', expirationDate: new Date((new Date()).getTime() + (86400000 * 100)), isOpened: false, isDeleted: false },
      { id: 3, userName: 'userTest', drugName: 'Dcamol', expirationDate: new Date(), isOpened: false, isDeleted: false }
    ]
  }

  updateUserDrug = (newUserDrug) => {
    let newUserDrugs = this.state.userDrugs.map((currentUserDrug) => {
      if (currentUserDrug.id === newUserDrug.id) {
        return newUserDrug;
      }
      return currentUserDrug;
    });
    this.setState({ userDrugs: newUserDrugs });
  }

  onUserDrugDeleted = (userDrugToDelete) => {
    let newUserDrug = { ...userDrugToDelete, isDeleted: true };
    this.updateUserDrug(newUserDrug);
  }

  onUserDrugOpened = (userDrugToOpen) => {
    let daysAfterOpened = this.getDaysAfterOpened(userDrugToOpen.drugName);
    let newUserDrug = { ...userDrugToOpen, expirationDate: this.getExpirationDate(userDrugToOpen.expirationDate, daysAfterOpened), isOpened: true }
    this.updateUserDrug(newUserDrug);
  }

  getExpirationDate(closedExpirationDate, daysAfterOpened) {
    if (daysAfterOpened === Infinity) {
      return closedExpirationDate;
    }
    let newExp = new Date((new Date()).getTime() + (86400000 * daysAfterOpened))
    return (closedExpirationDate <= newExp ? closedExpirationDate : newExp);
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
          <UserDrugs userDrugsList={this.state.userDrugs} drugOpened={this.onUserDrugOpened} drugDeleted={this.onUserDrugDeleted} />
        </div>
        <div className='drugs-list'>
        </div>
      </div>
    );
  }
}

export default App;
