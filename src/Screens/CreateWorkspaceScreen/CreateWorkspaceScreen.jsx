import React from 'react'
import { Link } from 'react-router' // Note: 'react-router' as per user constraint, usually 'react-router-dom' but user said 'react-router'
import useForm from '../../hooks/useForm'
import useCreateWorkspace from '../../hooks/useCreateWorkspace'
import './CreateWorkspaceScreen.css'

const CreateWorkspaceScreen = () => {
    const { createWorkspaceAction, loading, error } = useCreateWorkspace()

    const initialValues = {
        title: '',
        description: ''
    }

    const validate = (formValues) => {
        const errors = {}
        const { title, description } = formValues

        if (!title) {
            errors.title = 'El título es obligatorio'
        } else if (title.length < 5) {
            errors.title = 'El título debe tener al menos 5 caracteres'
        }

        if (!description) {
            errors.description = 'La descripción es obligatoria'
        } else if (description.length > 1000) {
            errors.description = 'La descripción no puede superar los 1000 caracteres'
        }

        return errors
    }

    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        errors
    } = useForm({
        initial_form_fields: initialValues,
        onSubmit: createWorkspaceAction,
        validate: validate
    })

    return (
        <div className="create-workspace-container">
            <div className="create-workspace-form">
                <h1 className="create-workspace-title">Crear espacio de trabajo</h1>

                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Nombre del espacio de trabajo</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input"
                            placeholder="Ej. Proyecto Alpha"
                            value={form_state.title}
                            onChange={onChangeFieldValue}
                        />
                        {errors.title && <span className="error-message">⚠️ {errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-textarea"
                            placeholder="¿De qué trata este espacio de trabajo?"
                            value={form_state.description}
                            onChange={onChangeFieldValue}
                        ></textarea>
                        <div className="character-counter">
                            {form_state.description.length} / 1000
                        </div>
                        {errors.description && <span className="error-message">⚠️ {errors.description}</span>}
                    </div>

                    {error && <div className="error-message" style={{ marginBottom: '1rem' }}>❌ {error.message}</div>}

                    <div className="form-actions">
                        <Link to="/home" className="btn-back">Volver</Link>
                        <button
                            type="submit"
                            className="btn-create"
                            disabled={loading}
                        >
                            {loading ? 'Creando...' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWorkspaceScreen