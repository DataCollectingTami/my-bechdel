import { Fragment } from 'react';
import Header from './components/Header';
import MyWatchList from './components/MyWatchList';
import MyWatchedList from './components/MyWatchedList';
import './App.css'
import FilterCardsAndList from './components/FilterCardsAndList';
import { DataProvider } from './backend/FilmListContext';

function App() {
  return (
    <DataProvider>
      <Header />
      <div className='user-area'>
      <MyWatchList />
      <MyWatchedList />
      </div>
      <FilterCardsAndList />
    </DataProvider>
  );
}

export default App;
