import * as React from 'react';

export class UserDrugEditDateOpened extends React.Component {

    format2Digits(num) {
        return (num > 9 ? num : '0' + num)
    }

    formatDate(date) {
        let year = date.getFullYear();
        let month = this.format2Digits(date.getMonth());
        let day = this.format2Digits(date.getDate());
        return year + '-' + month + '-' + day;
    }

    onEdited = () => {
        let newDateOpened = new Date(document.getElementById("yearInput").value,
            document.getElementById("monthInput").value,
            document.getElementById("dayInput").value);
        let newDrug = { ...this.props.drug, dateOpened: newDateOpened, isOpened: true, isEditing: false };
        this.props.drugEdited(newDrug);
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        <input type="text" id="yearInput" cols="4" rows="1" defaultValue={this.props.drug.dateOpened.getFullYear()} />
                        -
                        <input type="text" id="monthInput" cols="2" rows="1" defaultValue={this.format2Digits(this.props.drug.dateOpened.getMonth())} />
                        -
                         <input type="text" id="dayInput" cols="2" rows="1" defaultValue={this.format2Digits(this.props.drug.dateOpened.getDate())} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div >
        );
    }
}