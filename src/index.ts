import bodyParser from "body-parser";
import { API } from "./API";
import { config } from "dotenv";

const app = API.app;
const port: number = 8080;

config();

app.use(bodyParser.json());
app.use("/users", API.usersRoute);

app.get("/", (req, res) => {
    res.send("Default endpoint.");
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

