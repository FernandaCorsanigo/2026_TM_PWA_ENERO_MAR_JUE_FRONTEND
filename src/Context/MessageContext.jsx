import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import useMessages from "../hooks/useMessages";
import { AuthContext } from "./AuthContext";
import { createMessage, getMessagesList } from "../services/messageService";

export const MessageContext = createContext({
    localMessages: [],
    loadingMessages: false,
    sendMessageInContext: () => { }
});

export function MessageContextProvider({ children }) {
    const { workspace_id, channel_id } = useParams();
    const { messages, loading, sendMessage } = useMessages(workspace_id, channel_id);
    const { username } = useContext(AuthContext);

    const [localMessages, setLocalMessages] = useState([]);


    useEffect(() => {
        setLocalMessages([]);
    }, [channel_id]);


    useEffect(() => {
        if (!messages?.messages?.length) return;

        setLocalMessages(prev => {
            const newBackendMessages = messages.messages.filter(
                m => !prev.some(local => local._id === m._id)
            );

            return [...prev, ...newBackendMessages.map(msg => ({
                ...msg,
                fk_id_workspaceMember: {
                    fk_id_user: { username: msg.fk_id_workspaceMember?.fk_id_user?.username || username }
                }
            }))];
        });
    }, [messages, username]);

    const sendMessageInContext = async (content) => {
        if (!content.trim()) return;

        const currentUsername = username || "Usuario";

        const tempMessage = {
            _id: "temp-" + Date.now(),
            content,
            createdAt: new Date().toISOString(),
            fk_id_workspaceMember: { fk_id_user: { username: currentUsername } }
        };

        setLocalMessages(prev => [...prev, tempMessage]);

        const responseData = await sendMessage({ content });

        if (!responseData || !responseData.messages) {
            setLocalMessages(prev => prev.filter(msg => msg._id !== tempMessage._id));
            return;
        }

        setLocalMessages(
            responseData.messages.map(msg => ({
                ...msg,
                fk_id_workspaceMember: {
                    fk_id_user: {
                        username: msg.fk_id_workspaceMember?.fk_id_user?.username || currentUsername
                    }
                }
            }))
        );
    };

    return (
        <MessageContext.Provider value={{
            localMessages,
            loadingMessages: loading,
            sendMessageInContext
        }}>
            {children}
        </MessageContext.Provider>
    );
}