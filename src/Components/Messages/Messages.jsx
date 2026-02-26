import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { AuthContext } from "../../Context/AuthContext";
import MessageHeader from "../MessageHeader/MessageHeader";
import ICONS from "../Constants/icons";
import "./Messages.css";
import Spinner from "../Spinner/Spinner";

function Messages() {
    const { localMessages, loadingMessages, sendMessageInContext } = useContext(MessageContext);
    const { username } = useContext(AuthContext);

    const [newMessage, setNewMessage] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [localMessages]);

    const handleSendMessage = () => {
        sendMessageInContext(newMessage);
        setNewMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSendMessage();
    };

    return (
        <div className="message-screen">
            <MessageHeader />
            {loadingMessages && <div className="loading-text"><Spinner /></div>}

            <div className="message-list">
                <div className="message-list-spacer"></div>
                {localMessages.map(msg => {
                    const senderName = msg.fk_id_workspaceMember?.fk_id_user?.username || username || "Usuario";
                    const initial = senderName.charAt(0).toUpperCase();
                    const timeString = msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : "";

                    return (
                        <div key={msg._id} className="message-item">
                            <div className="message-avatar">{initial}</div>
                            <div className="message-body">
                                <div className="message-header-info">
                                    <span className="message-sender">{senderName}</span>
                                    <span className="message-time">{timeString}</span>
                                </div>
                                <div className="message-content">{msg.content}</div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <div className="message-input-wrapper">
                <div className="message-input-container">
                    <div className="message-input-toolbar">
                        <button className="toolbar-btn"><ICONS.Bold /></button>
                        <button className="toolbar-btn"><ICONS.Italic /></button>
                        <button className="toolbar-btn"><ICONS.Strikethrough /></button>
                        <div className="toolbar-divider"></div>
                        <button className="toolbar-btn"><ICONS.Link /></button>
                        <div className="toolbar-divider"></div>
                        <button className="toolbar-btn"><ICONS.ListNumbered /></button>
                        <button className="toolbar-btn"><ICONS.ListBulleted /></button>
                        <div className="toolbar-divider"></div>
                        <button className="toolbar-btn"><ICONS.CodeBlock /></button>
                    </div>

                    <textarea
                        className="message-input-field"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Write your message..."
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />

                    <div className="message-input-bottom-toolbar">
                        <div className="bottom-toolbar-left">
                            <button className="toolbar-btn plus-btn"><ICONS.Plus /></button>
                            <button className="toolbar-btn"><ICONS.Emoji /></button>
                            <button className="toolbar-btn"><ICONS.Mention /></button>
                        </div>
                        <div className="bottom-toolbar-right">
                            <button
                                className={`toolbar-btn send-btn ${newMessage.trim() ? "active" : ""}`}
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                            >
                                <ICONS.Send />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;