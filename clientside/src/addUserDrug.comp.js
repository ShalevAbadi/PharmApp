import * as React from 'react';

export class AddUserDrug extends React.Component {
    constructor(props) {
        super(props)
        let date = new Date;
        this.state = {
            drugName: this.props.drugsList[0].name,
            isOpened: false,
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            userDrugToAdd: { drugName: '', closedExpirationDate: new Date(), dateOpened: new Date(), isOpened: false, isDeleted: false, isEditing: false }
        }
    }

    handleSubmit = (event) => {
        let expirationDate = new Date(this.refs.expirationYear.value, this.refs.expirationMonth.value, this.refs.expirationDay.value);
        let newUserDrug = { drugName: this.state.drugName, closedExpirationDate: expirationDate, isOpened: this.state.isOpened, isEditing: false };
        if (newUserDrug.isOpened) {
            let newDateOpened = new Date(this.refs.yearOpened.value, this.refs.monthOpened.value, this.refs.dayOpened.value);
            newUserDrug = { ...newUserDrug, dateOpened: newDateOpened, isOpened: true }
        }
        event.preventDefault();
        this.props.addUserDrug(newUserDrug);
    }



    handleNameChange = (event) => {
        this.setState({ drugName: event.target.value });
    }

    toggleOpen = () => {
        let val = !(this.state.isOpened);
        this.setState({ isOpened: val });
    }

    showDateOpenedInput = () => {
        if (this.state.isOpened) {
            return (<label>
                Date Opened (yyyy/mm/dd):
                        <input type="number" ref="yearOpened" cols="4" rows="1" defaultValue={this.state.year} />
                -
                        <input type="number" ref="monthOpened" cols="2" rows="1" defaultValue={(this.state.month)} />
                -
                        <input type="number" ref="dayOpened" cols="2" rows="1" defaultValue={(this.state.day)} />
            </label>
            )
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Drug Name:
                        < select value={this.state.value} onChange={this.handleNameChange} >
                            {this.props.drugsList.map((drug) => {
                                return <option key={drug.name} value={drug.drugName}>{drug.name}</option>
                            })
                            }
                        </select >
                    </label>
                    <br />
                    <label>
                        Expiration Date (yyyy/mm/dd):
                        <input type="number" ref="expirationYear" cols="4" rows="1" defaultValue={this.state.year} />
                        -
                        <input type="number" ref="expirationMonth" cols="2" rows="1" defaultValue={(this.state.month)} />
                        -
                        <input type="number" ref="expirationDay" cols="2" rows="1" defaultValue={(this.state.day)} />
                    </label>
                    <br />
                    <label>
                        Is Opened?
                        <input type="checkbox" name="isOpened" checked={this.state.isOpened} onClick={this.toggleOpen} />
                    </label>
                    <br />
                    {this.showDateOpenedInput()}
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}