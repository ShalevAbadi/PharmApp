import * as React from 'react';
import { UserDrugView } from './userDrugView.comp';
import './style-sheets/userDrugsList/userDrugsTable.css';
import './style-sheets/userDrugsList/userDrugsList.css'

export class UserDrugs extends React.Component {

    render() {
        return <div id='userDrugs'>
            <h1> Drugs list</h1>
            <div className="drugListNavButtons">
                <button onClick={() => this.props.changePage('addUserDrug')}> add to your list </button>
                <button onClick={() => this.props.changePage('addDrug')}> add new drug </button>
                <button onClick={this.props.logout}> logout </button>
            </div>
            <div id='userDrugsContainer'>
                {this.props.userDrugsList.map((userDrug) => {
                    if (!userDrug.isDeleted) {
                        return <UserDrugView formatDate={this.props.formatDate} key={userDrug.id} getExpirationToShow={this.props.getExpirationToShow} toggleDrugEdit={this.props.toggleDrugEdit} drugOpened={this.props.drugOpened} drugDeleted={this.props.drugDeleted} drug={userDrug} />
                    }
                    return null;
                })}
            </div>

        </div >

    }
}