import * as React from 'react';
import { UserDrugView } from './userDrugView.comp';
import { UserDrugEdit } from './userDrugEdit.comp';
export class UserDrugs extends React.Component {


    render() {
        return <table>
            <tr>
                <th>Drug Name</th>
                <th>Expiration Date</th>
                <th>Drug Functions</th>
            </tr>
            {this.props.userDrugsList.map((userDrug) => {
                if (!userDrug.isDeleted) {
                    if (userDrug.isEditing) {
                        return <UserDrugEdit drugEdited={this.props.drugEdited} drugOpened={this.props.drugOpened} drugDeleted={this.props.drugDeleted} drug={userDrug} />
                    }
                    return <UserDrugView toggleDrugEdit={this.props.toggleDrugEdit} drugOpened={this.props.drugOpened} drugDeleted={this.props.drugDeleted} drug={userDrug} />
                }
                return null;
            })}
        </table>


    }
}