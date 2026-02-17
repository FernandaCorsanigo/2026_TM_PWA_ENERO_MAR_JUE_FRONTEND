import React from 'react'
import { Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import AuthContextProvider from './Context/AuthContext'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import WorkspaceContextProvider from './Context/WorkspaceContext'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen'
import ChannelScreen from './Screens/ChannelScreen/ChannelScreen'
import MessageScreen from './Screens/MessagesScreen/MessagesScreen'
import GeneralScreen from './Screens/GeneralScreen/GeneralScreen'
function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route element={<AuthMiddleware />}> /*Aca el middleware protege a la ruta de home y solo deja 'pasar' si esta logeado */
          <Route path='/home' element={
            <WorkspaceContextProvider>
              <GeneralScreen />
            </WorkspaceContextProvider>
          } />
          <Route path='/create-workspace' element={<CreateWorkspaceScreen />} />
          <Route path='/workspace-channel' element={<ChannelScreen />} />
          <Route path='/workspace-channel-messages' element={<MessageScreen />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App
