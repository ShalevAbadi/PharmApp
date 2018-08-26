import * as React from 'react';

export class UserDrugEdit extends React.Component {

    format2Digits(num) {
        return (num > 9 ? num : '0' + num)
    }

    formatDate(date) {
        let year = date.getFullYear();
        let month = this.format2Digits(date.getMonth());
        let day = this.format2Digits(date.getDate());
        return year + '-' + month + '-' + day;
    }

    onDone = () => {
        let id = this.props.drug.id;
        let newExpirationDate = new Date(document.getElementById("yearInput" + id).value,
            document.getElementById("monthInput" + id).value,
            document.getElementById("dayInput" + id).value);
        let newDrug = { ...this.props.drug, expirationDate: newExpirationDate, isOpened: false, isEditing: false };
        this.props.drugEdited(newDrug);
    }

    render() {
        let id = this.props.drug.id;
        return (
                <tr>
                    <td>{this.props.drug.drugName}</td>
                    <td>
                        <textarea id={"yearInput" + id} cols="4" rows="1">
                            {this.props.drug.expirationDate.getFullYear()}
                        </textarea>
                        -
                    <textarea id={"monthInput" + id} cols="2" rows="1">
                            {this.format2Digits(this.props.drug.expirationDate.getMonth())}
                        </textarea>
                        -
                    <textarea id={"dayInput" + id} cols="2" rows="1">
                            {this.format2Digits(this.props.drug.expirationDate.getDate())}
                        </textarea>

                    </td>
                    <td>
                        <button onClick={this.onDone}>done</button>
                    </td>
                </tr>
        );
    }
}