import React, { useRef, useEffect } from 'react';
import './WorkspaceSwitcherModal.css';
import ICONS from '../Constants/icons';

const WorkspaceSwitcherModal = ({
    workspaces,
    currentWorkspaceId,
    onClose,
    navigate
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    const currentWorkspace = workspaces.find(w => String(w.workspace_id) === String(currentWorkspaceId));
    const otherWorkspaces = workspaces.filter(w => String(w.workspace_id) !== String(currentWorkspaceId));

    const handleSwitch = (id) => {
        navigate(`/${id}/channels`);
        onClose();
    };

    return (
        <div className="workspace-switcher-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="wsm-current-section">
                <div className="wsm-workspace-item-active">
                    <div className="wsm-avatar">
                        {currentWorkspace?.workspace_title.substring(0, 2).toUpperCase() || 'WS'}
                    </div>
                    <div className="wsm-details">
                        <span className="wsm-name">{currentWorkspace?.workspace_title}</span>
                        <span className="wsm-url">{currentWorkspace?.workspace_title.toLowerCase().replace(/\s+/g, '-')}.slack.com</span>
                    </div>
                    <ICONS.Check className="wsm-check-icon" />
                </div>
            </div>

            {otherWorkspaces.length > 0 && (
                <div className="wsm-other-section">
                    <span className="wsm-section-title">Switch workspaces</span>
                    {otherWorkspaces.map(w => (
                        <div
                            key={w.workspace_id}
                            className="wsm-workspace-item"
                            onClick={() => handleSwitch(w.workspace_id)}
                        >
                            <div className="wsm-avatar-small">
                                {w.workspace_title.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="wsm-name-small">{w.workspace_title}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="wsm-footer">
                <div
                    className="wsm-action-item"
                    onClick={() => {
                        navigate('/create-workspace');
                        onClose();
                    }}
                >
                    <div className="wsm-action-icon">
                        <ICONS.Plus />
                    </div>
                    <span>Add a workspace</span>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceSwitcherModal;
