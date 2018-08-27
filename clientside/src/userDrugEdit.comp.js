import * as React from 'react';
import { UserDrugEditDateOpened } from './userDrugEditDateOpened.comp';
import { UserDrugEditDateClosed } from './userDrugEditDateClosed.comp';
export class UserDrugEdit extends React.Component {

    state = {
        isOpened: this.props.drug.isOpened
    }

    showEditOpenedOrClosed() {
        return this.state.isOpened ?
            <UserDrugEditDateOpened drug={this.props.drug} drugEdited={this.props.drugEdited} /> :
            <UserDrugEditDateClosed drug={this.props.drug} drugEdited={this.props.drugEdited} />;
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
                <form>
                    <label>
                        Is Opened?
                        <input type="checkbox" name="isOpened" checked={this.state.isOpened} onClick={this.toggleOpen} />
                    </label>
                    {this.showEditOpenedOrClosed()}
                </form>
            </div >
        );
    }
}