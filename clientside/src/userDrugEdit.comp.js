import * as React from 'react';
import { UserDrugForm } from './userDrugForm.comp';
export class UserDrugEdit extends React.Component {

    render() {
        return <UserDrugForm header='Edit' changePage={this.props.changePage} returnHome={this.props.returnHome} formatDate={this.props.formatDate} drugsList={this.props.drugsList} callBack={this.props.drugEdited} userDrug={this.props.userDrug} />
    }
}