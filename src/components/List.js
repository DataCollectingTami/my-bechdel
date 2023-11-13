import React from "react";
import "./List.css";
import { charParser } from "../backend/Helper";
import AddWatched from "./AddWatched";
import AddToList from "./AddToList";

function List(props) {
  const films = props.films;

  return (
    <table>
      <tr>
        <th>Film</th>
        <th>Year</th>
      </tr>
      {films.map((film) => (
        <tr className="film-item" key={film.id}>
          <td className="filmBox">
            <a
              className="film-title"
              target="_blank"
              rel="noopener noreferrer"
              href={"https://www.imdb.com/title/tt" + film.imdbid}
            >
              {charParser(film.title)}
            </a>
          </td>
          <td> {film.year}</td>
          <td>
          <AddToList id={film.id} title={charParser(film.title)} towatch={film.towatch} watched={film.watched} />
          </td>
          <td>
          <AddWatched id={film.id} title={charParser(film.title)} watched={film.watched} />
          </td>
        </tr>
      ))}
    </table>
  );
}

export default List;
