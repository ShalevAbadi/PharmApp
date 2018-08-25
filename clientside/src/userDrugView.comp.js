import * as React from 'react';

export class UserDrugView extends React.Component {

    checkDateOpendOrButton = () => {
        if (!this.props.drug.isOpened) {
            return <button onClick={this.onOpened}>open</button>;
        }
    }

    onOpened = () => {
        this.props.drugOpened(this.props.drug);
    }

    onDeleted = () => {
        this.props.drugDeleted(this.props.drug);
    }

    render() {
        return (
            <tr>
                <td> {this.props.drug.drugName}</td>
                <td> {this.props.drug.expirationDate.toString()}</td>
                <td>
                    {this.checkDateOpendOrButton()}
                    <button>edit</button>
                    <button onClick={this.onDeleted}>delete</button>
                </td>
            </tr>
        );
    }
}