import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => {
        console.log('=== 0= ===', email, password);
        setFormData({ ...formData, [ e.target.name ]: e.target.value })
    }
    const onSubmit = async e => {
        e.preventDefault();
        console.log('=== 1= ===', email, password);
        login(email, password);
    }

    // Redirect if logged in
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
                <form className="form" onSubmit={ e => onSubmit(e) }>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" value={ email } onChange={ e => onChange(e) } name="email"/>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={ password } onChange={ e => onChange(e) }
                            minLength="6"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login"/>
                </form>
                <p className="my-1">
                    Don't have an acoount? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
