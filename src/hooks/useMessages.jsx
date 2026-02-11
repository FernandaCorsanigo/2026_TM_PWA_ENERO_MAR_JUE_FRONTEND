import { useEffect } from "react"
import { createMessage, getMessagesList } from "../services/messageService"
import useRequest from "./useRequest"
import { useNavigate } from "react-router"
useNavigate

function useMessages(workspace_id, channel_id) {
    const { response, loading, error, sendRequest } = useRequest()

    function loadMessages() {
        sendRequest(() => getMessagesList(workspace_id, channel_id))
    }

    function sendMessage(message_data) {
        sendRequest(() => createMessage(workspace_id, channel_id, message_data))
    }

    useEffect(() => {
        loadMessages()
    }, [workspace_id, channel_id])

    useEffect(() => {
        if (response && response.ok) {
            navigate(`/workspace/${workspace_id}/channel/${channel_id}/messages`)
        }
    }, [response, workspace_id, channel_id])

    return {
        messages: response,
        loading,
        error,
        loadMessages,
        sendMessage
    }
}

export default useMessages