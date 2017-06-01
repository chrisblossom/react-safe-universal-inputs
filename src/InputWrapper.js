import React, { Component } from 'react';

class InputWrapper extends Component {
    constructor() {
        super();
    }

    /**
     * Event handlers are initiated right before componentDidMount
     *
     * https://github.com/facebook/react/issues/4999#issuecomment-144557619
     */
    componentDidMount() {
        const { onChange, onEarlyInput, value, checked } = this.props;

        if (
            this.inputNode !== undefined &&
            (typeof onEarlyInput === 'function' ||
                typeof onChange === 'function')
        ) {
            const type = this.inputNode.type;

            /**
             * Checks if values are out of sync
             */
            if (type === 'checkbox' || type === 'radio') {
                if (this.inputNode.checked === checked) {
                    return;
                }
            } else if (this.inputNode.value === value) {
                return;
            }

            /**
             * Only call onEarlyInput if specified
             *
             * Used to handle custom events not wanted with typical onChange, such as 'touched'.
             */
            if (onEarlyInput) {
                onEarlyInput(this.inputNode);

                return;
            }

            /**
             * Simulate onChange event. Send PR for missing needed props
             */
            const event = {
                preventDefault() {
                    return null;
                },

                target: this.inputNode,
            };

            onChange(event);
        }
    }

    render() {
        const {
            children,
            __INTERNAL_TAG_TYPE__: HTMLInputTag,
            onEarlyInput,
            ...props
        } = this.props;

        const value = this.props.value;
        const checked = this.props.checked;
        const onChange = this.props.onChange;

        return (
            <HTMLInputTag
                ref={input => {
                    if (
                        input &&
                        (typeof onEarlyInput === 'function' ||
                            typeof onChange === 'function') &&
                        (value !== undefined || checked !== undefined) &&
                        this.inputNode === undefined
                    ) {
                        this.inputNode = input;
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
