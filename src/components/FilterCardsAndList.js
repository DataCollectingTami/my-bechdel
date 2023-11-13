import React, { useState, lazy, Suspense, useEffect } from "react";
import axios from "axios";
import "./FilterCardsAndList.css";
import List from "./List";
import { useData } from "../backend/FilmListContext";

const LazyList = lazy(() => import("./List"));



function FilterCardsAndList() {
  const {allFilmsJson, updateData} = useData()

  const [filterValue, setFilterValue] = useState("");
  const [decadeFilter, setDecadeFilter] = useState();
const [allFilms, setAllFilms] = useState([])

  useEffect(() => {
    // GET request to fetch data from JSON file
    axios.get("http://localhost:5000/api/allfilms").then(
      (response) => 
      setAllFilms(response.data.allFilms))
      .catch((error) => console.error('Error fetching items from file:', error)
    );
  }, [updateData]);

  const getDecade = (year) => {
    return Math.floor(year / 10) * 10;
  };

  const filterByDecade = (decade) => {
    setDecadeFilter(decade);
  };

  const filteredData = allFilms.filter((film) => {
    const isDecadeFiltered =
      decadeFilter === null ||
      getDecade(parseInt(film.year, 10)) === decadeFilter;

    const isTitleFiltered = film.title
      .toLowerCase()
      .includes(filterValue.toLowerCase());

    return isDecadeFiltered && isTitleFiltered;
  });

  return (
    <div>
      <div className="filters">
        {/* Input to set the filter value */}
        <input
          className="titleSearch"
          type="text"
          placeholder="Filter by Title"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        {/* Decades filter buttons */}
        <div>
          {[...Array(16)].map((_, index) => {
            const decade = 1870 + index * 10;
            return (
              <button
                className="decade"
                key={decade}
                onClick={() => filterByDecade(decade)}
                style={{
                  backgroundColor:
                    decadeFilter === decade
                      ? "purple"
                      : "rgba(180, 68, 224, 0.753)",
                }}
              >
                {decade}s
              </button>
            );
          })}
          <button className="decade" onClick={() => filterByDecade(null)}>
            All Decades
          </button>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <List films={filteredData} />
      </Suspense>
    </div>
  );
}

export default FilterCardsAndList;
