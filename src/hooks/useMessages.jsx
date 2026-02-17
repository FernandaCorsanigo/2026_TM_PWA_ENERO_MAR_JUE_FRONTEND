import { useEffect } from "react"
import { createMessage, getMessagesList } from "../services/messageService"
import useRequest from "./useRequest"

function useMessages(workspace_id, channel_id) {
    // Separate state for fetching messages and sending messages
    const {
        response: messagesResponse,
        loading: messagesLoading,
        error: messagesError,
        sendRequest: fetchMessages
    } = useRequest()

    const {
        loading: sendingLoading,
        sendRequest: sendNewMessage
    } = useRequest()

    function loadMessages() {
        fetchMessages(() => getMessagesList(workspace_id, channel_id))
    }

    function sendMessage(message_data) {
        return sendNewMessage(() => createMessage(workspace_id, channel_id, message_data))
    }

    useEffect(() => {
        if (workspace_id && channel_id) {
            loadMessages()
        }
    }, [workspace_id, channel_id])

    return {
        messages: messagesResponse,
        loading: messagesLoading,
        error: messagesError,
        sending: sendingLoading,
        loadMessages,
        sendMessage
    }
}

export default useMessages