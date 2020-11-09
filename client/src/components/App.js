import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import RegisterFace from './views/RegisterFace/RegisterFace';
import RegisterCourse from './views/RegisterPage/RegisterCourse';
import WebcamPage from './views/RegisterFace/Section/WebcamPage';
import UploadPage from './views/RegisterFace/Section/UploadPage';
import RegisterStudentCard from './views/RegisterFace/RegisterStudentCard';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/studentcard" component={Auth(RegisterStudentCard, true)} />
          <Route exact path="/face" component={Auth(RegisterFace, true)} />
          <Route exact path="/face/webcam" component={Auth(WebcamPage, true)} />
          <Route exact path="/face/upload" component={Auth(UploadPage, true)} />
          <Route exact path="/course" component={Auth(RegisterCourse, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
