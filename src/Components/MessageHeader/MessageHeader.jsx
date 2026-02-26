import React, { useContext } from "react"
import { useParams, useNavigate } from "react-router"
import ICONS from "../Constants/icons"
import "./MessageHeader.css"
import { ChannelContext } from "../../Context/ChannelContext"

const MessageHeader = () => {

    const { workspace_id, channel_id } = useParams()
    const navigate = useNavigate()

    const { channels, loading } = useContext(ChannelContext)

    const channel = channels?.find(
        ch => ch._id === channel_id
    )

    if (loading || !channels.length) {
        return <h2>Loading your channel...</h2>
    }

    if (!channel) {
        return <h2>Canal no encontrado</h2>
    }

    return (
        <div className="message-header">
            <div className="message-header-left">
                <button
                    className="mobile-back-btn"
                    onClick={() => navigate(`/${workspace_id}/channels`)}
                    aria-label="Back to channels"
                >
                    <ICONS.LeftArrow />
                </button>
                <button className="message-header-button star">
                    <ICONS.Star />
                </button>
                <h2>#{channel.name}</h2>
            </div>
            <div className="message-header-right">
                <button className="message-header-button">
                    <ICONS.PersonOutline />
                </button>
                <button className="message-header-button headphones-arrow">
                    <ICONS.Headphones className="headphones" />
                    <ICONS.DownArrow className="arrow" />
                </button>
                <button className="message-header-button bell">
                    <ICONS.Bell />
                </button>
                <button className="message-header-button">
                    <ICONS.Search />
                </button>
                <button className="message-header-button">
                    <ICONS.DotsVertical />
                </button>
            </div>
        </div>
    )
}

export default MessageHeader