import * as React from 'react';
import './style-sheets/userDrug.css';
export class UserDrugView extends React.Component {
    
    getExpirationToShow = () => {
        return this.props.getExpirationToShow(this.props.drug);
    }

    checkIfOpenButton = () => {
        if (this.props.drug.isOpened === false) {
            return <button onClick={this.onOpened}>open</button>;
        }
    }

    onOpened = () => {
        this.props.drugOpened(this.props.drug);
    }

    onEdit = () => {
        this.props.toggleDrugEdit(this.props.drug);
    }

    onDeleted = () => {
        this.props.drugDeleted(this.props.drug);
    }

    checkExpired = () => {
        return (this.getExpirationToShow() <= new Date())
    }

    pickClassName = () => {
        return (this.checkExpired() ? 'expired' : 'valid') ;
    }

    render() {
        return (
            <tr>
                <td> {this.props.drug.drugName}</td>
                <td className={this.pickClassName()}> {this.props.formatDate(this.getExpirationToShow())} </td>
                <td>
                    {this.checkIfOpenButton()}
                    <button onClick={this.onEdit}>edit</button>
                    <button onClick={this.onDeleted}>delete</button>
                </td>
            </tr>
        );
    }
}