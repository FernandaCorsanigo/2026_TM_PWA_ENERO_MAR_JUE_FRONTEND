import { createChannel } from "../services/channelService";
import useRequest from "./useRequest";

const useCreateChannel = () => {
    const { loading, error, response, sendRequest } = useRequest()

    const createChannelAction = async (workspace_id, channel_data) => {
        const channel = await sendRequest(() => createChannel(workspace_id, channel_data))
        return channel ?? null
    }

    return { createChannelAction, loading, error, response }
}

export default useCreateChannel