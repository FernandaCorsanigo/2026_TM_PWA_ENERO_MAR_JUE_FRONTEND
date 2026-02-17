import { Link } from 'react-router'
import useLogin from '../../hooks/useLogin'
import Spinner from '../../Components/Spinner/Spinner'
import './LoginScreen.css'

const LoginScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        response,
        error
    } = useLogin()

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Sign in</h1>
                <p>Welcome back! Please enter your details.</p>
            </div>

            <div className="login-form-container">
                <form onSubmit={onSubmitForm} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            placeholder="name@work-email.com"
                            onChange={onChangeFieldValue}
                            value={form_state.email}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            placeholder="Your password"
                            onChange={onChangeFieldValue}
                            value={form_state.password}
                        />
                    </div>

                    {error && <div className="error-message">{error.message}</div>}
                    {response && response.ok && (
                        <div className="success-message">
                            Login successful!
                        </div>
                    )}

                    <button type='submit' className="login-btn" disabled={loading || (response && response.ok)}>
                        {loading ? 'Sign in...' : 'Sign In'}
                    </button>

                    {loading && <div style={{ marginTop: '20px' }}> <Spinner /> </div>}

                    <div className="login-footer">
                        <span>
                            New to Slack? <Link to='/register'>Create an account</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen