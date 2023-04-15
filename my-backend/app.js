const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/check-access", (req, res) => {
  // Access key and context from the frontend
  const { accessKey, context } = req.body;

  // Your logic to check if the user has access to the video
  const hasAccess = checkUserAccess(accessKey, context);

  if (hasAccess) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

function checkUserAccess(accessKey, context) {
  // Implement your logic here to check if the user has access
  // This is just a simple example that checks if the accessKey matches a hardcoded value
  return accessKey === "your-access-key";
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
