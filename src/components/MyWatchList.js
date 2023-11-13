import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import "./MyWatchedList.css";
import { useData } from "../backend/FilmListContext";
import axios from "axios";
import { charParser } from "../backend/Helper";

function MyWatchList() {
  const { allFilmsJson, updateData } = useData();
  const [itemsFromFile, setItemsFromFile] = useState([]);

  useEffect(() => {
    // GET request to fetch data from JSON file
    axios
      .get("http://localhost:5000/api/watchlist")
      .then((response) => setItemsFromFile(response.data.watchList))
      .catch((error) =>
        console.error("Error fetching items from file:", error)
      );
  }, [updateData]);

  async function addToWatched(id){
    try {
      const response = await axios.put(
        `http://localhost:5000/api/allfilms/${id}`,
        { watched: true }
      );
      updateData(response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }

  }


  return (
    <div className="listBlock">
      <h2>To Watch</h2>

      <Card>
        <ul>
          {itemsFromFile.map((film) => (
            <li className="filmItem" key={film.id}>
              <div>{charParser(film.title)}</div>
              <button onClick={() => addToWatched(film.id)}>Watched</button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default MyWatchList;
