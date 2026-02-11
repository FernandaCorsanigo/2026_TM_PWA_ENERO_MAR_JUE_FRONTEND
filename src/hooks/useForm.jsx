import { useState } from "react"

const useForm = (
    {
        initial_form_fields,
        onSubmit,
        validate
    }
) => {
    const [form_state, setFormState] = useState(initial_form_fields)
    const [errors, setErrors] = useState({})

    //Nos permite trackear el valor de un campo
    const onChangeFieldValue = (event) => {
        const { name, value } = event.target

        setFormState(
            (prevFormState) => {
                const newState = { ...prevFormState, [name]: value }
                if (validate) {
                    const validationErrors = validate(newState) //Validamos con el NUEVO estado
                    setErrors(validationErrors)
                }
                return newState
            }
        )
    }

    //Nos permite prevenir la recarga del evento submit y activar la funcion de envio
    const onSubmitForm = (event) => {
        event.preventDefault()
        if (validate) {
            const validationErrors = validate(form_state)
            setErrors(validationErrors)
            // Si hay errores (que no sean strings vacíos o null), no enviamos
            if (Object.keys(validationErrors).length > 0) {
                return // No enviamos si hay errores
            }
        }
        onSubmit(form_state)
    }

    return {
        form_state,
        errors,
        onChangeFieldValue,
        onSubmitForm
    }
}

export default useForm