import React, {useState, useEffect, Fragment} from 'react'
import Card from '../UI/Card'
import { films } from '../backend/Data/FilmList';
import List from './List';




function Filters(props) {
const [emptyList, setEmptyList] = useState(true)


var filtered
    const FilterItems = (startYear, endYear) => {
       filtered = films.filter((film) => {
         
          
        setEmptyList(false)
         return film
        });
      };

   

  return (
    <Fragment>
    <Card>
    <h3>1800s</h3>
    <button onClick={FilterItems(1800, 1900)}>Go</button>
    </Card>
    {!emptyList && <List props={filtered}/>}
    </Fragment>
  )
}

export default Filters