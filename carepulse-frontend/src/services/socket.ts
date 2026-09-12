import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8082';

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
});