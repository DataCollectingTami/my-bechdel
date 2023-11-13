import React, { useState } from "react";
import axios from "axios";
import { useData } from "../backend/FilmListContext";

function AddWatched(props) {
  const { allFilmsJson, updateData } = useData();

  const handleAddWatched = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/allfilms/${props.id}`,
        { watched: true }
      );
      updateData(response.data);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <button onClick={handleAddWatched} disabled={props.watched}>
      {props.watched ? "✅" : "Watched"}
    </button>
  );
}

export default AddWatched;
