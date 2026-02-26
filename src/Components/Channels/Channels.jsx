import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import CreateChannelModal from '../CreateChannelModal/CreateChannelModal'
import ICONS from '../Constants/icons'
import './Channels.css'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { ChannelContext } from '../../Context/ChannelContext'
import Spinner from '../Spinner/Spinner'

const Channels = ({ workspaceId, onChannelSelect }) => {
    const { workspace_id: paramWorkspaceId } = useParams()
    const activeWorkspaceId = workspaceId || paramWorkspaceId

    const navigate = useNavigate()
    const { channels, loading, fetchChannels } = useContext(ChannelContext)
    const { workspace_list } = useContext(WorkspaceContext)

    const workspaces = workspace_list?.data?.workspaces || []
    const currentWorkspace = workspaces.find(w => String(w.workspace_id) === String(activeWorkspaceId))
    const workspaceNameDisplay = currentWorkspace ? currentWorkspace.workspace_title : 'Workspace'

    const handleChannelClick = (channel_id) => {
        if (onChannelSelect) {
            onChannelSelect(channel_id)
        } else {
            navigate(`${channel_id}/messages`)
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!activeWorkspaceId) return <div>Selecciona un espacio de trabajo</div>
    if (loading) return <Spinner />

    return (
        <div className='channel-screen-container'>
            <div className="workspace-header-button">
                <span className="workspace-name-text">{workspaceNameDisplay}</span>
                <ICONS.DownArrow className="workspace-dropdown-icon" />
            </div>

            <div className='channels-list-scroll'>
                <div className='section-header'>
                    <div className='section-header-title'>
                        <ICONS.DownArrow className="collapse-icon" />
                        <span>Channels</span>
                    </div>
                    <button className='add-btn' onClick={() => setIsModalOpen(true)}>
                        <ICONS.Plus />
                    </button>
                </div>
                {isModalOpen && (
                    <CreateChannelModal
                        workspace_id={activeWorkspaceId}
                        onClose={() => setIsModalOpen(false)}
                        onChannelCreated={() => {
                            fetchChannels(activeWorkspaceId)
                        }}
                    />
                )}

                {channels.length === 0
                    ? <span className="no-channels-text">No hay canales en este workspace</span>
                    : channels.map(channel => (
                        <div
                            key={channel._id}
                            className='channel-item'
                            onClick={() => handleChannelClick(channel._id)}
                        >
                            <span className="hash-icon">#</span>
                            <span className="channel-name-text">{channel.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Channels