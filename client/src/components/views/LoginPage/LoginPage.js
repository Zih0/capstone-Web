import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_actions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from 'react-redux';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

  return (
    <Formik
      initialValues={{
<<<<<<< HEAD
        email: '',
=======
        email: initialEmail,
>>>>>>> master
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email 형태로 입력해주세요').required('Email을 입력해주세요'),
<<<<<<< HEAD
        password: Yup.string()
          .min(6, '비밀번호는 최소 6자 이상 입력해주세요')
          .required('비밀번호를 입력해주세요'),
=======
        password: Yup.string().min(6, '비밀번호는 최소 6자 이상 입력해주세요').required('비밀번호를 입력해주세요'),
>>>>>>> master
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push('/');
              } else {
<<<<<<< HEAD
                setFormErrorMessage('이메일 또는 비밀번호를 확인해주세요.');
              }
            })
            .catch((err) => {
              setFormErrorMessage('이메일 또는 비밀번호를 확인해주세요.');
=======
                setFormErrorMessage('Check out your Account or Password again');
              }
            })
            .catch((err) => {
              setFormErrorMessage('Check out your Account or Password again');
>>>>>>> master
              setTimeout(() => {
                setFormErrorMessage('');
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
<<<<<<< HEAD
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <Title level={2}>로그인</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="비밀번호"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
=======
        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
        return (
          <div className="app">
            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
              <Form.Item required>
                <Input id="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter your email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? 'text-input error' : 'text-input'} />
                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
              </Form.Item>

              <Form.Item required>
                <Input id="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter your password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? 'text-input error' : 'text-input'} />
                {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
>>>>>>> master
              </Form.Item>

              {formErrorMessage && (
                <label>
<<<<<<< HEAD
                  <p
                    style={{
                      color: '#ff0000bf',
                      fontSize: '0.7rem',
                      border: '1px solid',
                      padding: '1rem',
                      borderRadius: '10px',
                    }}
                  >
                    {formErrorMessage}
                  </p>
=======
                  <p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p>
>>>>>>> master
                </label>
              )}

              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>
<<<<<<< HEAD
                  자동 로그인
                </Checkbox>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: '100%' }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    로그인
                  </Button>
                </div>
                <a href="/register">회원이 아니신가요?</a>
=======
                  Remember me
                </Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  forgot password
                </a>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                  </Button>
                </div>
                Or <a href="/register">register now!</a>
>>>>>>> master
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
