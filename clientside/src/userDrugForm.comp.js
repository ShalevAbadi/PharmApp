import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Select from 'react-select';
import './style-sheets/addUserDrug/addUserDrug.css'

export class UserDrugForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drugName: this.props.userDrug.drugName,
            isOpened: this.props.userDrug.isOpened,
            selectedExpirationDate: this.props.userDrug.closedExpirationDate,
            selectedDateOpened: this.props.userDrug.dateOpened,
            newUserDrug: { id: this.props.userDrug.id, isDeleted: false, isEditing: false }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!this.state.drugName) {
            return alert("Choose drug name");
        }
        if (!this.state.selectedExpirationDate) {
            return alert("You didn't pick an expiration date");
        }
        let newUserDrug = { ...this.state.newUserDrug, drugName: this.state.drugName, closedExpirationDate: this.state.selectedExpirationDate, dateOpened: this.state.selectedDateOpened, isOpened: this.state.isOpened };
        if (newUserDrug.isOpened && (!this.state.selectedDateOpened)) {
            return alert("You didn't pick an opening date");
        }
        this.props.callBack(newUserDrug);
    }

    handleDateOpenedChange = (date) => {
        this.setState({
            selectedDateOpened: date
        });
    }

    handleExpirationDateChange = (date) => {
        this.setState({
            selectedExpirationDate: date
        });
    }

    handleNameChange = (selectedOption) => {
        this.setState({ drugName: selectedOption.value })
    }

    toggleOpen = () => {
        let val = !(this.state.isOpened);
        this.setState({ isOpened: val });
    }

    showDateOpenedInput = () => {
        if (this.state.isOpened) {
            return (
                <label>
                    <p>Date Opened:</p>
                    <DayPickerInput placeholder={this.props.formatDate(this.props.userDrug.dateOpened)} onDayChange={(date) => { this.handleDateOpenedChange(date) }} />
                </label>
            );
        }
    }

    render() {
        return (
            <div id='userDrugFormContainer'>
                <div id='userDrugForm'>
                    <h1>{this.props.header}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <p>Drug Name:</p>
                        <Select
                            value={this.state.drugName}
                            placeholder={this.state.drugName}
                            onChange={this.handleNameChange}
                            options={this.props.drugsList.map((drug) => {
                                if (drug.daysAfterOpened === null) {
                                    return { value: drug.name, label: drug.name }
                                }
                                return { value: drug.name, label: drug.name + ", expires " + drug.daysAfterOpened + " days after opening" };
                            })}
                        />
                        <br />
                        <p> Not in the list? <a href='#' onClick={() => this.props.changePage('addDrug')}> Create new drug</a> </p>
                        <div>
                            <p>Expiration Date:</p>
                            <DayPickerInput placeholder={this.props.formatDate(this.props.userDrug.closedExpirationDate)} onDayChange={(date) => { this.handleExpirationDateChange(date) }} />
                        </div>
                        <br />
                        Is Opened?
                        <input type="checkbox" name="isOpened" defaultChecked={this.state.isOpened} onClick={this.toggleOpen} />
                        <br />
                        {this.showDateOpenedInput()}
                        <p />
                        <button type="submit" value="Submit"> Submit</button>
                        <button onClick={this.props.returnHome}> cancel </button>
                    </form>
                </div>
            </div>
        );
    };

}