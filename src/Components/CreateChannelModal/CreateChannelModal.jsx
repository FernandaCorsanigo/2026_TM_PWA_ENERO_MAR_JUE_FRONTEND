import useCreateChannel from "../../hooks/useCreateChannel"
import React from "react"
import useForm from "../../hooks/useForm"
import ICONS from "../Constants/icons"
import './CreateChannelModal.css'
import { useNavigate } from "react-router"
import { useContext } from "react"
import { ChannelContext } from "../../Context/ChannelContext"

const CreateChannelModal = ({ onClose, workspace_id, onChannelCreated }) => {
    const { createChannelAction, loading, error } = useCreateChannel()
    const { addChannel } = useContext(ChannelContext)
    const navigate = useNavigate()

    const initialValues = { name: '', description: '' }

    const validate = (formValues) => {
        const errors = {}
        const { name, description } = formValues
        if (!name) errors.name = 'El nombre es obligatorio'
        else if (name.length < 5) errors.name = 'El nombre debe tener al menos 5 caracteres'

        if (!description) errors.description = 'La descripción es obligatoria'
        else if (description.length > 1000) errors.description = 'La descripción no puede superar los 1000 caracteres'

        return errors
    }

    const { form_state, onChangeFieldValue, onSubmitForm, errors } = useForm({
        initial_form_fields: initialValues,
        validate,
        onSubmit: async (values) => {
            const newChannel = await createChannelAction(workspace_id, values)
            if (!newChannel) return

            addChannel(newChannel)
            if (onChannelCreated) onChannelCreated(newChannel)
            onClose()
            navigate(`/${workspace_id}/channels/${newChannel._id}/messages`)
        }
    })

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Create a channel</h2>
                    <button className="close-btn" onClick={onClose}>
                        <ICONS.Plus style={{ transform: 'rotate(45deg)' }} />
                    </button>
                </div>

                <form onSubmit={onSubmitForm} className="modal-form">
                    <div className="modal-body">
                        {error && <div className="modal-error-banner">{error}</div>}

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <div className="input-with-icon">
                                <span className="input-icon">#</span>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="e.g. plan-budget"
                                    value={form_state.name}
                                    onChange={onChangeFieldValue}
                                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                                />
                            </div>
                            {errors.name && <span className="error-text">{errors.name}</span>}
                            <div className="form-hint">
                                Channels are where conversations happen around a topic. Use a name that is easy to find and understand.
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description <span className="optional-text">(optional)</span></label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={form_state.description}
                                onChange={onChangeFieldValue}
                                className={`form-input ${errors.description ? 'input-error' : ''}`}
                            />
                            {errors.description && <span className="error-text">{errors.description}</span>}
                            <div className="form-hint">What's this channel about?</div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateChannelModal