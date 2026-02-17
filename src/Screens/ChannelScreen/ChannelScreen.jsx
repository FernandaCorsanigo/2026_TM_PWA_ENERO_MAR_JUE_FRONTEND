import React from 'react'
import { useParams, useNavigate } from 'react-router'
import useChannel from '../../hooks/useChannel'

const ChannelScreen = ({ workspaceId, onChannelSelect }) => {
    // Si no se pasa workspaceId por props, intentar obtenerlo de los params (fallback)
    const { workspace_id: paramWorkspaceId } = useParams()
    const activeWorkspaceId = workspaceId || paramWorkspaceId

    const navigate = useNavigate()
    const { channels, loading, error } = useChannel(activeWorkspaceId)

    const handleChannelClick = (channel_id) => {
        if (onChannelSelect) {
            onChannelSelect(channel_id)
        } else {
            // Comportamiento anterior por si se usa stand-alone (opcional)
            navigate(`/workspace/${activeWorkspaceId}/channel/${channel_id}`)
        }
    }

    if (!activeWorkspaceId) return <div>Selecciona un espacio de trabajo</div>
    if (loading) return <span>Cargando canales...</span>
    if (error) return <span>Error: {error.message}</span>
    if (channels.length === 0) return <span>No hay canales en este workspace</span>

    return (
        <div className='channel-screen-container'>
            <div className='channels-list'>  
            <h2 style={{ padding: '0 16px', color: '#cecacf', fontSize: '1rem', marginTop: '1rem' }}>Canales</h2>
            {channels.map(channel => (
                <div
                    key={channel._id}
                    className='channel-item'
                    onClick={() => handleChannelClick(channel._id)}
                >
                    <span># {channel.name}</span>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ChannelScreen