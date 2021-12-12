import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Posts from './components/posts/Posts';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/post/Post';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Routes>
                        <Route exact path="/" element={<Landing/>}/>
                    </Routes>
                    <section className="container">
                        <Alert/>
                        <Routes>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/profiles" element={<Profiles/>}/>
                            <Route exact path="/profile/:id" element={<Profile/>}/>
                            <Route exact path="/create-profile" element={<PrivateRoute component={ <CreateProfile/> }/>}/>
                            <Route exact path="/edit-profile" element={<PrivateRoute component={ <EditProfile/> }/>}/>
                            <Route exact path="/add-experience" element={<PrivateRoute component={ <AddExperience/> }/>}/>
                            <Route exact path="/add-education" element={<PrivateRoute component={ <AddEducation/>}/>}/>
                            <Route exact path="/dashboard" element={<PrivateRoute component={ <Dashboard/> }/>}/>
                            <Route exact path="/posts" element={<PrivateRoute component={ <Posts/> }/>}/>
                            <Route exact path="/post/:id" element={<PrivateRoute component={ <Post/> }/>}/>
                        </Routes>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
}
export default App;
