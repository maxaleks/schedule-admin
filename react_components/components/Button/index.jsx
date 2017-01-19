import React from 'react';
import { Button } from 'react-bootstrap';

import './index.scss';

const CustomButton = ({ onClick, type, children, className }) => (
    <Button onClick={onClick} type={type} className={'custom-button ' + className}>{children}</Button>
);

export default CustomButton;
