import { useState, useEffect } from "react"
import { getChannelsList } from "../services/channelService"

function useChannel(workspace_id) {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchChannels = async () => {
        if (!workspace_id) return
        try {
            setLoading(true)
            const data = await getChannelsList(workspace_id)
            setChannels(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchChannels()
    }, [workspace_id])

    return {
        channels,
        loading,
        error,
        reloadChannels: fetchChannels
    }
}

export default useChannel