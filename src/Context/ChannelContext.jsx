import { createContext, useEffect, useState } from "react"
import { getChannelsList } from "../services/channelService"

export const ChannelContext = createContext()

const ChannelContextProvider = ({ children }) => {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchChannels = async (workspace_id) => {
        try {
            setLoading(true)
            const data = await getChannelsList(workspace_id)
            setChannels(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    const addChannel = (newChannel) => {
        setChannels(prev => [...prev, newChannel])
    }
    return (
        <ChannelContext.Provider value={{
            channels,
            loading,
            fetchChannels,
            addChannel
        }}>
            {children}
        </ChannelContext.Provider>
    )
}

export default ChannelContextProvider