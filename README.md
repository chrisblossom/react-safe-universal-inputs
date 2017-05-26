# react-safe-universal-inputs

This module fixes a race condition when using controlled inputs combined with server-side rendering. If an input is changed before React is loaded, the change will not be registered.

Related issues: [#2585](https://github.com/facebook/react/issues/2585) [#4293](https://github.com/facebook/react/issues/4293)

Demo: [https://react-safe-universal-inputs.herokuapp.com](https://react-safe-universal-inputs.herokuapp.com)

Usage:

``yarn add react-safe-universal-inputs`` or ``npm install --save react-safe-universal-inputs``

Pass a function to ``onEarlyInput`` that handles a changed node. Called once with ``componentDidMount`` and is only called if the value has changed before the initial react render.

```jsx
import React, { Component } from 'react';
import { Input, Select, Textarea } from 'react-safe-universal-inputs';

export default class Example extends Component {
    constructor() {
        super();
        
        this.state = {
            text: 'initial text',
            checkbox: false,
            select: 'yes',
            textarea: 'initial textarea',
        };
        
        this.handleEarlyInput = this.handleEarlyInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleEarlyInput(inputNode) {
        const value = inputNode.type === 'checkbox' 
            ? inputNode.checked 
            : inputNode.value;
        
        this.setState(() => {
            return {
                [inputNode.name]: value,
            }
        });
    }
    
    handleChange(event) {
        event.preventDefault();
        
        const value = event.target.type === 'checkbox' 
            ? event.target.checked 
            : event.target.value;
    
        this.setState(() => {
            return {
                [event.target.name]: value,
            };
        });
    }
    
    render() {
        return (
            <form>
                <Input 
                    type="text"
                    name="text" 
                    onEarlyInput={this.handleEarlyInput} 
                    onChange={this.handleChange} 
                    value={this.state.text}
                />
                
                <Input 
                    type="checkbox"
                    name="checkbox" 
                    onEarlyInput={this.handleEarlyInput} 
                    onChange={this.handleChange} 
                    value={this.state.checkbox}
                />
                
                <Select 
                    name="select" 
                    onEarlyInput={this.handleEarlyInput} 
                    onChange={this.handleChange} 
                    value={this.state.select}
                >
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                </Select>
                
                <Textarea 
                    name="textarea" 
                    onEarlyInput={this.handleEarlyInput} 
                    onChange={this.handleChange} 
                    value={this.state.textarea}
                />
            </form>
        );
    }
}
```


## Known Issues:
1. ref is not accessible.
