import * as React from 'react';
import { UserDrugView } from './userDrugView.comp';
export class UserDrugs extends React.Component {

    render() {
        return <div className='user-drugs'>
            <h1> Drugs list</h1>
            <button onClick={() => this.props.changePage('addUserDrug')}> add to your list </button>
            <button onClick={() => this.props.changePage('addDrug')}> add new drug </button>
            <button onClick={this.props.logout}> logout </button>
            <table>
                <thead>
                    <tr>
                        <th>Drug Name</th>
                        <th>Expiration Date</th>
                        <th>Drug Functions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.userDrugsList.map((userDrug) => {
                        if (!userDrug.isDeleted) {
                            return <UserDrugView formatDate={this.props.formatDate} key={userDrug.id} getExpirationToShow={this.props.getExpirationToShow} toggleDrugEdit={this.props.toggleDrugEdit} drugOpened={this.props.drugOpened} drugDeleted={this.props.drugDeleted} drug={userDrug} />
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </div >

    }
}