import React from 'react';
import { Grid, Col, Row, Modal } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import cx from 'classnames';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { closeManagePopup, addGroup, editGroup, deleteGroup } from '../reducer';
import './index.scss';

const ManagePopup = React.createClass({
    getInitialState() {
        return {
            editId: null,
            name: null,
            weeks: null,
        };
    },
    save() {
        const self = this;
        const { name, editId, weeks } = self.state;
        if (name && weeks) {
          self.props.edit({ groupName: name, id: editId, amountWeeks: weeks }).then(() => {
              self.setState({ editId: null, name: null, weeks: null });
          });
        }
    },
    closePopup() {
        this.setState({ editId: null, name: null, weeks: null });
        this.props.closePopup();
    },
    render() {
        const {
            show,
            closePopup,
            groups,
            add,
            remove,
            fields: { groupName, amountWeeks },
            handleSubmit,
        } = this.props;

        return (
            <Modal show={show} onHide={this.closePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Управление группами</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(add)}>
                    <Modal.Body>
                        <Grid fluid className='manage-popup groups'>
                            <div className='add'>
                                <Input
                                  {...groupName}
                                  placeholder='Номер группы'
                                  type='text'
                                  className={cx('name', { 'has-error': groupName.touched && groupName.error })}
                                />
                                <Input
                                  {...amountWeeks}
                                  placeholder='Кол-во недель'
                                  min={1}
                                  type='number'
                                  className={cx('amount-of-weeks', { 'has-error': amountWeeks.touched && amountWeeks.error })}
                                />
                                <Button className='btn-primary add-btn' type='submit'>Добавить</Button>
                            </div>
                            {groups.map((item, i) => (
                                <div key={i} className={cx('item', { editing: item.id === this.state.editId })}>
                                    {item.id !== this.state.editId && <p className='name' title={item.groupName}>{item.groupName}</p>}
                                    {item.id === this.state.editId && <Input
                                      value={this.state.name}
                                      onChange={(e) => this.setState({ name: e.target.value })}
                                      placeholder='Номер группы'
                                      type='text'
                                      className='name'
                                    />}
                                    {item.id === this.state.editId && <Input
                                      value={this.state.weeks}
                                      onChange={(e) => this.setState({ weeks: e.target.value })}
                                      placeholder='Кол-во недель'
                                      min={1}
                                      type='number'
                                      className='weeks'
                                    />}
                                    {item.id !== this.state.editId &&
                                        <span
                                          className='fa fa-pencil'
                                          onClick={() => this.setState({ editId: item.id, name: item.groupName, weeks: item.weeks.length })}
                                        ></span>
                                    }
                                    {item.id !== this.state.editId &&
                                        <span className='fa fa-trash' onClick={() => remove(item.id)}></span>
                                    }
                                    {item.id === this.state.editId &&
                                        <span className='fa fa-check' onClick={this.save}></span>
                                    }
                                    {item.id === this.state.editId &&
                                        <span className='fa fa-ban' onClick={() => this.setState({ editId: null })}></span>
                                    }
                                    <div className='clear-block'></div>
                                </div>
                            ))}
                        </Grid>
                    </Modal.Body>
                </form>
                <Modal.Footer>
                    <Button onClick={closePopup} className='btn-default pull-right'>Закрыть</Button>
                </Modal.Footer>
            </Modal>
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
    } else if (values.amountWeeks < 1) {
        errors.amountWeeks = 'Must be a positive';
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
        show: state.schedule.showManagePopup,
        groups: state.schedule.schedules,
    }),
    { closePopup: closeManagePopup, add: addGroup, edit: editGroup, remove: deleteGroup }
)(ManagePopup);
