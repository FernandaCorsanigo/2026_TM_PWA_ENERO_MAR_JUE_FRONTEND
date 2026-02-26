import React, { useEffect, useRef, useState, useContext } from 'react'
import './SideNav.css'
import ICONS from '../Constants/icons'
import { Link, useParams, useNavigate } from 'react-router'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import WorkspaceSwitcherModal from '../WorkspaceSwitcherModal/WorkspaceSwitcherModal'

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSwitcherOpen, setIsSwitcherOpen] = useState(false)
    const menuRef = useRef(null)
    const btnRef = useRef(null)
    const { workspace_id } = useParams()
    const navigate = useNavigate()
    const { workspace_list } = useContext(WorkspaceContext)


    const workspaces = workspace_list?.data?.workspaces || []
    const currentWorkspace = workspaces.find(w => String(w.workspace_id) === String(workspace_id))
    const workspaceName = currentWorkspace ? currentWorkspace.workspace_title : 'WS'
    const initials = workspaceName.substring(0, 2).toUpperCase()

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                menuRef.current
                && !menuRef.current.contains(event.target)
                &&
                btnRef.current &&
                !btnRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },
        [isOpen])

    return (
        <div className='nav-container' style={{ position: 'relative' }}>
            <div className='nav-compressed'>
                <div className='nav-compressed_top'>
                    <div
                        className='workspace-switcher-btn'
                        onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
                        title={`Switch workspace (${workspaceName})`}
                    >
                        {initials}
                    </div>

                    {isSwitcherOpen && (
                        <WorkspaceSwitcherModal
                            workspaces={workspaces}
                            currentWorkspaceId={workspace_id}
                            onClose={() => setIsSwitcherOpen(false)}
                            navigate={navigate}
                        />
                    )}
                    <div className='nav-item' onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                        <div className='nav-icon-bg'>
                            <ICONS.Home />
                        </div>
                        <span className="nav-label">Home</span>
                    </div>
                    <div className='nav-item'>
                        <div className='nav-icon-bg'>
                            <ICONS.Chat />
                        </div>
                        <span className="nav-label">DMs</span>
                    </div>
                    <div className='nav-item'>
                        <div className='nav-icon-bg'>
                            <ICONS.Bell />
                        </div>
                        <span className="nav-label">Activity</span>
                    </div>
                    <div className='nav-item'>
                        <div className='nav-icon-bg'>
                            <ICONS.Files />
                        </div>
                        <span className="nav-label">More</span>
                    </div>
                </div>
                <div className='nav-compressed_bottom'>
                    <div className='nav-item'>
                        <div className='nav-icon-bg plus-icon-bg'>
                            <ICONS.Plus />
                        </div>
                    </div>
                    <div className='nav-item'>
                        <div className='profile-picture-container'>
                            <ICONS.Person />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav