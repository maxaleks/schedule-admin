import React from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import cx from 'classnames';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { loginAction } from './reducer';

require('./index.scss');

const Login = React.createClass({
    render() {
        const { fields: { login, password }, handleSubmit, loginAction, errorText } = this.props;
        return (
            <Grid>
                <Row>
                    <Col md={3} xs={12} sm={3} />
                    <Col md={6} xs={12} sm={6}>
                        <div className='login'>
                            <div className='login-form'>
                                <h1 className='text-center'>Вход в учетную запись</h1>
                                {errorText && <Alert bsStyle='danger'>{errorText}</Alert>}
                                <form onSubmit={handleSubmit(loginAction)}>
                                    <Input
                                      {...login}
                                      placeholder='Username'
                                      type='text'
                                      className={cx('', { 'has-error': login.touched && login.error })}
                                    />
                                    <Input
                                      {...password}
                                      placeholder='Password'
                                      type='password'
                                      className={cx('', { 'has-error': password.touched && password.error })}
                                    />
                                    <Button type='submit' className='btn-primary pull-right'>Войти</Button>
                                </form>
                            </div>
                        </div>
                    </Col>
                    <Col md={3} xs={12} sm={3} />
                </Row>
            </Grid>
        );
    },
});

const validate = values => {
    const errors = {};
    if (!values.login) {
        errors.login = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
};

export default reduxForm(
    {
        form: 'login',
        fields: ['login', 'password'],
        validate,
    },
    state => ({
        ...state.login,
    }),
    { loginAction }
)(Login);
