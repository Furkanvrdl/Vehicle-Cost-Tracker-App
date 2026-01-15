//Here I handled starting the server.
import dotenv from "dotenv"; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from .env file

import app from "./app";

const PORT = process.env.PORT || 3000; // Define the port to listen on

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
