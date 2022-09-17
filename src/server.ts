import dotenv from "dotenv";

dotenv.config({
  path: ".env" + process.env.NODE_ENV,
});

import { app } from "./app";

app.listen(process.env.PORT, () =>
  console.log(
    [
      "SERVER IS RUNNING:",
      "ENV: " + process.env.NODE_ENV,
      "PORT: " + process.env.PORT,
    ].join("\n")
  )
);
