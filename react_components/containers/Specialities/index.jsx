import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Title } from '../../components/Layouts';
import ManagePopup from './ManagePopup';

import { loadSpecialities, openManagePopup } from './reducer';
import need from '../../utils/need';

require('./index.scss');

const Specialities = React.createClass({
    render() {
        const { params: { universityId, facultyId }, openManagePopup, role } = this.props;
        const specialities = this.props.specialities.map((item, index) =>
            <Link key={index} to={`/universities/${universityId}/faculties/${facultyId}/specialities/${item.id}/courses`}>
                <div className='speciality'>{item.name}</div>
            </Link>
        );
        const admin = role === 'superadmin' || role === 'admin';
        return (
            <div className='specialities'>
                <Title
                  text='Специальности'
                  linkUrl={`/universities/${universityId}/faculties`}
                  managing={admin}
                  managingText='Управление специальностями'
                  managingAction={openManagePopup}
                />
                <div>
                    {specialities}
                </div>
                <ManagePopup />
            </div>
        );
    },
});

export default need(loadSpecialities)(connect(
    state => ({
        ...state.specialities,
        role: state.auth.role,
    }),
    { loadSpecialities, openManagePopup }
)(Specialities));
