import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Title } from '../../components/Layouts';

require('./index.scss');

const Courses = React.createClass({
    render() {
        const { universityId, facultyId, specialityId } = this.props.params;
        const courses = [1, 2, 3, 4, 5, 6].map((item, index) =>
            <Link key={index} to={`/universities/${universityId}/faculties/${facultyId}/specialities/${specialityId}/courses/${item}/schedules`}>
                <div className='course'>{item} курс</div>
            </Link>
        );
        return (
            <div className='courses'>
                <Title
                  text='Курсы'
                  linkUrl={`/universities/${universityId}/faculties/${facultyId}/specialities`}
                />
                <div>
                    {courses}
                </div>
            </div>
        );
    },
});

export default Courses;
