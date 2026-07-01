import app from "./app";
import { AppDataSource } from "./database";

AppDataSource.initialize()
    .then(() => {

        console.log("Database Connected");

       app.listen(8080, () => {
    console.log("Server Running");
    console.log("http://localhost:8080");
});

    })
    .catch((err) => {
        console.log(err);
    });

    