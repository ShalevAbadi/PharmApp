import * as React from 'react';
import { UserDrugView } from './userDrugView.comp';
export class UserDrugs extends React.Component {

    render() {
        return <table>
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
                    return <UserDrugView key={userDrug.id}  getExpirationToShow= {this.props.getExpirationToShow} toggleDrugEdit={this.props.toggleDrugEdit} drugOpened={this.props.drugOpened} drugDeleted={this.props.drugDeleted} drug={userDrug} />
                }
                return null;
            })}
            </tbody>
        </table>


    }
}