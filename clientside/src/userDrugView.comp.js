import * as React from 'react';
import './style-sheets/userDrugsList/userDrug.css';
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
            <div className= 'userDrugContainer'>
                <p> Name: {this.props.drug.drugName}</p>
                <p className={this.pickClassName()}>Expiration Date: {this.props.formatDate(this.getExpirationToShow())} </p>
                <div className='optionButtons'>
                    {this.checkIfOpenButton()}
                    <button onClick={this.onEdit}>edit</button>
                    <button onClick={this.onDeleted}>delete</button>
                </div>
            </div>
        );
    }
}