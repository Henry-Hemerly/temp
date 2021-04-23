import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import todoRoutes from "./routes"
import { Server } from "socket.io"
import http from 'http'

const app: Express = express()
const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser())
app.use(todoRoutes)

const httpServer = http.createServer(app);
const io = new Server(httpServer);

const uri: string = `mongodb+srv://todo-user:todo-password@to-do-db.sdwxe.mongodb.net/to-do-db?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    httpServer.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('anything', () => {
    console.log('socket is related to');
    socket.emit('omg', new Date());
  })
  
})
