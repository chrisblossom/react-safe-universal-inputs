import React from 'react';
import InputWrapper from './InputWrapper';

const Input = props => {
    return <InputWrapper __INTERNAL_TAG_TYPE__="input" {...props} />;
};

const Select = props => {
    return <InputWrapper __INTERNAL_TAG_TYPE__="select" {...props} />;
};

export { Input, Select };
