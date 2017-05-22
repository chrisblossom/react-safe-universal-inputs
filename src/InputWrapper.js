import React, { Component } from 'react';

class InputWrapper extends Component {
    constructor() {
        super();
    }

    /**
     * https://github.com/facebook/react/issues/4999#issuecomment-144557619
     */
    componentDidMount() {
        const { onChange, value } = this.props;

        if (
            this.initValue !== undefined &&
            this.initValue !== value &&
            typeof onChange === 'function'
        ) {
            /**
             * TODO: Initiate a real onChange event.
             *
             * http://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
             * https://github.com/vitalyq/react-trigger-change
             */
            onChange({
                preventDefault() {
                    return null;
                },

                target: {
                    value: this.initValue,
                },
            });
        }
    }

    render() {
        const { children, __INTERNAL_TAG_TYPE__: HTMLInputTag, ...props } = this.props;

        const onChange = this.props.onChange;
        const value = this.props.value;

        return (
            <HTMLInputTag
                ref={input => {
                    if (
                        input &&
                        typeof onChange === 'function' &&
                        value !== undefined &&
                        this.initValue === undefined
                    ) {
                        this.initValue = input.value || '';
                    }
                }}
                {...props}
            >
                {children}
            </HTMLInputTag>
        );
    }
}

export default InputWrapper;
