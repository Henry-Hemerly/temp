import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import todoRoutes from "./routes"
import io from "socket.io"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser())
app.use(todoRoutes)

const uri: string = `mongodb+srv://todo-user:todo-password@to-do-db.sdwxe.mongodb.net/to-do-db?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })
