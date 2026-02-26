import { useNavigate } from "react-router"
import useForm from "./useForm"
import useRequest from "./useRequest"
import { login } from "../services/authService"
import { useContext, useEffect } from "react"
import { AuthContext } from "../Context/AuthContext"

function useLogin() {
    const navigate = useNavigate()
    const { saveSession, isLogged, session } = useContext(AuthContext)

    console.log({ isLogged, session })

    const initialLoginForm = {
        email: '',
        password: ''
    }
    const { response, error, loading, sendRequest } = useRequest()
    function logearse(form_state) {
        sendRequest(
            () => {
                return login(form_state.email, form_state.password)
            }
        )
    }
    const {
        onChangeFieldValue,
        onSubmitForm,
        form_state
    } = useForm({
        initial_form_fields: initialLoginForm,
        onSubmit: logearse
    })
    useEffect(
        () => {
            if (response && response.ok) {
                localStorage.setItem("username", response.data.username)
                saveSession(response.data.auth_token)
                navigate('/home')
            }
        },
        [response]
    )
    return {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    }
}
export default useLogin