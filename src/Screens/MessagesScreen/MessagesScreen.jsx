import { useEffect, useRef, useState } from "react"
import useMessages from "../../hooks/useMessages"
import './MessagesList.css'

function MessageScreen({ workspace_id, channel_id, myUsername }) {
    const { messages, loading, sending, error, sendMessage, loadMessages } = useMessages(workspace_id, channel_id)
    const [newMessage, setNewMessage] = useState("")
    const [localMessages, setLocalMessages] = useState([])

    const bottom_reference = useRef(null)

    // Solo agregar mensajes nuevos que no están en localMessages
    useEffect(() => {
        if (messages?.messages?.length) {
            const newMessages = messages.messages.filter(
                m => !localMessages.some(local => local._id === m._id)
            )
            if (newMessages.length) {
                setLocalMessages(prev =>
                    [...prev, ...newMessages.map(msg => ({
                        ...msg,
                        fk_id_workspaceMember: {
                            fk_id_user: { username: msg.fk_id_workspaceMember?.fk_id_user?.username || myUsername }
                        }
                    }))]
                )
            }
        }
    }, [messages])

    // Scroll automático al último mensaje
    useEffect(() => {
        bottom_reference.current?.scrollIntoView({ behavior: "smooth" })
    }, [localMessages])

    // Función para enviar mensaje
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return

        // Usar myUsername que viene desde la sesión
        const currentUsername = myUsername || "Usuario"

        // Mensaje temporal optimista
        const tempMessage = {
            _id: Date.now(),
            content: newMessage,
            fk_id_workspaceMember: {
                fk_id_user: { username: currentUsername }
            }
        }

        setLocalMessages(prev => [...prev, tempMessage])
        setNewMessage("")

        // Enviar al backend
        const createdMessage = await sendMessage({ content: newMessage })

        // Reemplazar el mensaje temporal forzando el username real
        setLocalMessages(prev =>
            prev.map(msg =>
                msg._id === tempMessage._id
                    ? {
                        ...createdMessage,
                        content: tempMessage.content, // mantener el texto
                        fk_id_workspaceMember: { fk_id_user: { username: currentUsername } }
                    }
                    : msg
            )
        )
    }

    return (
        <div className="message-screen">
            <h2>Chat</h2>

            {loading && <p>Cargando mensajes...</p>}
            {error && <p className="error">Error: {error.message}</p>}

            <div className="message-list">
                {localMessages.map((msg, index) => (
                    <div key={msg._id || index} className="message-item">
                        <span className="message-sender">
                            {msg.fk_id_workspaceMember?.fk_id_user?.username || "Usuario"}:
                        </span>
                        <span className="message-content">{msg.content}</span>
                    </div>
                ))}
                <div ref={bottom_reference} />
            </div>

            <div className="message-input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    )
}

export default MessageScreen