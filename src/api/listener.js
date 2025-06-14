import { io } from "socket.io-client";

export const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const getStats = (setStat) => {
    const socket = io(`${baseUrl}/admin/stats`);
    socket.on("admin:stats", (data) => setStat(data));
    return socket;
};