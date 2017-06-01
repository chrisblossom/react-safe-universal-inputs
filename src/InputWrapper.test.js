import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';

import ReactTestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import { Input } from './index';

it('should show react input load bug', () => {
    let changedTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: props.value || '',
            };
        }

        componentDidMount() {
            if (this.input && (this.input.value === '' || this.input.value)) {
                valueSynced = this.state.value === this.input.value;
            }
        }

        handleChange(event) {
            changedTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        render() {
            return (
                <input
                    ref={input => {
                        this.input = input;
                    }}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value=""/g, 'value="new value"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('new value');

    expect(instance.state.value).toEqual('');
    // expect(instance.input.value).toEqual(instance.state.value);
    expect(instance.state.value).toEqual('');
    expect(changedTriggered).toEqual(false);
    expect(valueSynced).toEqual(false);
});

it('should not trigger onChange with no onEarlyInput when input is not changed', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: props.value || '',
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        render() {
            return (
                <Input onChange={this.handleChange} value={this.state.value} />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />);

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('');
    expect(instance.state.value).toEqual('');
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(undefined);
});

it('should not trigger onEarlyInput when input is not changed', () => {
    let onEarlyInputTriggered = false;
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: props.value || '',
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    value: inputNode.value,
                };
            });
        }

        render() {
            return (
                <Input
                    onChange={this.handleChange}
                    onEarlyInput={this.handleEarlyInput}
                    value={this.state.value}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />);

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('');
    expect(instance.state.value).toEqual('');
    expect(onEarlyInputTriggered).toEqual(false);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(undefined);
});

it('should trigger onEarlyInput when input changed before react client render', () => {
    let onEarlyInputTriggered = false;
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: props.value || '',
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    value: inputNode.value,
                };
            });
        }

        render() {
            return (
                <Input
                    onChange={this.handleChange}
                    onEarlyInput={this.handleEarlyInput}
                    value={this.state.value}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value=""/g, 'value="new value"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('new value');
    expect(instance.state.value).toEqual('new value');
    expect(onEarlyInputTriggered).toEqual(true);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(true);
});

it('should trigger onChange with no onEarlyInput when input changed before react client render', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: props.value || '',
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        render() {
            return (
                <Input onChange={this.handleChange} value={this.state.value} />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value=""/g, 'value="new value"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('new value');
    expect(instance.state.value).toEqual('new value');
    expect(onChangeTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should return dom node to onEarlyInput function', () => {
    let onChangeTriggered = false;
    let onEarlyInputTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                example: props.value || '',
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.example !== prevState.example;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    [event.target.name]: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    [inputNode.name]: inputNode.value,
                };
            });
        }

        render() {
            return (
                <Input
                    name="example"
                    onChange={this.handleChange}
                    onEarlyInput={this.handleEarlyInput}
                    value={this.state.example}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value=""/g, 'value="new value"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('new value');
    expect(instance.state.example).toEqual('new value');
    expect(onEarlyInputTriggered).toEqual(true);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(true);
});

it('should return dom node to onChange function (no onEarlyInput)', () => {
    let onChangeTriggered = false;
    let onEarlyInputTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                example: props.value || '',
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.example !== prevState.example;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    [event.target.name]: event.target.value,
                };
            });
        }

        render() {
            return (
                <Input
                    name="example"
                    onChange={this.handleChange}
                    value={this.state.example}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value=""/g, 'value="new value"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('new value');
    expect(instance.state.example).toEqual('new value');
    expect(onChangeTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle checkbox not changed without onEarlyInput', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                checked: false,
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.checked !== prevState.checked;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        render() {
            return (
                <Input
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={this.state.checked}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />);

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.checked).toEqual(false);
    expect(instance.state.checked).toEqual(false);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(undefined);
});

it('should handle checkbox not changed with onEarlyInput', () => {
    let onEarlyInputTriggered = false;
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                checked: false,
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.checked !== prevState.checked;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    checked: inputNode.checked,
                };
            });
        }

        render() {
            return (
                <Input
                    type="checkbox"
                    onChange={this.handleChange}
                    onEarlyInput={this.handleEarlyInput}
                    checked={this.state.checked}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />);

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.checked).toEqual(false);
    expect(instance.state.checked).toEqual(false);
    expect(onEarlyInputTriggered).toEqual(false);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(undefined);
});

