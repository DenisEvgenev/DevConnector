import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Posts from '../posts/Posts';

const PrivatePosts = ({ auth: { isAuthenticated, loading }, component }) => {
    return !isAuthenticated && !loading ? <Navigate to="/login"/> : component;
}

PrivatePosts.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivatePosts)
