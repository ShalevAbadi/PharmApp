import * as React from 'react';


export class AddDrug extends React.Component {

    state = {
        nameTaken: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let daysAfterOpened = this.refs.daysAfterOpened.value;
        daysAfterOpened = daysAfterOpened ? daysAfterOpened : Infinity;
        if (daysAfterOpened < 0) {
            alert('invalid input (negative number)');
            return;
        }
        if (!this.refs.name.value) {
            alert('Insert drug name');
            return;
        }
        if (this.state.nameTaken) {
            alert('Name taken');
            return;
        }
        let newDrug = { name: this.refs.name.value, daysAfterOpened: daysAfterOpened }
        event.preventDefault();
        console.log(newDrug);
        return this.props.addDrug(newDrug);
    }

    updateNameTaken = () => {
        (this.props.getDrugByName(this.refs.name.value)) ? this.setState({ nameTaken: true }) : this.setState({ nameTaken: false })
    }

    showNameTaken = () => {
        if (this.state.nameTaken === true) { return (<p> name taken </p>) }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    {this.showNameTaken()}
                    Name:
                    <input type="text" ref="name" defaultValue={this.state.name} onChange={this.updateNameTaken} />
                </label>
                <label>
                    <span> Expires </span>
                    <input type="number" ref="daysAfterOpened" />
                    <span> Days After Opened: </span>
                </label>
                <input type="submit" value="Submit" />
                <button onClick={this.props.returnHome}> cancel </button>
            </form>
        );

    }




}