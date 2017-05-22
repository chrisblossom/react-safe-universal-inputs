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
            // This is where handleChange should be called (or right before)
            // https://github.com/facebook/react/issues/4999#issuecomment-144557619
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

            this.handleChange = this.handleChange.bind(this);
        }

        componentDidUpdate(prevProps, prevState) {
            valueSynced = this.state.value !== prevState.value;
        }

        componentDidMount() {
            // This is where handleChange should be called (or right before)
            // https://github.com/facebook/react/issues/4999#issuecomment-144557619
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
            return <Input onChange={this.handleChange} value={this.state.value} />;
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
