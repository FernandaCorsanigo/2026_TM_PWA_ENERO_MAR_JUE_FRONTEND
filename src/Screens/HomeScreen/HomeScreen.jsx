import React, { useContext } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'

const HomeScreen = () => {
    const {workspace_list_loading, workspace_list, workspace_list_error} = useContext(WorkspaceContext)
    console.log(workspace_list)
    return (
        <div>
            <h1>Bienvenido nuevamente</h1>
            {workspace_list_loading && <span>Cargando...</span>}
            {workspace_list_error && <span>{workspace_list_error.message}</span>}
            {workspace_list && workspace_list.length > 0 && workspace_list.map(workspace => <p key={workspace.id}>{workspace.name}</p>)}
            {workspace_list && workspace_list.length === 0 && <span>No hay espacios de trabajo</span>}
        </div>
    )
}

export default HomeScreen