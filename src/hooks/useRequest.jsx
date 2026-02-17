
import { useState } from "react"

// Este hook tiene la responsabilidad de manejar las consultas http.
// Particularmente maneja el ESTADO de consulta que siempre suele ser el mismo: response, error o cargando.

//Crea los estados y tambien se encarga de manejar las respuestas
function useRequest() {
    const [loading, setLoading] = useState(false) //estado de carga
    const [response, setResponse] = useState(null) // estado de respuesta
    const [error, setError] = useState(null) // estado de error
    async function sendRequest(requestCallback) { // por funcion recibo una request, la voy a resolver y cuando la resuelvame va a dar una response 

        // sendRequest lo que hace es resolver la funcionalidad recibida (requestcallback"): recibe la callback, ejecuta la callback pasando el cragando a verdadero, setea la respuesta una vez esta correcta, si hay un fallo setea el error, finalmente el cargando pasa a ser falso nuevamente.

        try {
            setLoading(true)
            setResponse(null) //Para "hacer borron y cuenta nueva" si se vuelve a ejecutar el sendRequest
            setError(null)
            const response = await requestCallback()
            setResponse(response)
            return response
        }
        catch (error) {
            if (error.status) {
                setError(error)
            }
            else {
                setError(
                    { message: 'Ha ocurrido una excepcion' }
                )
            }
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        response,
        error,
        sendRequest,
    }
}
export default useRequest