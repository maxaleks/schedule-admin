import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// TODO:
// inteegrate something like this
// https://github.com/Rezonans/redux-async-connect
const need = (action1, action2) => (Component) => {
    const Wrapper = React.createClass({
        getInitialState() {
            return {
                loading: true,
            };
        },

        componentWillMount() {
            const {
                params,
                location: { query },
            } = this.props;

            const p1 = this.props.action1(params, query);
            if (action2) {
                const p2 = this.props.action2(params, query);
                axios.all([p1, p2]).then(() => this.setState({ loading: false }));
            } else {
                p1.then(() => this.setState({ loading: false }));
            }
        },

        render() {
            const imgStyles = {
                width: '100px',
                position: 'absolute',
                top: '40vh',
                left: 'calc(50% - 50px)',
            };
            return this.state.loading ? (
                <img
                  style={imgStyles}
                  className='img-responsive'
                  src='images/loading.gif'
                />
            ) : <Component {...this.props} />;
        },
    });

    return connect(null, {
        action1, action2,
    })(Wrapper);
};

export default need;
