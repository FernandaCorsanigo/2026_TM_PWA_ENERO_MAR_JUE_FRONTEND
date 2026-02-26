import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import AuthContextProvider from './Context/AuthContext'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import WorkspaceContextProvider from './Context/WorkspaceContext'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen'
import MessageScreen from './Components/Messages/Messages'
import { MessageContextProvider } from './Context/MessageContext'
import WorkspaceScreen from './Screens/WorkspaceScreen/WorkspaceScreen'
import ChannelContextProvider from './Context/ChannelContext'

function App() {

  return (
    <AuthContextProvider>
      <Routes>

        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />


        <Route element={<AuthMiddleware />}>


          <Route
            path="/home"
            element={
              <WorkspaceContextProvider>
                <HomeScreen />
              </WorkspaceContextProvider>
            }
          />


          <Route
            path="/create-workspace"
            element={
              <WorkspaceContextProvider>
                <CreateWorkspaceScreen />
              </WorkspaceContextProvider>
            }
          />


          <Route
            path="/:workspace_id/channels"
            element={
              <WorkspaceContextProvider>
                <ChannelContextProvider>
                  <WorkspaceScreen />
                </ChannelContextProvider>
              </WorkspaceContextProvider>
            }
          >

            <Route
              path=":channel_id/messages"
              element={
                <MessageContextProvider>
                  <MessageScreen />
                </MessageContextProvider>
              }
            />
          </Route>

        </Route>
      </Routes>
    </AuthContextProvider>
  )
}

export default App
