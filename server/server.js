const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const cors = require("cors");
const app = express();
const port = 5000;

app.use(bodyParser.json());

// CORS
app.use(cors());

let data = [];
// Read initial data from the JSON file when the server starts
async function initializeData() {
  try {
    const fileData = await fs.readFile("./allFilms.json", "utf-8");
    data = JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading data file:", error);
  }
}

initializeData();

// GET request to fetch ALLL
app.get("/api/allfilms", async (req, res) => {
  const fileContent = await fs.readFile("./allFilms.json");
  const allFilmsData = JSON.parse(fileContent);
  res.status(200).json({ allFilms: allFilmsData });
});

// GET request to fetch watched items
app.get("/api/watched", async (req, res) => {
  console.log("Received GET request to /api/watched");
  const watchedFilmsData = data.filter((item) => item.watched === true);
  res.status(200).json({ watchedFilms: watchedFilmsData });
});

// GET request to fetch watch list
app.get("/api/watchlist", async (req, res) => {
  console.log("Received GET request to /api/watchList");
  const watchListData = data.filter((item) => item.towatch === true && item.watched !==true);
  res.status(200).json({ watchList: watchListData });
});

// PUT request to add
app.put("/api/allfilms/:id", async (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;

  // Find the index of the item with the given id
  const index = data.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    // Update the existing item with new attributes
    data[index] = {
      ...data[index],
      ...updatedItem,
      newAttribute: "New Value",
    };

    // Write the updated data back to the JSON file
    await fs.writeFile("./allFilms.json", JSON.stringify(data, null, 2), "utf-8");

    res.json(data);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// DELETE request to delete an item
app.delete("/api/watched/:id", (req, res) => {
  const itemId = parseInt(req.params.id);

  watched = watched.filter((item) => item.id !== itemId);

  res.json(watched);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
