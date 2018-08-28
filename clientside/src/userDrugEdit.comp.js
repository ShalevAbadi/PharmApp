import * as React from 'react';
import { UserDrugEditView } from './userDrugEditView.comp';
export class UserDrugEdit extends React.Component {

    state = {
        isOpened: this.props.drug.isOpened,
        year: this.props.drug.isOpened ? this.props.drug.dateOpened.getFullYear() : this.props.drug.closedExpirationDate.getFullYear(),
        month: this.props.drug.isOpened ? this.props.drug.dateOpened.getMonth() : this.props.drug.closedExpirationDate.getMonth(),
        day: this.props.drug.isOpened ? this.props.drug.dateOpened.getDate() : this.props.drug.closedExpirationDate.getDate()
    }

    handleSubmit = (event, refs) => {
        let newDate = new Date(refs.year.value, refs.month.value, refs.day.value);
        let oldUserDrug = this.props.drug;
        let newUserDrug = this.state.isOpened ?
            { ...oldUserDrug, dateOpened: newDate, isOpened: true, isEditing: false } :
            { ...oldUserDrug, closedExpirationDate: newDate, isOpened: false, isEditing: false };
        event.preventDefault();
        this.props.drugEdited(newUserDrug);
    }

    showEditOpenedOrClosed() {
        return this.state.isOpened ? "Date Opened" : "Expiration Date";
    }

    toggleOpen = () => {
        let val = !(this.state.isOpened);
        this.setState({ isOpened: val });
    }

    render() {
        return (
            <div>
                <div>
                    <h1>{this.props.drug.drugName}</h1>
                </div>

                <label>
                    Is Opened?
                        <input type="checkbox" name="isOpened" defaultChecked={this.state.isOpened} onClick={this.toggleOpen} />
                </label>
                <h1>{this.showEditOpenedOrClosed()} (yyyy/mm/dd) </h1>
                <UserDrugEditView drug={this.props.drug} handleSubmit={this.handleSubmit} handleChange={this.handleChange} year={this.state.year} month={this.state.month} day={this.state.day} />

            </div >
        );
    }
}