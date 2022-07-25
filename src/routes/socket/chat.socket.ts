import { Server } from "socket.io";

const chatSocket = async (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`NewChatConnection: ${socket.id}`)
    })
}

export default chatSocket;