import React, { Component } from 'react';
import './App.css';
import { UserDrugs } from './userDrug.comp';
import { UserDrugEdit } from './userDrugEdit.comp';
import { AddUserDrug } from './addUserDrug.comp';

class App extends Component {

  state = {
    page: '',
    userName: 'userTest',
    nextDrugId: 7,
    nextUserDrugId: 4,
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
      { id: 0, userName: 'userTest', drugName: 'Acamol', closedExpirationDate: new Date((new Date()).getTime() + (86400000 * 90)), dateOpened: new Date(), isOpened: true, isDeleted: false, isEditing: false },
      { id: 1, userName: 'userTest', drugName: 'Bcamol', closedExpirationDate: new Date((new Date()).getTime() - (86400000 * 90)), dateOpened: new Date(), isOpened: false, isDeleted: false, isEditing: false },
      { id: 2, userName: 'userTest', drugName: 'Ccamol', closedExpirationDate: new Date((new Date()).getTime() + (86400000 * 100)), dateOpened: null, isOpened: false, isDeleted: false, isEditing: false },
      { id: 3, userName: 'userTest', drugName: 'Dcamol', closedExpirationDate: new Date(), dateOpened: new Date(), isOpened: false, isDeleted: false, isEditing: false }
    ]
  }

  addDrug = (newDrug) => {
    let nextId = this.state.nextDrugId;
    newDrug = { ...newDrug, id: nextId };
    nextId++;
    this.setState({ nextDrugId: nextId });
    this.state.drugs.push(newDrug);
    this.setState({ page: '' });
  }

  addUserDrug = (newUserDrug) => {
    let nextId = this.state.nextUserDrugId;
    newUserDrug = { ...newUserDrug, id: nextId, isEditing: false };
    nextId++;
    this.setState({ nextUserDrugId: nextId });
    this.state.userDrugs.push(newUserDrug);
    this.setState({ page: '' });
  }

  updateUserDrug = (newUserDrug) => {
    console.log(newUserDrug)
    let newUserDrugs = this.state.userDrugs.map((currentUserDrug) => {
      if (currentUserDrug.id === newUserDrug.id) {
        return newUserDrug;
      }
      return currentUserDrug;
    });
    this.setState({ userDrugs: newUserDrugs });
    this.setState({ page: '' });
  }

  onUserDrugEdit = (userDrugToEdit) => {
    let newUserDrug = { ...userDrugToEdit, isEditing: true };
    this.updateUserDrug(newUserDrug);
    this.setState({ page: 'edit' });
  }

  onUserDrugDeleted = (userDrugToDelete) => {
    let newUserDrug = { ...userDrugToDelete, isDeleted: true };
    this.updateUserDrug(newUserDrug);
  }

  onUserDrugOpened = (userDrugToOpen) => {
    let newUserDrug = { ...userDrugToOpen, dateOpened: new Date(), isOpened: true }
    this.updateUserDrug(newUserDrug);
  }

  getExpirationDateToShow = (userDrug) => {
    let daysAfterOpened = this.getDaysAfterOpened(userDrug.drugName);
    if (daysAfterOpened === Infinity || !userDrug.isOpened) {
      return userDrug.closedExpirationDate;
    }
    if (userDrug.isOpened) {
      let openedExpirationDate = new Date(userDrug.dateOpened + (86400000 * daysAfterOpened));
      return userDrug.closedExpirationDate <= openedExpirationDate ? userDrug.closedExpirationDate : openedExpirationDate;
    }
  }

  getDaysAfterOpened = (drugToSearchName) => {
    let drugFound = this.state.drugs.find((drugToCheck) => {
      return drugToCheck.name === drugToSearchName;
    })
    return drugFound.daysAfterOpened;
  }

  checkIfEditWindow() {
    let drugFound = this.state.userDrugs.find((drugToCheck) => {
      return drugToCheck.isEditing === true;
    })
    if (drugFound) {
      return (
        <UserDrugEdit formatDate={this.formatDate} drugsList={this.state.drugs} drugEdited={this.updateUserDrug} drug={drugFound} />
      )
    }
    return
  }

  formatDate(date) {
    if (date !== null) {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      return year + '-' + month + '-' + day
    }
  }

  render() {
    if (this.state.page === 'addUserDrug') {
      return <AddUserDrug formatDate={this.formatDate} addUserDrug={this.addUserDrug} drugsList={this.state.drugs} />
    }
    if (this.state.page === 'edit') {
      return this.checkIfEditWindow();
    }
    return (
      < div >
        <div className='user-welcome'>
          <h1>Hello {this.props.user.name}</h1>
          <p> you logged at {this.props.user.loggedAt.toString()}</p>
        </div>
        <div className='user-drugs'>
          <h1> here all your drugs</h1>
          <UserDrugs formatDate={this.formatDate} userDrugsList={this.state.userDrugs} getExpirationToShow={this.getExpirationDateToShow} userDrugsEdit={this.state.userDrugs} toggleDrugEdit={this.onUserDrugEdit} drugEdited={this.updateUserDrug} drugOpened={this.onUserDrugOpened} drugDeleted={this.onUserDrugDeleted} drug={this.state.userDrugs[0]} />
        </div>
        <div className='drugs-list'>
        </div>
      </div >
    );
  }
}

export default App;
