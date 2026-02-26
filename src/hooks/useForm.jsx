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

    const onChangeFieldValue = (event) => {
        const { name, value } = event.target

        setFormState(
            (prevFormState) => {
                const newState = { ...prevFormState, [name]: value }
                if (validate) {
                    const validationErrors = validate(newState)
                    setErrors(validationErrors)
                }
                return newState
            }
        )
    }

    const onSubmitForm = (event) => {
        event.preventDefault()
        if (validate) {
            const validationErrors = validate(form_state)
            setErrors(validationErrors)
            if (Object.keys(validationErrors).length > 0) {
                return
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