import React, { useContext } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { useParams, useNavigate, Link } from 'react-router'
import Spinner from '../Spinner/Spinner'
import './Workspaces.css'

const Workspaces = () => {
    const { workspace_id } = useParams()
    const { workspace_list, workspace_list_loading } = useContext(WorkspaceContext)
    const navigate = useNavigate()

    if (workspace_list_loading) return <Spinner />

    const workspaces = workspace_list?.data?.workspaces || []

    return (
        <div className="workspaces-container">
            <div className="workspaces-header">
                <h3>👋 Hello again!</h3>
            </div>

            <div className="workspaces-list">
                {workspaces.length === 0 ? (
                    <div className="no-workspaces">
                        <div className="empty-icon">💬</div>

                        <h3>You don't have any workspaces yet</h3>
                        <p>
                            Create your first workspace to get started 🚀
                        </p>
                        <button className="create-workspace-btn">
                            <Link
                                to="/create-workspace"
                            >
                                Create Workspace
                            </Link>
                        </button>

                    </div>
                ) : (
                    workspaces.map(w => (
                        <div
                            key={w.workspace_id}
                            className="workspace-card"
                            onClick={() => navigate(`/${w.workspace_id}/channels`)}
                        >
                            <div className='workspace-card-content'>
                                <div className='workspace-card-content-left'>
                                    <div>
                                        <span className="workspace-email-label">Your workspace:</span>
                                    </div>

                                    <div className="workspace-card-info">
                                        <div className="workspace-avatar">
                                            {w.workspace_title.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="workspace-details">
                                            <span className="workspace-name">{w.workspace_title}</span>
                                            <span className="workspace-members">Workspace</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="workspace-launch-btn">
                                        Launch Slack
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )
                }
            </div>
            <div className="workspaces-footer">
                <div>
                    <p>Want to use Slack with a different team?</p>
                    <div>
                        <Link to="/create-workspace" className="create-workspace-link">Create another workspace</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspaces