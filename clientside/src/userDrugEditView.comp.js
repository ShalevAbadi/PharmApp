import * as React from 'react';

export class UserDrugEditView extends React.Component {

    onSubmit = (event) => {
        this.props.handleSubmit(event);
    }

    onChanged = (event) => {
        this.props.handleChange(event);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="number" name="year" cols="4" rows="1" defaultValue={this.props.year} onChange={this.onChanged} />
                    -
                    <input type="number" name="month" cols="2" rows="1" defaultValue={this.props.month} onChange={this.onChanged} />
                    -
                    <input type="number" name="day" cols="2" rows="1" defaultValue={this.props.day} onChange={this.onChanged} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}