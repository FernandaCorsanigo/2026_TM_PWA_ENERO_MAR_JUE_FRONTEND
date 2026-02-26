import React, { useContext, useEffect } from 'react'
import { Outlet, useParams } from 'react-router'
import './WorkspaceScreen.css'
import Channels from '../../Components/Channels/Channels'
import SearchBar from '../../Components/SearchBar/SearchBar'
import SideNav from '../../Components/SideNav/SideNav'
import { ChannelContext } from '../../Context/ChannelContext'

const WorkspaceScreen = () => {
    const { workspace_id, channel_id } = useParams()
    const { fetchChannels } = useContext(ChannelContext)
    const inMessagesView = !!channel_id

    useEffect(() => {
        fetchChannels(workspace_id)
    }, [workspace_id])

    return (
        <div className='general-screen-container'>
            <div className="workspace-topbar">
                <SearchBar />
            </div>
            <div className={`workspace-layout${inMessagesView ? ' in-messages' : ''}`}>
                <div className='workspace-sidenav'>
                    <SideNav />
                </div>

                <div className="channels-panel">
                    <Channels workspaceId={workspace_id} />
                </div>

                <div className="messages-panel">
                    <Outlet />
                </div>
            </div>

            <nav className="mobile-bottom-nav">
                <SideNav mobileBottom />
            </nav>
        </div>
    )
}

export default WorkspaceScreen