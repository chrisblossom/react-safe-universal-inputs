# react-safe-universal-inputs

This module fixes a race condition when using controlled inputs combined with server-side rendering. If an input is changed before React is loaded, the change will not be registered.

Related issues: [#2585](https://github.com/facebook/react/issues/2585) [#4293](https://github.com/facebook/react/issues/4293)

Demo: [https://react-safe-universal-inputs.herokuapp.com](https://react-safe-universal-inputs.herokuapp.com)

Usage:

``yarn add react-safe-universal-inputs``

```js
import React, { Component } from 'react';
import { Input, Select } from 'react-safe-universal-inputs';

export default class Example extends Component {
    constructor() {
        super();
        
        this.state = {
            input: 'initial value',
            select: 'yes',
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    
    handleInputChange(event) {
        event.preventDefault();
        
        this.setState(() => {
            return {
                input: event.target.value,
            }
        });
    }
    
    handleSelectChange(event) {
        event.preventDefault();
        
        this.setState(() => {
            return {
                select: event.target.value,
            }
        });
    }
    
    render() {
        return (
            <form>
                <Input onChange={this.handleInputChange} value={this.state.input}/>
                <Select onChange={this.handleSelectChange} value={this.state.select}>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                </Select>
            </form>
        );
    }
}
```


## Known Issues:
1. ref is not accessible.
2. onChange is called with a fake event handler with the majority of the event fields missing.
3. Inputs need unique onChange handlers. Related to issue #2 
