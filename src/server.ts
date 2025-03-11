import app from "./app";
import dotenv from "dotenv";
import config from "./config/default";

const PORT = config.PORT;
app.listen(PORT, () =>{
    console.log(`Server start on http://localhost:${PORT}`);
})
