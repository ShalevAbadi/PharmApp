import * as React from 'react';

export class UserDrugEditView extends React.Component {

    onSubmit = (event) => {
        this.props.handleSubmit(event, this.refs);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="number" ref="year" cols="4" rows="1" defaultValue={this.props.year} />
                    -
                    <input type="number" ref="month" cols="2" rows="1" defaultValue={this.props.month} />
                    -
                    <input type="number" ref="day" cols="2" rows="1" defaultValue={this.props.day} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}