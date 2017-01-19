import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Title } from '../../components/Layouts';
import ManagePopup from './ManagePopup';

import { loadFaculties, openManagePopup } from './reducer';
import need from '../../utils/need';

require('./index.scss');

const Faculties = React.createClass({
    render() {
        const { params: { universityId }, openManagePopup, role } = this.props;
        const faculties = this.props.faculties.map((item, index) =>
            <Link key={index} to={`/universities/${universityId}/faculties/${item.id}/specialities`}>
                <div className='faculty'>{item.name}</div>
            </Link>
        );
        const admin = role === 'superadmin' || role === 'admin';
        return (
            <div className='faculties'>
                <Title
                  text='Факультеты'
                  linkUrl={`/universities`}
                  managing={admin}
                  managingText='Управление факультетами'
                  managingAction={openManagePopup}
                />
                <div>
                    {faculties}
                </div>
                <ManagePopup />
            </div>
        );
    },
});

export default need(loadFaculties)(connect(
    state => ({
        ...state.faculties,
        role: state.auth.role,
    }),
    { loadFaculties, openManagePopup }
)(Faculties));
