import React, { Component } from 'react';

import { Input, Select } from '../../dist/index.es.js';

const values = {
    rawInput: {
        initial: 'input',
        updated: 'changed',
    },
    input: {
        initial: 'input',
        updated: 'changed',
    },
    rawRadio: {
        initial: 'unchecked',
        updated: 'checked',
    },
    radio: {
        initial: 'unchecked',
        updated: 'checked',
    },

    rawSelect: {
        initial: 'one',
        updated: 'two',
    },
    select: {
        initial: 'one',
        updated: 'two',
    },
};

class App extends Component {
    constructor() {
        super();

        this.state = Object.keys(values).reduce((acc, key) => {
            return { ...acc, [key]: values[key].initial };
        }, {});

        this.changeRawInput = this.changeRawInput.bind(this);
        this.changeInput = this.changeInput.bind(this);

        this.changeRawRadio = this.changeRawRadio.bind(this);
        this.changeRadio = this.changeRadio.bind(this);

        this.changeRawSelect = this.changeRawSelect.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
    }

    componentDidMount() {
        /**
         * Force update so inputs are forced to refresh
         */
        this.forceUpdate();
    }

    changeRawInput(event) {
        event.preventDefault();

        this.setState({ rawInput: event.target.value });
    }

    changeInput(event) {
        event.preventDefault();

        this.setState({ input: event.target.value });
    }

    changeRawRadio(event) {
        event.preventDefault();

        this.setState({ rawRadio: event.target.value });
    }

    changeRadio(event) {
        event.preventDefault();

        this.setState({ radio: event.target.value });
    }

    changeRawSelect(event) {
        event.preventDefault();

        this.setState({ rawSelect: event.target.value });
    }

    changeSelect(event) {
        event.preventDefault();

        this.setState({ select: event.target.value });
    }

    render() {
        return (
            <form>
                <hr />
                <div className="form-group">
                    <h4>
                        Raw Input
                        <span style={{ fontSize: '14px' }}>
                            {' '}
                            - initial:
                            {' '}
                            {values.rawInput.initial}
                            , updated:
                            {' '}
                            {values.rawInput.updated}
                        </span>
                    </h4>
                    <input
                        id="rawInput"
                        type="text"
                        onChange={this.changeRawInput}
                        value={this.state.rawInput}
                    />
                    {'  '}{values.rawInput.updated}
                </div>

                <div className="form-group">
                    <h4>
                        Input
                        <span style={{ fontSize: '14px' }}>
                            {' '}- initial: {values.input.initial}, updated: {values.input.updated}
                        </span>
                    </h4>

                    <Input
                        id="input"
                        type="text"
                        onChange={this.changeInput}
                        value={this.state.input}
                    />
                    {'  '}{values.input.updated}
                </div>

                <hr />

                <div className="form-group">
                    <h4>
                        Raw Radio
                        <span style={{ fontSize: '14px' }}>
                            {' '}
                            - initial:
                            {' '}
                            {values.rawRadio.initial}
                            , updated:
                            {' '}
                            {values.rawRadio.updated}
                        </span>
                    </h4>
                    <input
                        id="rawRadio"
                        type="radio"
                        checked={this.state.rawRadio === values.rawRadio.updated}
                        onChange={this.changeRawRadio}
                        value={this.state.rawRadio}
                    />
                    {'  '}{values.rawRadio.updated}
                </div>

                <div className="form-group">
                    <h4>
                        Radio
                        <span style={{ fontSize: '14px' }}>
                            {' '}- initial: {values.radio.initial}, updated: {values.radio.updated}
                        </span>
                    </h4>

                    <Input
                        id="radio"
                        type="radio"
                        checked={this.state.radio === values.radio.updated}
                        onChange={this.changeRadio}
                        value={this.state.radio}
                    />

                    {'  '}{values.radio.updated}
                </div>

                <hr />

                <div className="form-group">
                    <h4>
                        Raw Select
                        <span style={{ fontSize: '14px' }}>
                            {' '}
                            - initial:
                            {' '}
                            {values.rawSelect.initial}
                            , updated:
                            {' '}
                            {values.rawSelect.updated}
                        </span>
                    </h4>

                    <select
                        id="rawSelect"
                        onChange={this.changeRawSelect}
                        value={this.state.rawSelect}
                    >
                        <option value={values.rawSelect.initial}>{values.rawSelect.initial}</option>
                        <option value={values.rawSelect.updated}>{values.rawSelect.updated}</option>
                    </select>
                    {'  '}{values.rawSelect.updated}
                </div>

                <div className="form-group">
                    <h4>
                        Select
                        <span style={{ fontSize: '14px' }}>
                            {' '}
                            - initial:
                            {' '}
                            {values.select.initial}
                            , updated:
                            {' '}
                            {values.select.updated}
                        </span>
                    </h4>

                    <Select id="select" onChange={this.changeSelect} value={this.state.select}>
                        <option value={values.select.initial}>{values.select.initial}</option>
                        <option value={values.select.updated}>{values.select.updated}</option>
                    </Select>
                    {'  '}{values.select.updated}
                </div>
            </form>
        );
    }
}

export { values };
export default App;