it('should handle checkbox initial false without onEarlyInput', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                checked: false,
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.checked !== prevState.checked;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        render() {
            return (
                <Input
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={this.state.checked}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/type="checkbox"/, 'type="checkbox" checked=""');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.checked).toEqual(true);
    expect(instance.state.checked).toEqual(true);
    expect(onChangeTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle checkbox initial false with onEarlyInput', () => {
    let onEarlyInputTriggered = false;
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                checked: false,
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.checked !== prevState.checked;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    checked: inputNode.checked,
                };
            });
        }

        render() {
            return (
                <Input
                    type="checkbox"
                    onChange={this.handleChange}
                    onEarlyInput={this.handleEarlyInput}
                    checked={this.state.checked}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/type="checkbox"/, 'type="checkbox" checked=""');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.checked).toEqual(true);
    expect(instance.state.checked).toEqual(true);
    expect(onEarlyInputTriggered).toEqual(true);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(true);
});

it('should handle checkbox initial true with onEarlyInput', () => {
    let onEarlyInputTriggered = false;
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                checked: true,
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.checked !== prevState.checked;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    checked: inputNode.checked,
                };
            });
        }

        render() {
            return (
                <Input
                    type="checkbox"
                    onChange={this.handleChange}
                    onEarlyInput={this.handleEarlyInput}
                    checked={this.state.checked}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/ checked=""/g, '');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.checked).toEqual(false);
    expect(instance.state.checked).toEqual(false);
    expect(onEarlyInputTriggered).toEqual(true);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(true);
});

it('should handle checkbox initial true without onEarlyInput', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                checked: true,
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.checked !== prevState.checked;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        render() {
            return (
                <Input
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={this.state.checked}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/ checked=""/g, '');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.checked).toEqual(false);
    expect(instance.state.checked).toEqual(false);
    expect(onChangeTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle radio no change without onEarlyInput', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                option: 'option1',
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.option !== prevState.option;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    option: event.target.value,
                };
            });
        }

        render() {
            return (
                <div>
                    <Input
                        type="radio"
                        name="radio"
                        className="option1"
                        onChange={this.handleChange}
                        checked={this.state.option === 'option1'}
                        value="option1"
                    />

                    <Input
                        type="radio"
                        name="radio"
                        className="option2"
                        onChange={this.handleChange}
                        checked={this.state.option === 'option2'}
                        value="option2"
                    />
                </div>
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />);

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const option1El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option1',
    );

    const option2El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option2',
    );

    expect(option1El.checked).toEqual(true);
    expect(option2El.checked).toEqual(false);
    expect(instance.state.option).toEqual('option1');
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(undefined);
});

it('should handle radio no change with onEarlyInput', () => {
    let onEarlyInputTriggered = false;
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                option: 'option1',
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.option !== prevState.option;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    option: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    option: inputNode.value,
                };
            });
        }

        render() {
            return (
                <div>
                    <Input
                        type="radio"
                        name="radio"
                        className="option1"
                        onChange={this.handleChange}
                        onEarlyInput={this.handleEarlyInput}
                        checked={this.state.option === 'option1'}
                        value="option1"
                    />

                    <Input
                        type="radio"
                        name="radio"
                        className="option2"
                        onChange={this.handleChange}
                        onEarlyInput={this.handleEarlyInput}
                        checked={this.state.option === 'option2'}
                        value="option2"
                    />
                </div>
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />);

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const option1El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option1',
    );

    const option2El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option2',
    );

    expect(option1El.checked).toEqual(true);
    expect(option2El.checked).toEqual(false);
    expect(instance.state.option).toEqual('option1');
    expect(onEarlyInputTriggered).toEqual(false);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(undefined);
});

