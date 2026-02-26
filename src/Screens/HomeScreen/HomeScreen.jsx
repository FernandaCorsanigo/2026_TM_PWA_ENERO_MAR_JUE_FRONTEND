import React from 'react'
import './HomeScreen.css'
import Workspaces from '../../Components/Workspaces/Workspaces'
import { useParams } from 'react-router'

const HomeScreen = () => {
    const { workspace_id } = useParams()
    return (
        <div className='home-screen-container'>
            <div className="home-topbar">
                <div className="home-logo">
                    <img src="Images/Slack-logo-white.png" alt="Slack Logo" />
                </div>
            </div>
            <div className="home-content">
                <div className="workspaces-panel-card">
                    <Workspaces workspaceId={workspace_id} />
                </div>
            </div>
        </div>
    )
}

export default HomeScreen