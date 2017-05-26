import React from 'react';
import InputWrapper from './InputWrapper';

const Input = props => {
    return <InputWrapper __INTERNAL_TAG_TYPE__="input" {...props} />;
};

const Select = props => {
    return <InputWrapper __INTERNAL_TAG_TYPE__="select" {...props} />;
};

const Textarea = props => {
    return <InputWrapper __INTERNAL_TAG_TYPE__="textarea" {...props} />;
};

export { Input, Select, Textarea };
