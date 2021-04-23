"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.use(cors_1.default());
app.use(body_parser_1.default());
app.use(routes_1.default);
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
const uri = `mongodb+srv://todo-user:todo-password@to-do-db.sdwxe.mongodb.net/to-do-db?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default
    .connect(uri, options)
    .then(() => httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch(error => {
    throw error;
});
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('anything', () => {
        console.log('socket is related to');
        socket.emit('omg', new Date());
    });
});
