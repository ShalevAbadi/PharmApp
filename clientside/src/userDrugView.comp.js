import * as React from 'react';

export class UserDrugView extends React.Component {
    
    render() {
        return <tr>
            <td> {this.props.drug.drugName}</td>
            <td> {this.props.drug.expirationDate.toString()}</td>
            <td>{this.props.drug.dateOpened.toString()} <button onClick = {this.props.func(this.props.drug)}>open</button></td>
        </tr>
    }
}