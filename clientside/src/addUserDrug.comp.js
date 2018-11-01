import * as React from 'react';
import { UserDrugForm } from './userDrugForm.comp';

export class AddUserDrug extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userDrug: { name: null, isOpened: false, expirationDate: null, dateOpened: null }
        }
    }

    render() {
        return <UserDrugForm header = 'Add To Your List'  changePage={this.props.changePage} returnHome={this.props.returnHome} formatDate={this.props.formatDate} drugsList={this.props.drugsList} callBack={this.props.addUserDrug} userDrug={this.state.userDrug} />
    }

}