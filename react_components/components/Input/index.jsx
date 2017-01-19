import React from 'react';
import { Input } from 'react-bootstrap';

import './index.scss';

const CustomInput = ({ value, type, placeholder, ...props, className }) => (
    <Input {...props} type={type} value={value} placeholder={placeholder} className={'input ' + className}/>
);

export default CustomInput;
