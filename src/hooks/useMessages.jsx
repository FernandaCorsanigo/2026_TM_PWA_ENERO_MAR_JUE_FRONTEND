import { useEffect, useState } from "react"
import { createMessage, getMessagesList } from "../services/messageService"
import useRequest from "./useRequest"

function useMessages(workspace_id, channel_id) {
    const {
        response: messagesResponse,
        loading: messagesLoading,
        error: messagesError,
        sendRequest: fetchMessages
    } = useRequest();

    const {
        loading: sendingLoading,
        sendRequest: sendNewMessage
    } = useRequest();

    const [localMessages, setLocalMessages] = useState([]);

    function loadMessages() {
        fetchMessages(() => getMessagesList(workspace_id, channel_id))
            .then(res => {
                setLocalMessages(prev => {
                    const ids = new Set(prev.map(m => m._id));
                    const newMessages = res.messages.filter(m => !ids.has(m._id));
                    return [...prev, ...newMessages];
                });
            });
    }

    function sendMessage(message_data) {
        return sendNewMessage(() => createMessage(workspace_id, channel_id, message_data));
    }

    useEffect(() => {
        if (workspace_id && channel_id) {
            setLocalMessages([]);
            loadMessages();
        }
    }, [workspace_id, channel_id]);

    return {
        localMessages,
        messages: messagesResponse,
        loading: messagesLoading,
        error: messagesError,
        sending: sendingLoading,
        loadMessages,
        sendMessage,
        setLocalMessages
    };
}

export default useMessages;