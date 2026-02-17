import React, { useContext, useState, useEffect } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { Link } from 'react-router'
import ChannelScreen from '../ChannelScreen/ChannelScreen'
import MessageScreen from '../MessagesScreen/MessagesScreen'
import './HomeScreen.css'
import { AuthContext } from '../../Context/AuthContext'
import SideNav from '../../Components/SideNav/SideNav'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Spinner from '../../Components/Spinner/Spinner'

const HomeScreen = () => {
    const { workspace_list_loading, workspace_list, workspace_list_error } = useContext(WorkspaceContext)
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null)
    const [selectedChannelId, setSelectedChannelId] = useState(null)
    const { username: myUsername } = useContext(AuthContext)

    useEffect(() => {
        if (workspace_list?.data?.workspaces?.length > 0 && !selectedWorkspaceId) {
            setSelectedWorkspaceId(workspace_list.data.workspaces[0].workspace_id)
        }
    }, [workspace_list, selectedWorkspaceId])

    const handleWorkspaceSelect = (workspace_id) => {
        setSelectedWorkspaceId(workspace_id)
        setSelectedChannelId(null) // Reset channel when switching workspace
    }

    const handleChannelSelect = (channel_id) => {
        setSelectedChannelId(channel_id)
    }

    if (workspace_list_loading) {
        return <div className="home-container"><Spinner /></div>
    }

    if (workspace_list_error) {
        return <div className="home-container"><span style={{ margin: 'auto' }}>{workspace_list_error.message}</span></div>
    }

    if (!workspace_list || !workspace_list.data.workspaces || workspace_list.data.workspaces.length === 0) {
        return (
            <div className="home-container">
                <div style={{ margin: 'auto', textAlign: 'center' }}>
                    <h2>Aun no tienes espacios de trabajo</h2>
                    <Link to='/create-workspace' style={{ color: '#3498db' }}>Crear nuevo espacio</Link>
                </div>
            </div>
        )
    }

    const selectedWorkspace = workspace_list.data.workspaces.find(w => w.workspace_id === selectedWorkspaceId) || workspace_list.data.workspaces[0]


    return (
        <div className="home-container">
            <div className="workspace-sidebar">
                <div className="workspace-header">
                    {selectedWorkspace?.workspace_title || 'Workspaces'}
                </div>
                <ChannelScreen
                    workspaceId={selectedWorkspaceId}
                    onChannelSelect={handleChannelSelect}
                />

                {workspace_list.data.workspaces.length > 1 && (
                    <div style={{ marginTop: 'auto', padding: '10px', borderTop: '1px solid #522653' }}>
                        <h4 style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '5px' }}>Switch Workspace:</h4>
                        {workspace_list.data.workspaces.map(w => (
                            <div
                                key={w.workspace_id}
                                onClick={() => handleWorkspaceSelect(w.workspace_id)}
                                style={{
                                    cursor: 'pointer',
                                    opacity: w.workspace_id === selectedWorkspaceId ? 1 : 0.6,
                                    fontSize: '0.9rem',
                                    padding: '2px 0'
                                }}
                            >
                                {w.workspace_title}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="main-content">
                {selectedChannelId && myUsername ? (
                    <MessageScreen
                        workspace_id={selectedWorkspaceId}
                        channel_id={selectedChannelId}
                        myUsername={myUsername}
                    />
                ) : (
                    <div className="no-workspace-selected">
                        <div style={{ textAlign: 'center' }}>
                            <h3>¡Hola! Selecciona un canal para comenzar a chatear.</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomeScreen