import { useNavigate } from "react-router"
import useRequest from "./useRequest"
import { createWorkspace } from "../services/workspaceService"
import { useEffect, useContext } from "react"
import { WorkspaceContext } from "../Context/WorkspaceContext"

const useCreateWorkspace = () => {
    const navigate = useNavigate()
    const { loading, error, response, sendRequest } = useRequest()
    const { reloadWorkspaces } = useContext(WorkspaceContext)

    const createWorkspaceAction = (formValues) => {
        sendRequest(() => {
            return createWorkspace(formValues)
        })
    }

    useEffect(() => {
        if (response?.ok) {
            reloadWorkspaces()
            const workspace = response.data?.workspace
            const defaultChannel = workspace?.channels?.find(c => c.is_default)

            if (workspace?._id && defaultChannel?._id) {
                navigate(
                    `/${workspace._id}/channels/${defaultChannel._id}/messages`
                )
            }
        }
    }, [response, navigate])

    return {
        createWorkspaceAction,
        loading,
        error
    }
}

export default useCreateWorkspace
