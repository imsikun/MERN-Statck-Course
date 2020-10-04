import React, { useState } from 'react'

import Base from '../core/Base'

import { Link } from 'react-router-dom'

import { signup } from '../auth/helper'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  //Destructuring the field, so not to use values.name, values.email everytime
  const { name, email, password, error, success } = values

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    })
  }

  //function to call on click of the submit button
  const onSubmit = event => {
    event.preventDefault()
    setValues({
      ...values,
      error: false
    })
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false
          })
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true
          })
        }
      })
      .catch(err => console.log('Error in Signup'))
  }

  const signUpForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form action='#'>
            <div className='form-group'>
              <lable className='text-light'>Name</lable>
              <input
                className='form-control'
                onChange={handleChange('name')}
                type='text'
                value={name}
              />
            </div>
            <div className='form-group'>
              <lable className='text-light'>Email</lable>
              <input
                className='form-control'
                onChange={handleChange('email')}
                type='email'
                value={email}
              />
            </div>
            <div className='form-group'>
              <lable className='text-light'>Password</lable>
              <input
                className='form-control'
                onChange={handleChange('password')}
                type='password'
                value={password}
              />
            </div>
            <button onClick={onSubmit} className='btn btn-success btn-block'>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? '' : 'none' }}
          >
            New Account was created Successfully. Please{' '}
            <Link to='/signin'>Signin Here</Link>
          </div>
        </div>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Base title='Signup Page' description='A page for user to Sign up!'>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  )
}

export default Signup
