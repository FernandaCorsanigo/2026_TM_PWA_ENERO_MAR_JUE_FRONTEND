import { useNavigate } from "react-router"
import useRequest from "./useRequest"
import { createWorkspace } from "../services/workspaceService"
import { useEffect } from "react"

const useCreateWorkspace = () => {
    const navigate = useNavigate()
    const { loading, error, response, sendRequest } = useRequest()

    const createWorkspaceAction = (formValues) => {
        sendRequest(() => {
            return createWorkspace(formValues)
        })
    }

    useEffect(() => {
        if (response && response.ok) {
            navigate('/home') // Vuelve a la lista de espacios de trabajo
        }
    }, [response, navigate])

    return {
        createWorkspaceAction,
        loading,
        error
    }
}

export default useCreateWorkspace
