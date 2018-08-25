import * as React from 'react';
import { UserDrugView } from './userDrugView.comp';

export class UserDrugs extends React.Component {


    render() {
        return <table>
            <tr>
                <th>Drug Name</th>
                <th>Expiration Date</th>
                <th>Drug Functions</th>
            </tr>
            {this.props.userDrugsList.map((userDrug) => {
                return <UserDrugView drugOpened={this.props.drugOpened} drugDeleted={this.props.drugDeleted} drug={userDrug} />
            })}
        </table>


    }
}