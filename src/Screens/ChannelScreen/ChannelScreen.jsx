import React from 'react'
import { useParams, useNavigate } from 'react-router'
import useChannel from '../../hooks/useChannel'

const ChannelScreen = () => {
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const { channels, loading, error } = useChannel(workspace_id)

    const handleChannel = (channel_id) => {
        navigate(`/workspace/${workspace_id}/channel`)
    }

    if (loading) return <span>Cargando canales...</span>
    if (error) return <span>Error: {error.message}</span>
    if (channels.length === 0) return <span>No hay canales en este workspace</span>

    return (
        <div>
            <h2>Canales</h2>
            {channels.map(channel => (
                <div key={channel._id} onClick={() => handleChannel(channel._id)}>
                    <span>{channel.name}</span>
                </div>
            ))}
        </div>
    )
}

export default ChannelScreen