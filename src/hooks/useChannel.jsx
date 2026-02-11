import { useState, useEffect } from "react"
import { getChannelsList } from "../services/channelService"

function useChannel(workspace_id) {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!workspace_id) return // si no hay workspace_id, no hacemos nada

        const fetchChannels = async () => {
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

        fetchChannels()
    }, [workspace_id])

    return { channels, loading, error }
}

export default useChannel