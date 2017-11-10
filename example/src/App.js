import React, { Component } from 'react';

import { Input, Select } from '../../src/index';

const values = {
    rawInput: {
        initial: 'input',
        updated: 'changed',
    },
    input: {
        initial: 'input',
        updated: 'changed',
    },

    rawCheckbox: {
        initial: false,
        updated: true,
    },

    checkbox: {
        initial: false,
        updated: true,
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

        this.state = Object.keys(values).reduce(
            (acc, key) => {
                return { ...acc, [key]: values[key].initial };
            },
            { auto: false },
        );

        this.handleChange = this.handleChange.bind(this);
        this.handleEarlyInput = this.handleEarlyInput.bind(this);
    }

    componentDidMount() {
        /**
         * Force update so inputs are forced to refresh
         */
        this.forceUpdate();

        if (window.__AUTO__ === true) {
            this.setState(() => {
                return {
                    auto: true,
                };
            });
        }
    }

    handleEarlyInput(inputNode) {
        const name = inputNode.name;
        const value =
            inputNode.type === 'checkbox' ? inputNode.checked : inputNode.value;

        this.setState(() => {
            return {
                [name]: value,
            };
        });
    }

    handleChange(event) {
        const type = event.target.type;
        const name = event.target.name;
        const value =
            type === 'checkbox' ? event.target.checked : event.target.value;

        if (type !== 'checkbox' && type !== 'radio') {
            event.preventDefault();
        }

        this.setState(() => {
            return {
                [name]: value,
            };
        });
    }

    render() {
        return (
            <form>
                <hr />
                <div className="row">
                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.rawInput ===
                                      values.rawInput.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-info'
                            }
                        `}
                    >
                        <h4>
                            Raw Input
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial: {values.rawInput.initial}
                                , updated: {values.rawInput.updated}
                            </span>
                        </h4>
                        <input
                            type="text"
                            id="rawInput"
                            name="rawInput"
                            onChange={this.handleChange}
                            value={this.state.rawInput}
                        />
                        {'  '}state: {this.state.rawInput}
                    </div>

                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.input === values.input.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-warning'
                            }
                        `}
                    >
                        <h4>
                            Input
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial: {values.input.initial}
                                , updated: {values.input.updated}
                            </span>
                        </h4>
                        <Input
                            type="text"
                            id="input"
                            name="input"
                            onChange={this.handleChange}
                            onEarlyInput={this.handleEarlyInput}
                            value={this.state.input}
                        />
                        {'  '}state: {this.state.input}
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.rawCheckbox ===
                                      values.rawCheckbox.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-info'
                            }
                        `}
                    >
                        <h4>
                            Raw Checkbox
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial:{' '}
                                {values.rawCheckbox.initial.toString()}
                                , updated:{' '}
                                {values.rawCheckbox.updated.toString()}
                            </span>
                        </h4>
                        <input
                            type="checkbox"
                            id="rawCheckbox"
                            name="rawCheckbox"
                            checked={this.state.rawCheckbox}
                            onChange={this.handleChange}
                        />
                        {'  '}state: {this.state.rawCheckbox.toString()}
                    </div>

                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.checkbox ===
                                      values.checkbox.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-warning'
                            }
                        `}
                    >
                        <h4>
                            Checkbox
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial: {values.checkbox.initial.toString()}
                                , updated: {values.checkbox.updated.toString()}
                            </span>
                        </h4>
                        <Input
                            type="checkbox"
                            id="checkbox"
                            name="checkbox"
                            checked={this.state.checkbox}
                            onChange={this.handleChange}
                            onEarlyInput={this.handleEarlyInput}
                        />
                        {'  '}
                        state: {this.state.checkbox.toString()}
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.rawRadio ===
                                      values.rawRadio.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-info'
                            }
                        `}
                    >
                        <h4>
                            Raw Radio
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial: {values.rawRadio.initial}
                                , updated: {values.rawRadio.updated}
                            </span>
                        </h4>
                        <input
                            id="rawRadio1"
                            type="radio"
                            name="rawRadio"
                            checked={
                                this.state.rawRadio === values.rawRadio.initial
                            }
                            onChange={this.handleChange}
                            value={values.rawRadio.initial}
                        />
                        {'  '}
                        {values.rawRadio.initial}
                        <br />
                        <input
                            type="radio"
                            id="rawRadio"
                            name="rawRadio"
                            checked={
                                this.state.rawRadio === values.rawRadio.updated
                            }
                            onChange={this.handleChange}
                            value={values.rawRadio.updated}
                        />
                        {'  '}
                        {values.rawRadio.updated}
                        <br />
                        {'  '}state: {this.state.rawRadio}
                    </div>

                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.radio === values.radio.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-warning'
                            }
                        `}
                    >
                        <h4>
                            Radio
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial: {values.radio.initial}
                                , updated: {values.radio.updated}
                            </span>
                        </h4>
                        <Input
                            type="radio"
                            id="radio1"
                            name="radio"
                            checked={this.state.radio === values.radio.initial}
                            onChange={this.handleChange}
                            onEarlyInput={this.handleEarlyInput}
                            value={values.radio.initial}
                        />
                        {'  '}
                        {values.radio.initial}
                        <br />
                        <Input
                            id="radio"
                            type="radio"
                            name="radio"
                            checked={this.state.radio === values.radio.updated}
                            onChange={this.handleChange}
                            onEarlyInput={this.handleEarlyInput}
                            value={values.radio.updated}
                        />
                        {'  '}
                        {values.radio.updated}
                        <br />
                        {'  '}state: {this.state.radio}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.rawSelect ===
                                      values.rawSelect.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-info'
                            }
                        `}
                    >
                        <h4>
                            Raw Select
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial: {values.rawSelect.initial}
                                , updated: {values.rawSelect.updated}
                            </span>
                        </h4>
                        <select
                            id="rawSelect"
                            name="rawSelect"
                            onChange={this.handleChange}
                            value={this.state.rawSelect}
                        >
                            <option value={values.rawSelect.initial}>
                                {values.rawSelect.initial}
                            </option>
                            <option value={values.rawSelect.updated}>
                                {values.rawSelect.updated}
                            </option>
                        </select>
                        {'  '}state: {this.state.rawSelect}
                    </div>

                    <div
                        className={`form-group col-sm-6 alert
                            ${
                                this.state.auto
                                    ? this.state.select ===
                                      values.select.updated
                                      ? 'alert-success'
                                      : 'alert-danger'
                                    : 'alert-warning'
                            }
                        `}
                    >
                        <h4>
                            Select
                            <span style={{ fontSize: '14px' }}>
                                {' '}
                                - initial: {values.select.initial}
                                , updated: {values.select.updated}
                            </span>
                        </h4>
                        <Select
                            id="select"
                            name="select"
                            onEarlyInput={this.handleEarlyInput}
                            onChange={this.handleChange}
                            value={this.state.select}
                        >
                            <option value={values.select.initial}>
                                {values.select.initial}
                            </option>
                            <option value={values.select.updated}>
                                {values.select.updated}
                            </option>
                        </Select>
                        {'  '}state: {this.state.select}
                    </div>
                </div>
            </form>
        );
    }
}

export { values };
export default App;
