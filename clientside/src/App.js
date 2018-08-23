import React, { Component } from 'react';
import './App.css';
import { UserDrugs } from './userDrug.comp';

class App extends Component {
  state = {
    drugs: [
      { id: 0, name: 'Acamol', daysAfterOpened: 180 },
      { id: 0, name: 'Acamol', daysAfterOpened: 180 },
      { id: 0, name: 'Acamol', daysAfterOpened: 180 },
      { id: 0, name: 'Acamol', daysAfterOpened: 180 },
      { id: 0, name: 'Acamol', daysAfterOpened: 180 },
      { id: 0, name: 'Acamol', daysAfterOpened: 180 },
      { id: 0, name: 'Acamol', daysAfterOpened: 180 }
    ],
    userDrugs: [
      { id: 0, userName: 'Shahar Hahomo', drugName: 'Acamol', expirationDate: new Date(), dateOpened: 123 },
      { id: 0, userName: 'Shahar Hahomo', drugName: 'Acamol', expirationDate: new Date(), dateOpened: new Date() },
      { id: 0, userName: 'Shahar Hahomo', drugName: 'Acamol', expirationDate: new Date(), dateOpened: new Date() },
      { id: 0, userName: 'Shahar Hahomo', drugName: 'Acamol', expirationDate: new Date(), dateOpened: new Date() }
    ]
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
         {/*this.state.userDrugs.map((userDrug) => {
            return <div>
              <h1> {userDrug.drugName} , {userDrug.expirationDate.toString()} , {userDrug.dateOpened.toString()}</h1>
              </div>
              })*/}
              <UserDrugs userDrugsList = {this.state.userDrugs}/>
        </div>
              <div className='drugs-list'>
              </div>
      </div>
        );
      }
    }
    
    export default App;
