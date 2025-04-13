// socket.js
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND, {
  transports: ["websocket"],
  autoConnect: false // để tự kiểm soát khi connect
});

export default socket;