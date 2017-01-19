
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import './index.scss';

import { Row, Col, Grid } from 'react-bootstrap';

let Title = ({ text, linkUrl, linkText, underText, logout, managing, managingAction, managingText }) => (
    <div className='title-component'>
        {linkUrl &&
            <Link className='back-link' to={linkUrl}>
                <span data-tip='Назад' data-delay-show={400} className='fa fa-arrow-circle-left'></span>
                {linkText}
            </Link>
        }
        {managing &&
            <span
              data-tip={managingText}
              data-delay-show={400}
              className='fa fa-cogs managing'
              onClick={managingAction}
            ></span>
        }
        <h3 className='title'>{text}</h3>
        <a data-tip='Выйти' data-delay-show={400} className='logout' onClick={logout}>
            <span className='fa fa-sign-out'></span>
        </a>
        <ReactTooltip />
    </div>
);

const Layout = ({ main, title }) => (
     <div>
        <Grid>
            <Row>
                <Col xs={12}>
                    {title}
                </Col>
            </Row>
        </Grid>
        <Grid>
            <Row>
                <Col sm={12}>
                    {main}
                </Col>
            </Row>
        </Grid>
    </div>
);

import { logout } from '../../modules/auth';

Title = connect(state => ({}), { logout })(Title);

export {
    Layout,
    Title,
 };
