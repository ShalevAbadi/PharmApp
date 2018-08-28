import * as React from 'react';

export class AddUserDrug extends React.Component {
    constructor(props) {
        super(props)
        let date = new Date;
        this.state = {
            drugName: this.props.drugsList[0].name,
            isOpened: false,
            expirationYear: date.getFullYear(),
            expirationMonth: date.getMonth(),
            expirationDay: date.getDate(),
            yearOpened: date.getFullYear(),
            monthOpened: date.getMonth(),
            dayOpened: date.getDate(),
            userDrugToAdd: { drugName: '', closedExpirationDate: new Date(), dateOpened: new Date(), isOpened: false, isDeleted: false, isEditing: false }
        }
    }

    handleSubmit = (event) => {
        let expirationDate = new Date(this.state.expirationYear, this.state.expirationMonth, this.state.expirationDay);
        let newUserDrug = { drugName: this.state.drugName, closedExpirationDate: expirationDate, isOpened: this.state.isOpened, isEditing: false };
        if (newUserDrug.isOpened){
        let newDateOpened =  new Date(this.state.yearOpened, this.state.monthOpened, this.state.dayOpened);
        newUserDrug = {...newUserDrug, dateOpened: newDateOpened, isOpened: true}
    }
    alert(newUserDrug.drugName);
    event.preventDefault();
    this.props.addUserDrug(newUserDrug);
    }

    handleInputChange = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    }

    handleNameChange = (event) => {
        this.setState({drugName: event.target.value});
      }

    toggleOpen = () => {
        let val = !(this.state.isOpened);
        this.setState({ isOpened: val });
    }

    showDateOpenedInput = () => {
        if (this.state.isOpened) {
            return (<label>
                Date Opened (yyyy/mm/dd):
                        <input type="number" name="yearOpened" cols="4" rows="1" defaultValue={this.state.yearOpened} onChange={this.handleInputChange} />
                -
                        <input type="number" name="monthOpened" cols="2" rows="1" defaultValue={(this.state.monthOpened)} onChange={this.handleInputChange} />
                -
                        <input type="number" name="dayOpened" cols="2" rows="1" defaultValue={(this.state.dayOpened)} onChange={this.handleInputChange} />
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
                                return <option  value={drug.drugName}>{drug.name}</option>
                            })
                            }
                        </select >
                    </label>
                    <br />
                    <label>
                        Expiration Date (yyyy/mm/dd):
                        <input type="number" name="ExpirationYear" cols="4" rows="1" defaultValue={this.state.expirationYear} onChange={this.handleInputChange} />
                        -
                        <input type="number" name="ExpirationMonth" cols="2" rows="1" defaultValue={(this.state.expirationMonth)} onChange={this.handleInputChange} />
                        -
                        <input type="number" name="ExpirationDay" cols="2" rows="1" defaultValue={(this.state.expirationDay)} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Is Opened?
                        <input type="checkbox" name="isOpened" checked={this.state.isOpened} onClick={this.toggleOpen} />
                    </label>
                    <br />
                    {this.showDateOpenedInput()}
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}