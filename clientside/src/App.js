import React, { Component } from 'react';
import './App.css';
import * as axios from 'axios';
import { UserDrugs } from './userDrug.comp';
import { UserDrugEdit } from './userDrugEdit.comp';
import { AddUserDrug } from './addUserDrug.comp';
import { AddDrug } from './addDrug.comp';
import { Login } from './login.comp';
import { Signup } from './signup.comp';

const Promise = require('promise');
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: '',
      userName: '',
      userId: '',
      drugs: [],
      userDrugs: []
    }
  }

  componentWillMount = () => {
    this.setToken().then((result) => {
      this.validateLogin().then((result) => {
        if (result) {
          this.getDrugs();
          this.getUserDrugs();
        }
      });
    })

  }

  setToken = () => {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token') !== '') {
        resolve(this.setState({ token: { headers: { Authorization: "Bearer " + localStorage.getItem('token') } } }));
      }
      else {
        resolve()
      }
    });
  }

  validateLogin = () => {
    return new Promise((resolve, reject) => {
      if (this.state.token) {
        return axios.post('http://localhost:3001/user/validateLogin', null, this.state.token)
          .then((response) => {
            if (response.status === 200) {
              resolve(true);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      this.localStorage.setItem('token', '');
      this.setState({ token: '' });
      reject();
    });
  }

  login = (loginData) => {
    axios.post('http://localhost:3001/user/login/', loginData)
      .then((response) => {
        this.setState({ page: '' })
        this.setState({ toekn: { headers: { Authorization: "Bearer " + response.data.token } } })
        localStorage.setItem('token', response.data.token);
        this.getDrugs();
        this.getUserDrugs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logout = () => {
    localStorage.setItem('token', '');
    this.setState({
      page: '',
      userName: '',
      userId: '',
      drugs: [],
      userDrugs: []
    });
  }

  getDrugs = () => {
    axios.get('http://localhost:3001/drugs', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
      .then((response) => {
        this.setState({ drugs: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addDrugDB = (newDrug) => {
    console.log(JSON.stringify(newDrug));
    axios.post('http://localhost:3001/drugs', newDrug, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
      .then((response) => {
        console.log(response);
        this.getDrugs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserDrugs = () => {
    axios.get('http://localhost:3001/userDrugs/', { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
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
    axios.post('http://localhost:3001/userDrugs', userDrug, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
      .then((response) => {
        this.getUserDrugs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  signupDB = (user) => {
    axios.post('http://localhost:3001/user/signup', user).then((response) => {
      this.login(user);
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateUserDrugDB = (userDrug) => {
    userDrug = ({ ...userDrug, drugId: this.getDrugIdByName(userDrug.drugName), closedExpirationDate: this.formatDate(userDrug.closedExpirationDate), dateOpened: this.formatDate(userDrug.dateOpened) });
    axios.patch('http://localhost:3001/userDrugs/' + userDrug.id, userDrug, { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
      .then((response) => {
        this.getUserDrugs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  returnHome = () => {
    this.changePage('');
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

  changePage = (pageName) => {
    this.setState({ page: pageName });
  }

  validateEmail = (email) => {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)) {
      return (true)
    }
    return (false)
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

  formatDate(date) {
    if (date) {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      return year + '-' + month + '-' + day
    }
  }

  render() {
    if (this.state.page === 'signup') {
      return <Signup signup={this.signupDB} validateEmail={this.validateEmail} returnHome={this.returnHome} />
    }
    if (localStorage.getItem('token') === '') {
      return <Login onSubmit={this.login} changePage={this.changePage} />
    }
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
          <h1>Hello {this.state.userName}</h1>
          <p> you logged at {this.props.user.loggedAt.toString()}</p>
        </div>
        <div className='user-drugs'>
          <h1> here all your drugs</h1>
          <button onClick={() => this.changePage('addUserDrug')}> add to your list </button>
          <button onClick={() => this.changePage('addDrug')}> add new drug </button>
          <button onClick={this.logout}> logout </button>
          <UserDrugs formatDate={this.formatDate} userDrugsList={this.state.userDrugs} getExpirationToShow={this.getExpirationDateToShow} userDrugsEdit={this.state.userDrugs} toggleDrugEdit={this.onUserDrugEdit} drugEdited={this.updateUserDrug} drugOpened={this.onUserDrugOpened} drugDeleted={this.onUserDrugDeleted} drug={this.state.userDrugs[0]} />
        </div>
      </div >
    );
  }
}

export default App;
