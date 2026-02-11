import React, { useContext } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { useNavigate } from 'react-router'

const HomeScreen = () => {
    const { workspace_list_loading, workspace_list, workspace_list_error } = useContext(WorkspaceContext)
    const navigate = useNavigate()

    const handleWorkspace = (workspace_id) => {
        navigate(`/workspace/${workspace_id}/channels`)
    }
    console.log(workspace_list)
    if (workspace_list_loading || !workspace_list) {
        return <span>Cargando...</span>
    }
    return (
        <div>
            <h1>Bienvenido nuevamente</h1>

            {workspace_list_error && <span>{workspace_list_error.message}</span>}
            {workspace_list.data.workspaces && workspace_list.data.workspaces.length > 0 && workspace_list.data.workspaces.map(workspace => <div key={workspace.workspace_id} onClick={() => handleWorkspace(workspace.workspace_id)}>
                {workspace.workspace_title}
            </div>)}
            {workspace_list.data.workspaces && workspace_list.data.workspaces.length === 0 && <span>No hay espacios de trabajo</span>}
        </div>
    )
}

export default HomeScreen