import { Link} from 'react-router'
import useLogin from '../../hooks/useLogin'
import useForm from '../../hooks/useForm'


    const LoginScreen = () => {//Solo tiene la responsabilidad de 'mostrar'
        const{
            form_state,
            onChangeFieldValue,
            onSubmitForm,
            loading,
            response,
            error
        } = useLogin()
        
    return (
        <div>
            <h1>Inicia sesion</h1>
            <form onSubmit={onSubmitForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id='email' name='email' onChange={onChangeFieldValue} value={form_state.email}/>
                </div>
                <div>
                    <label htmlFor="password">Contrasena:</label>
                    <input type="password" id='password' name='password' onChange={onChangeFieldValue} value={form_state.password}/>
                </div>
                {
                    error && <span style={{color:'red'}}>{error.message}</span>
                }
                {
                    response 
                    && 
                    response.ok 
                    &&
                    <span style={{color:'green'}}>
                        Te has logeado exitosamente
                    </span>
                }
                <br />
                <button type='submit' disabled={loading || (response && response.ok)}>Iniciar sesion</button>
                <span>
                    Aun no tienes cuenta? <Link to = '/register'> Registrarse </Link>
                </span>
            </form>
        </div>
    )
}

export default LoginScreen