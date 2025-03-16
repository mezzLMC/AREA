/**
 * area
 * File description:
 * ngrok
 */

const initializeNgrok = async (): Promise<string> => {
    const response = fetch(`http://${process.env.NGROK_HOST || "localhost"}:4040/api/tunnels`);
    const data = await (await response).json();
    const url = data.tunnels[0].public_url;
    return url;
};

export const createWebHookUrl = async (serviceId: string, actionId: string) => {
    const url = await initializeNgrok();
    return `${url}/api/webhook/${serviceId}/${actionId}`
};

export default createWebHookUrl;
