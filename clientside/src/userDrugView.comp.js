import * as React from 'react';

export class UserDrugView extends React.Component {
    
    getExpirationToShow = () => {
        return this.props.getExpirationToShow(this.props.drug);
    }

    checkIfOpenButton = () => {
        if (!this.props.drug.isOpened) {
            return <button onClick={this.onOpened}>open</button>;
        }
    }

    format2Digits(num) {
        return (num > 9 ? num : '0' + num)
    }

    formatDate(date) {
        let year = date.getFullYear();
        let month = this.format2Digits(date.getMonth());
        let day = this.format2Digits(date.getDate());
        return year + '-' + month + '-' + day
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

    pickStyleColor = () => {
        return { color: (this.checkExpired() ? 'red' : 'green') };
    }

    render() {
        return (
            <tr>
                <td> {this.props.drug.drugName}</td>
                <td style={this.pickStyleColor()}> {this.formatDate(this.getExpirationToShow())} </td>
                <td>
                    {this.checkIfOpenButton()}
                    <button onClick={this.onEdit}>edit</button>
                    <button onClick={this.onDeleted}>delete</button>
                </td>
            </tr>
        );
    }
}