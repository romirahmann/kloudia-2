import { io } from "socket.io-client";
import { baseUrl } from "./api.service";

const socket = io(baseUrl);

// Fungsi untuk listen update_tenant
export const listenToUpdate = (event, payload) => {
  socket.on(event, payload);

  return () => {
    socket.off(event, payload);
  };
};

// Fungsi emit (opsional, jika butuh emit)
export const emitJoinRoom = (roomId) => {
  socket.emit("join", { room: roomId });
};

export default socket;
