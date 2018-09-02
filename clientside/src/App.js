import React, { Component } from 'react';
import './App.css';
import * as axios from 'axios';
import { UserDrugs } from './userDrug.comp';
import { UserDrugEdit } from './userDrugEdit.comp';
import { AddUserDrug } from './addUserDrug.comp';
import { AddDrug } from './addDrug.comp';
class App extends Component {
  componentWillMount = () => {
    this.getDrugs();
    this.getUserDrugs();
  }

  state = {
    page: '',
    userName: 'userTest',
    userId: 1,
    drugs: [],
    userDrugs: []
  }

  getDrugs = () => {
    axios.get('http://localhost:3001/drugs')
      .then((response) => {
        this.setState({ drugs: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addDrugDB = (newDrug) => {
    console.log(JSON.stringify(newDrug));
    axios.post('http://localhost:3001/drugs', newDrug)
      .then((response) => {
        console.log(response);
        this.getDrugs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserDrugs = () => {
    axios.get('http://localhost:3001/userDrugs/' + this.state.userId)
      .then((response) => {
        let res = (response.data).map((userDrug) => {
          let name = this.getDrugNameById(userDrug.drugId);
          let closedExpirationDate = new Date(userDrug.closedExpirationDate);
          let dateOpened = userDrug.dateOpened ? new Date(userDrug.dateOpened) : null;
          let isOpened = userDrug.isOpened === 1 ? true : false;
          let isDeleted = userDrug.isDeleted === 1 ? true : false;
          userDrug = ({ ...userDrug, drugName: name, closedExpirationDate: closedExpirationDate, dateOpened: dateOpened, isEditing: false, isOpened: isOpened, isDeleted: isDeleted });
          return userDrug;
        })
        this.setState({ userDrugs: res });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addUserDrugDB = (userDrug) => {
    axios.post('http://localhost:3001/userDrugs', userDrug)
      .then((response) => {
        console.log(response);
        this.getUserDrugs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateUserDrugDB = (userDrug) => {
    userDrug = ({ ...userDrug, drugId: this.getDrugIdByName(userDrug.drugName), closedExpirationDate: this.formatDate(userDrug.closedExpirationDate), dateOpened: this.formatDate(userDrug.dateOpened) });
    console.log(JSON.stringify(userDrug));
    axios.patch('http://localhost:3001/userDrugs/' + userDrug.id, userDrug)
      .then((response) => {
        console.log(response);
        this.getUserDrugs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  returnHome = () => {
    this.setState({ page: '' });
  }

  addDrug = (newDrug) => {
    this.setState({ page: '' });
    this.addDrugDB(newDrug);
  }

  addUserDrug = (userDrug) => {
    userDrug = ({ ...userDrug, userId: this.state.userId, drugId: this.getDrugIdByName(userDrug.drugName), closedExpirationDate: this.formatDate(userDrug.closedExpirationDate), dateOpened: this.formatDate(userDrug.dateOpened) });
    this.setState({ page: '' });
    this.addUserDrugDB(userDrug);
  }

  updateUserDrug = (newUserDrug) => {
    this.setState({ page: '' });
    this.updateUserDrugDB(newUserDrug);
  }

  onUserDrugEdit = (userDrugToEdit) => {
    let newUserDrug = { ...userDrugToEdit, isEditing: true };
    let newUserDrugs = this.state.userDrugs.map((currentUserDrug) => {
      if (currentUserDrug.id === newUserDrug.id) {
        return newUserDrug;
      }
      return currentUserDrug;
    });
    this.setState({ userDrugs: newUserDrugs });
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
    if (daysAfterOpened === null || !userDrug.isOpened) {
      return userDrug.closedExpirationDate;
    }
    if (userDrug.isOpened) {
      let openedExpirationDate = new Date(userDrug.dateOpened + (86400000 * daysAfterOpened));
      return userDrug.closedExpirationDate <= openedExpirationDate ? userDrug.closedExpirationDate : openedExpirationDate;
    }
  }

  getDrugByName = (drugToSearchName) => {
    let drugFound = this.state.drugs.find((drugToCheck) => {
      return drugToCheck.name.toUpperCase() === drugToSearchName.toUpperCase();
    });
    return drugFound;
  }

  getDrugById = (drugToSearchId) => {
    let drugFound = this.state.drugs.find((drugToCheck) => {
      return drugToCheck.id === drugToSearchId;
    });
    return drugFound;
  }

  getDrugNameById = (drugToSearchId) => {
    let drugFound = this.getDrugById(drugToSearchId);
    return (drugFound.name);
  }

  getDrugIdByName = (drugToSearchName) => {
    let drugFound = this.getDrugByName(drugToSearchName);
    return (drugFound.id);
  }

  getDaysAfterOpened = (drugToSearchName) => {
    let drugFound = this.getDrugByName(drugToSearchName);
    return (drugFound.daysAfterOpened);
  }

  checkIfEditWindow() {
    let userDrugFound = this.state.userDrugs.find((userDrugToCheck) => {
      return userDrugToCheck.isEditing === true;
    })
    if (userDrugFound) {
      return (
        <UserDrugEdit returnHome={this.returnHome} formatDate={this.formatDate} drugsList={this.state.drugs} drugEdited={this.updateUserDrug} userDrug={userDrugFound} />
      )
    }
    return
  }

  getFrom = () => {
    axios.get('http://localhost:3001/userDrugs/1')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  formatDate(date) {
    if (date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      return year + '-' + month + '-' + day
    }
  }

  render() {
    if (!this.state.drugs[0]) {
      return <div><p>Loading</p></div>
    }
    if (this.state.page === 'addUserDrug') {
      return <AddUserDrug returnHome={this.returnHome} formatDate={this.formatDate} addUserDrug={this.addUserDrug} drugsList={this.state.drugs} />
    }
    if (this.state.page === 'addDrug') {
      return <AddDrug returnHome={this.returnHome} getDrugByName={this.getDrugByName} addDrug={this.addDrug} drugsList={this.state.drugs} />
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
          <button onClick={() => this.setState({ page: 'addUserDrug' })}> + </button>
          <button onClick={() => this.setState({ page: 'addDrug' })}> add new drug </button>
          <UserDrugs formatDate={this.formatDate} userDrugsList={this.state.userDrugs} getExpirationToShow={this.getExpirationDateToShow} userDrugsEdit={this.state.userDrugs} toggleDrugEdit={this.onUserDrugEdit} drugEdited={this.updateUserDrug} drugOpened={this.onUserDrugOpened} drugDeleted={this.onUserDrugDeleted} drug={this.state.userDrugs[0]} />
        </div>
      </div >
    );
  }
}

export default App;
