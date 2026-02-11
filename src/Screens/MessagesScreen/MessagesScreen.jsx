import { useState } from "react"
import useMessages from "../../hooks/useMessages"

function MessageScreen({ workspace_id, channel_id }) {

    const { messages, loading, error, sendMessage, loadMessages } = useMessages(workspace_id, channel_id)
    const [newMessage, setNewMessage] = useState("")

    // Función para enviar mensaje
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return
        await sendMessage({ content: newMessage }) // backend espera { content: '...' }
        setNewMessage("")
        loadMessages() // recargar mensajes después de enviar
    }

    return (
        <div className="message-screen">
            <h2>Chat</h2>

            {loading && <p>Cargando mensajes...</p>}
            {error && <p className="error">Error: {error.message}</p>}

            <div className="message-list">
                {messages?.data?.map(msg => (
                    <div key={msg._id} className="message-item">
                        <span className="message-sender">{msg.sender?.username || "Usuario"}:</span>
                        <span className="message-content">{msg.content}</span>
                    </div>
                ))}
            </div>

            <div className="message-input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    )
}

export default MessageScreen