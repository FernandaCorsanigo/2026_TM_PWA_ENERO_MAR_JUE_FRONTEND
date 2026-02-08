import React, { useContext } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'

const HomeScreen = () => {
    const {workspace_list_loading, workspace_list, workspace_list_error} = useContext(WorkspaceContext)
    console.log(workspace_list)
    return (
        <div>
            <h1>Bienvenido nuevamente</h1>
        </div>
    )
}

export default HomeScreen