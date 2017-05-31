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
        const { onEarlyInput, value, checked } = this.props;

        if (
            this.inputNode !== undefined &&
            typeof onEarlyInput === 'function'
        ) {
            const type = this.inputNode.type;

            if (
                (type === 'checkbox' || type === 'radio') &&
                this.inputNode.checked !== checked
            ) {
                onEarlyInput(this.inputNode);

                return;
            }

            if (this.inputNode.value !== value) {
                onEarlyInput(this.inputNode);
            }
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

        return (
            <HTMLInputTag
                ref={input => {
                    if (
                        input &&
                        typeof onEarlyInput === 'function' &&
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
