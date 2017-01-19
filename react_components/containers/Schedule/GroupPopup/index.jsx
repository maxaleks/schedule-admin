import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import cx from 'classnames';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { closeGroupPopup, addGroup } from '../reducer';
import './index.scss';

const GroupPopup = React.createClass({
    render() {
        const {
            show,
            closeGroupPopup,
            addGroup,
            fields: { groupName, amountWeeks },
            handleSubmit,
        } = this.props;

        return (
            <div >
                <Modal show={show} onHide={closeGroupPopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить группу</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(addGroup)}>
                        <Modal.Body>
                            <Grid fluid>
                                <Input
                                  {...groupName}
                                  placeholder='Номер группы'
                                  type='text'
                                  className={cx('', { 'has-error': groupName.touched && groupName.error })}
                                />
                                <Input
                                  {...amountWeeks}
                                  placeholder='Кол-во учебных недель'
                                  type='number'
                                  className={cx('', { 'has-error': amountWeeks.touched && amountWeeks.error })}
                                />
                            </Grid>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' className='btn-primary pull-right'>Добавить</Button>
                            <Button onClick={closeGroupPopup} className='btn-default pull-right'>Отмена</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    },
});

const validate = values => {
    const errors = {};
    if (!values.groupName) {
        errors.groupName = 'Required';
    }
    if (!values.amountWeeks) {
        errors.amountWeeks = 'Required';
    }
    return errors;
};

export default reduxForm(
    {
        form: 'addGroup',
        fields: ['groupName', 'amountWeeks'],
        validate,
    },
    state => ({
        show: state.schedule.showGroupPopup,
    }),
    { closeGroupPopup, addGroup }
)(GroupPopup);
