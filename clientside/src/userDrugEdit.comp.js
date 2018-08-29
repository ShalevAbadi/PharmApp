import * as React from 'react';
import { UserDrugForm } from './userDrugForm.comp';
export class UserDrugEdit extends React.Component {

    render() {
        console.log(this.props.userDrug)
        return <UserDrugForm formatDate={this.props.formatDate} drugsList={this.props.drugsList} callBack={this.props.drugEdited} userDrug={this.props.userDrug} />
    }
}