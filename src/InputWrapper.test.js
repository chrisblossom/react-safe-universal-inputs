import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';

import ReactTestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';

import { Input } from './index';

it('should show react input load bug', () => {
    // This test is testing client-side behavior.

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
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    expect(el.value).toEqual('new value');

    expect(instance.state.value).toEqual('');
    // expect(instance.input.value).toEqual(instance.state.value);
    expect(instance.state.value).toEqual('');
    expect(changedTriggered).toEqual(false);
    expect(valueSynced).toEqual(false);
});

it('should trigger onChange when input changed before react client render', () => {
    // This test is testing client-side behavior.

    let changedTriggered = false;
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
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            changedTriggered = true;

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
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    expect(el.value).toEqual('new value');
    expect(instance.state.value).toEqual('new value');
    expect(changedTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should return dom node to onEarlyInput function', () => {
    // This test is testing client-side behavior.

    let changedTriggered = false;
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
            event.preventDefault();

            this.setState(() => {
                return {
                    [event.target.name]: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            changedTriggered = true;

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
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    expect(el.value).toEqual('new value');
    expect(instance.state.example).toEqual('new value');
    expect(changedTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle checkbox initial false', () => {
    // This test is testing client-side behavior.

    let changedTriggered = false;
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
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        handleEarlyInput(inputNode) {
            changedTriggered = true;

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
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    expect(el.checked).toEqual(true);
    expect(instance.state.checked).toEqual(true);
    expect(changedTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle checkbox initial true', () => {
    // This test is testing client-side behavior.

    let changedTriggered = false;
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
            event.preventDefault();

            this.setState(() => {
                return {
                    checked: event.target.checked,
                };
            });
        }

        handleEarlyInput(inputNode) {
            changedTriggered = true;

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
    console.log(lastMarkup);

    element.innerHTML = lastMarkup;

    const instance = ReactDOM.render(<TestComponent />, element);
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    expect(el.checked).toEqual(false);
    expect(instance.state.checked).toEqual(false);
    expect(changedTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('should handle value to empty', () => {
    // This test is testing client-side behavior.

    let changedTriggered = false;
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
            event.preventDefault();

            this.setState(() => {
                return {
                    value: event.target.value,
                };
            });
        }

        handleEarlyInput(inputNode) {
            changedTriggered = true;

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
    const el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');
    expect(el.value).toEqual('');
    expect(instance.state.value).toEqual('');
    expect(changedTriggered).toEqual(true);
    expect(valueSynced).toEqual(true);
});

it('handles uncontrolled', () => {
    let changedTriggered = false;
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

    const el = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'input');

    expect(el.value).toEqual('new value');
    expect(changedTriggered).toEqual(false);
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
