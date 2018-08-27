import * as React from 'react';

export class UserDrugEditDateClosed extends React.Component {

    state = {
        year: this.props.drug.closedExpirationDate.getFullYear(),
        month: this.props.drug.closedExpirationDate.getMonth(),
        day: this.props.drug.closedExpirationDate.getDay()
    }

    handleSubmit = () => {
        let newClosedExpirationDate = new Date(this.state.year, this.state.month, this.state.day);
        let oldUserDrug = this.props.drug;
        let newUserDrug = { ...oldUserDrug, closedExpirationDate: newClosedExpirationDate, isOpened: false, isEditing: false };
        //alert(newDrug.drugName + " --- " + newDrug.closedExpirationDate);
        this.props.drugEdited(newUserDrug);
    }

    format2Digits(num) {
        return (num > 9 ? num : '0' + num)
    }

    formatDate(date) {
        let year = date.getFullYear();
        let month = this.format2Digits(date.getMonth());
        let day = this.format2Digits(date.getDate());
        return year + '-' + month + '-' + day;
    }

    handleInputChange = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="number" name="year" cols="4" rows="1" defaultValue={this.state.year} onChange={this.handleInputChange} />
                    </label>
                    -
                    <input type="number" name="month" cols="2" rows="1" defaultValue={this.format2Digits(this.state.month)} onChange={this.handleInputChange} />
                    -
                    <input type="number" name="day" cols="2" rows="1" defaultValue={this.format2Digits(this.state.day)} onChange={this.handleInputChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div >
        );
    }
}