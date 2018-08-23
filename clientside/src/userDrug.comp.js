import * as React from 'react';
import { UserDrugView } from './userDrugView.comp';

export class UserDrugs extends React.Component {
    state = {
            setOpened: this.setDrugOpened
    }
    setDrugOpened = (drug) => () => {
        let newDrug = [...drug, drug.dateOpened = new Date()]
        this.setState(newDrug)
    }

    render() {
        return <table>
            <tr>
                <th>Drug Name</th>
                <th> Expiration Date</th>
                <th> Date Opened </th>
            </tr>
            {this.props.userDrugsList.map((userDrug) => {
                return <UserDrugView func={this.setDrugOpened} drug={userDrug} />
            })}
        </table>


    }
}