it('should handle radio initial checked without onEarlyInput', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                option: 'option1',
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.option !== prevState.option;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    option: event.target.value,
                };
            });
        }

        render() {
            return (
                <div>
                    <Input
                        type="radio"
                        name="radio"
                        className="option1"
                        onChange={this.handleChange}
                        checked={this.state.option === 'option1'}
                        value="option1"
                    />

                    <Input
                        type="radio"
                        name="radio"
                        className="option2"
                        onChange={this.handleChange}
                        checked={this.state.option === 'option2'}
                        value="option2"
                    />
                </div>
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/checked="" value="option1"/g, 'value="option1"')
        .replace(/value="option2"/g, 'checked="" value="option2"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const option1El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option1',
    );

    const option2El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option2',
    );

    expect(option1El.checked).toEqual(false);
    expect(option2El.checked).toEqual(true);
    expect(instance.state.option).toEqual('option2');
    expect(onChangeTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle radio initial checked with onEarlyInput', () => {
    let onEarlyInputTriggered = false;
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                option: 'option1',
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.option !== prevState.option;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    option: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    option: inputNode.value,
                };
            });
        }

        render() {
            return (
                <div>
                    <Input
                        type="radio"
                        name="radio"
                        className="option1"
                        onChange={this.handleChange}
                        onEarlyInput={this.handleEarlyInput}
                        checked={this.state.option === 'option1'}
                        value="option1"
                    />

                    <Input
                        type="radio"
                        name="radio"
                        className="option2"
                        onChange={this.handleChange}
                        onEarlyInput={this.handleEarlyInput}
                        checked={this.state.option === 'option2'}
                        value="option2"
                    />
                </div>
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/checked="" value="option1"/g, 'value="option1"')
        .replace(/value="option2"/g, 'checked="" value="option2"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const option1El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option1',
    );

    const option2El = ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'option2',
    );

    expect(option1El.checked).toEqual(false);
    expect(option2El.checked).toEqual(true);
    expect(instance.state.option).toEqual('option2');
    expect(onEarlyInputTriggered).toEqual(true);
    expect(onChangeTriggered).toEqual(false);
    expect(valueSynced).toEqual(true);
});

it('should handle value to empty with onEarlyInput', () => {
    let onChangeTriggered = false;
    let onEarlyInputTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: 'initial value',
            };

            this.handleEarlyInput = this.handleEarlyInput.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            onEarlyInputTriggered = true;

            this.setState(() => {
                return {
                    value: inputNode.value,
                };
            });
        }

        render() {
            return (
                <Input
                    onChange={this.handleChange}
                    onEarlyInput={this.handleEarlyInput}
                    value={this.state.value}
                />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value="initial value"/g, 'value=""');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('');
    expect(instance.state.value).toEqual('');
    expect(onChangeTriggered).toEqual(false);
    expect(onEarlyInputTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle value to empty without onEarlyInput', () => {
    let onChangeTriggered = false;
    let valueSynced;

    class TestComponent extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                value: 'initial value',
            };

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        handleChange(event) {
            onChangeTriggered = true;
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        render() {
            return (
                <Input onChange={this.handleChange} value={this.state.value} />
            );
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value="initial value"/g, 'value=""');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );
    expect(el.value).toEqual('');
    expect(instance.state.value).toEqual('');
    expect(onChangeTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('handles uncontrolled', () => {
    let valueSynced = false;
    class TestComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        render() {
            return <Input defaultValue="some default" />;
        }
    }

    const element = document.createElement('div');

    const lastMarkup = ReactDOMServer.renderToString(<TestComponent />)
        // simulate user value change that react is unaware of
        .replace(/value="some default"/g, 'value="new value"');

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);

    const el = ReactTestUtils.findRenderedDOMComponentWithTag(
        instance,
        'input',
    );

    expect(el.value).toEqual('new value');
    expect(valueSynced).toEqual(false);
});

it('handles no props', () => {
    const renderer = ReactTestRenderer.create(<Input />);

    expect(renderer.toJSON()).toMatchSnapshot();
});

it('handles random props', () => {
    const renderer = ReactTestRenderer.create(
        <Input defaultValue="hello" className="btn" id="button" />,
    );

    expect(renderer.toJSON()).toMatchSnapshot();
});
