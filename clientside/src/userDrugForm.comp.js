import * as React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Select from 'react-select';

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
        if (!this.state.drugName) {
            return alert("Choose drug name");
        }
        if (this.state.selectedExpirationDate === null) {
            return alert("You didn't pick a date");
        }
        let newUserDrug = { ...this.state.newUserDrug, drugName: this.state.drugName, closedExpirationDate: this.state.selectedExpirationDate, isOpened: this.state.isOpened };
        if (newUserDrug.isOpened) {
            if (this.state.selectedDateOpened === null) {
                return alert("You didn't pick an opening date");
            }
            newUserDrug = { ...newUserDrug, dateOpened: this.state.selectedDateOpened }
        }
        event.preventDefault();
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
                <div>
                    <p>Date Opened:</p>
                    <DayPickerInput placeholder={this.props.formatDate(this.props.userDrug.dateOpened)} onDayChange={(date) => { this.handleDateOpenedChange(date) }} />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Drug Name:
                         <Select
                            value={this.state.drugName}
                            placeholder={this.state.drugName}
                            onChange={this.handleNameChange}
                            options={this.props.drugsList.map((drug) => {
                                if (drug.daysAfterOpened === Infinity) {
                                    return { value: drug.name, label: drug.name }
                                }
                                return { value: drug.name, label: drug.name + ", expires " + drug.daysAfterOpened + " days after opening" };
                            })}
                        />

                    </label>
                    <br />
                    <label>
                        <div>
                            <p>Expiration Date:</p>
                            <DayPickerInput placeholder={this.props.formatDate(this.props.userDrug.closedExpirationDate)} onDayChange={(date) => { this.handleExpirationDateChange(date) }} />
                        </div>
                    </label>
                    <br />
                    <label>
                        Is Opened?
                        <input type="checkbox" name="isOpened" defaultChecked={this.state.isOpened} onClick={this.toggleOpen} />
                    </label>
                    <br />
                    {this.showDateOpenedInput()}
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    };

}