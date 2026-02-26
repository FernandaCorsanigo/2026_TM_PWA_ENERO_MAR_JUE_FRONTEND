import React from 'react'
import { Link } from 'react-router'
import useRegister from '../../hooks/useRegister'
import Spinner from '../../Components/Spinner/Spinner'
import './RegisterScreen.css'

const RegisterScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useRegister()

    return (
        <div className="register-container">
            <div className="register-logo">
                <img src="/Images/Slack-logo.png" alt="Logo" />
            </div>
            <div className="register-header">
                <h1>First, enter your email</h1>
                <p>We suggest using the email address you use at work.</p>
            </div>

            <div className="register-form-container">
                <form onSubmit={onSubmitForm} className="register-form">
                    <div className="register-input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name='username'
                            placeholder="Your username"
                            value={form_state.username}
                            onChange={onChangeFieldValue}
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder="name@work-email.com"
                            value={form_state.email}
                            onChange={onChangeFieldValue}
                        />
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder="Your password"
                            value={form_state.password}
                            onChange={onChangeFieldValue}
                        />
                    </div>

                    {error && <div className="register-error-message">{error.message}</div>}

                    {response && response.ok && (
                        <div className="register-success-message">
                            Registration successful! Check your email for instructions.
                        </div>
                    )}

                    <button type='submit' className="register-btn" disabled={loading}>
                        {loading ? 'Registering...' : 'Sign Up'}
                    </button>

                    {loading && <div style={{ marginTop: '20px' }}> <Spinner /> </div>}

                    <div className="register-footer">
                        <span>
                            Already using Slack? <Link to='/login'>Sign in</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen