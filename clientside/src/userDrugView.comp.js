import * as React from 'react';
import expiredImage from './style-sheets/images/expired.jpg';

export class UserDrugView extends React.Component {

    getExpirationToShow = () => {
        return this.props.getExpirationToShow(this.props.drug);
    }

    formatExpiration = () => {
        return this.props.formatDate(this.getExpirationToShow());
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
        return this.getExpirationToShow() <= new Date();
    }

    pickExipred = () => {
        if (this.checkExpired()) {
            return (
                <img className='expired' src={expiredImage} alt='Expired' />
            )
        }
    }

    render() {
        return (
            <div className='userDrugContainer'>
                <p> Name: {this.props.drug.drugName}</p>
                <p>Expiration Date: {this.formatExpiration()} </p>
                <div className='optionButtons'>
                    {this.checkIfOpenButton()}
                    <button onClick={this.onEdit}>edit</button>
                    <button onClick={this.onDeleted}>delete</button>
                    {this.pickExipred()}
                </div>
            </div>
        );
    }
}