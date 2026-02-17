import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import { Navigate, Outlet } from "react-router"

/* Nos permite saber si cierto usuario puede entrar o no a ciertas rutas */
function AuthMiddleware() {
    const { isLogged } = useContext(AuthContext)

    if (isLogged) { //si esta logeado, vamos a dejat que siga el flijo normal de la ruta, sino navega a la pantalla de login
        return <Outlet />
    }
    else {
        return <Navigate to={'/login'} />
    }
}

export default AuthMiddleware // >> lo usamos en el enrutador (en la App.jsx)