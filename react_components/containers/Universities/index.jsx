import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Title } from '../../components/Layouts';
import ManagePopup from './ManagePopup';

import { loadUniversities, openManagePopup } from './reducer';
import need from '../../utils/need';

require('./index.scss');

const Universities = React.createClass({
    render() {
        const { openManagePopup, role } = this.props;
        const universities = this.props.universities.map((item, index) =>
            <Link key={index} to={`/universities/${item.id}/faculties`} disabled={item.lockStatus}>
                <div className='university'>{item.name}</div>
            </Link>
        );
        const admin = role === 'superadmin';
        return (
            <div className='universities'>
                <Title
                  text='Университеты'
                  managing={admin}
                  managingText='Управление университетами'
                  managingAction={openManagePopup}
                />
                <div>
                    {universities}
                </div>
                <ManagePopup />
            </div>
        );
    },
});

export default need(loadUniversities)(connect(
    state => ({
        ...state.universities,
        role: state.auth.role,
    }),
    { loadUniversities, openManagePopup }
)(Universities));
