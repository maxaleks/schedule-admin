import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import cx from 'classnames';
import Select from 'react-select';
import moment from 'moment';
import TimeInput from 'time-input';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { closeCouplePopup, saveCouple, addCouple, removeCouple } from '../reducer';
import './index.scss';

const GroupPopup = React.createClass({
    render() {
        const {
            show,
            closeCouplePopup,
            saveCouple,
            addCouple,
            removeCouple,
            fields: {
                startTime, endTime, nameSubject,
                housing, lectureRoom, nameProfessor,
                typeSubject, idSchedule, week,
                weekday, serialNumber, id, subgroup,
            },
            handleSubmit,
        } = this.props;
        if (!startTime.value) {
            startTime.onChange('00:00')
        }
        if (!endTime.value) {
            endTime.onChange('00:00')
        }

        return (
            <div>
                <Modal show={show} onHide={closeCouplePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>{id.value ? 'Редактировать пару' : 'Добавить пару'}</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleSubmit(id.value ? saveCouple : addCouple)} className='couple-form'>
                        <Modal.Body>
                            <Grid fluid>
                                <div className='radio-btns-block'>
                                    <input type='radio' value='1' onChange={() => typeSubject.onChange(1)} checked={Number(typeSubject.value) === 1}/>
                                    Лекция <br />
                                    <input type='radio' value='2' onChange={() => typeSubject.onChange(2)} checked={Number(typeSubject.value) === 2}/>
                                    Практика <br />
                                    <input type='radio' value='3' onChange={() => typeSubject.onChange(3)} checked={Number(typeSubject.value) === 3}/>
                                    Лабораторная
                                </div>
                                <div className='radio-btns-block'>
                                    <input type='radio' value='1' onChange={() => subgroup.onChange(0)} checked={Number(subgroup.value) === 0}/>
                                    Вся группа <br />
                                    <input type='radio' value='2' onChange={() => subgroup.onChange(1)} checked={Number(subgroup.value) === 1}/>
                                    1 подгруппа <br />
                                    <input type='radio' value='3' onChange={() => subgroup.onChange(2)} checked={Number(subgroup.value) === 2}/>
                                    2 подгруппа
                                </div>
                                <div className='time-block'>
                                    <label>Время</label><br />
                                    с
                                    <TimeInput
                                      className='time-input'
                                      value={startTime.value}
                                      onChange={val => startTime.onChange(val)}
                                    />
                                    до
                                    <TimeInput
                                      className='time-input'
                                      value={endTime.value}
                                      onChange={val => endTime.onChange(val)}
                                    />
                                </div>
                                <div className='house-block'>
                                    <label>Корпус</label>
                                    <Input
                                      {...housing}
                                      type='text'
                                      className={cx('', { 'has-error': housing.touched && housing.error })}
                                    />
                                </div>
                                <div className='room-block'>
                                    <label>Аудитория</label>
                                    <Input
                                      {...lectureRoom}
                                      type='text'
                                      className={cx('', { 'has-error': lectureRoom.touched && lectureRoom.error })}
                                    />
                                </div>
                                <div className='subject-block'>
                                    <label>Название предмета</label>
                                    <Input
                                      {...nameSubject}
                                      type='text'
                                      className={cx('', { 'has-error': nameSubject.touched && nameSubject.error })}
                                    />
                                </div>
                                <div className='teacher-block'>
                                    <label>Преподаватель</label>
                                    <Input
                                      {...nameProfessor}
                                      type='text'
                                      className={cx('', { 'has-error': nameProfessor.touched && nameProfessor.error })}
                                    />
                                </div>
                            </Grid>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit' className='btn-primary pull-right'>Сохранить</Button>
                            <Button onClick={closeCouplePopup} className='btn-default pull-right'>Отмена</Button>
                            {id.value && <Button onClick={removeCouple} className='btn-danger pull-right'>Удалить пару</Button>}
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    },
});

const validate = values => {
    const errors = {};
    if (!values.startTime) {
        errors.startTime = 'Required';
    }
    if (!values.endTime) {
        errors.endTime = 'Required';
    }
    if (!values.nameSubject) {
        errors.nameSubject = 'Required';
    }
    if (!values.housing) {
        errors.housing = 'Required';
    }
    if (!values.lectureRoom) {
        errors.lectureRoom = 'Required';
    }
    if (!values.nameProfessor) {
        errors.nameProfessor = 'Required';
    }
    if (!values.typeSubject) {
        errors.typeSubject = 'Required';
    }
    return errors;
};

export default reduxForm(
    {
        form: 'couple',
        fields: [
            'startTime', 'endTime', 'nameSubject',
            'housing', 'lectureRoom', 'nameProfessor',
            'typeSubject', 'idSchedule', 'week',
            'weekday', 'serialNumber', 'id', 'subgroup',
        ],
        validate,
    },
    state => ({
        show: state.schedule.showCouplePopup,
        initialValues: state.schedule.couple,
    }),
    { closeCouplePopup, saveCouple, addCouple, removeCouple }
)(GroupPopup);
