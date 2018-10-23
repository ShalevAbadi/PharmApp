import * as React from 'react';
import './style-sheets/addDrug/addDrug.css'

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
        if (this.state.nameTaken === true) { return (<p id='name-taken'> name taken </p>) }
    }

    render() {
        return (
            <div id='drugFormContainer'>
                <div id='drugForm'>
                    <h1> Add New Drug</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                    <input type="text" ref="name" placeholder="Drug Name" defaultValue={this.state.name} onChange={this.updateNameTaken} />
                            {this.showNameTaken()}
                        </label>
                        <label>
                            <p>
                                <span> Expires </span>
                                <span><input type="number" ref="daysAfterOpened" /></span>
                                <span> Days After Opened </span>
                            </p>
                        </label>
                        <button type="submit" value="Submit"> Submit</button>
                        <button onClick={this.props.returnHome}> cancel </button>
                    </form>
                </div>
            </div >
        );

    }




}