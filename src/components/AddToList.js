import React from "react";
import { useData } from "../backend/FilmListContext";
import axios from "axios";

function AddToList(props) {
  const { allFilmsJson, updateData } = useData();

  const handleAddToList = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/allfilms/${props.id}`,
        { towatch: true }
      );
      updateData(response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <button onClick={handleAddToList} disabled={props.watched | props.towatch}>
      {props.towatch | props.watched ? "✅" : "Watch"}
    </button>
  );
}

export default AddToList;
