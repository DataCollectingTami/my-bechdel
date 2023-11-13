import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import axios from "axios";
import { charParser } from "../backend/Helper";
import { useData } from "../backend/FilmListContext";
import "./MyWatchedList.css";

function MyWatchedList() {
  const { allFilmsJson, updateData } = useData();
  const [itemsFromFile, setItemsFromFile] = useState([]);

  useEffect(() => {
    // GET request to fetch data from JSON file
    axios
      .get("http://localhost:5000/api/watched")
      .then((response) => setItemsFromFile(response.data.watchedFilms))
      .catch((error) =>
        console.error("Error fetching items from file:", error)
      );
  }, [updateData]);


async function addLiked(id){
  try {
    const response = await axios.put(
      `http://localhost:5000/api/allfilms/${id}`,
      { liked: true }
    );
    updateData(response.data);
  } catch (error) {
    console.error("Error adding item:", error);
  }
}


  return (
    <div className="listBlock">
      <h2>Watched </h2>
      <Card>
        <ul>
          {itemsFromFile.map((film) => (
            <li className="filmItem" key={film.id}>
              <div>{charParser(film.title)}</div>
              {!film.liked && <button onClick={() => addLiked(film.id)}>{"\u2661"}</button>}
              {film.liked && <button disabled='true' style={{opacity: 'none', backgroundColor: 'white' }} onClick={() => addLiked(film.id)}>{"❤️️"}</button>}
              </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default MyWatchedList;
