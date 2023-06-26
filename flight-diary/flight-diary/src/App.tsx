import { useState, useEffect } from 'react';
import {AxiosError} from "axios";
import DiaryEntries from './components/DiaryEntries'
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaries, createEntry } from './diaryService';

const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  })

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date: newDate,
      weather: newWeather as Weather,
      visibility: newVisibility as Visibility,
      comment: newComment
    })
    .then(data => {
      setDiaries(diaries.concat(data))
      setNewDate('');
      setNewWeather('');
      setNewVisibility('');
      setNewComment('');
      setError('');
    })
    .catch(error => {
      const errorMessage = error as AxiosError;
      setError(errorMessage.response?.data as string);
    });
  }

  return (
    <div>
      <h2>Add new entry</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={entryCreation}>
        <div>
          Date
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>

        <div>
          Visibility
          <div>
            <label>
              <input
                type="radio"
                value={Visibility.Great}
                checked={newVisibility === Visibility.Great}
                onChange={() => setNewVisibility(Visibility.Great)}
              />
              Great
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value={Visibility.Good}
                checked={newVisibility === Visibility.Good}
                onChange={() => setNewVisibility(Visibility.Good)}
              />
              Good
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value={Visibility.Ok}
                checked={newVisibility === Visibility.Ok}
                onChange={() => setNewVisibility(Visibility.Ok)}
              />
              Ok
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value={Visibility.Poor}
                checked={newVisibility === Visibility.Poor}
                onChange={() => setNewVisibility(Visibility.Poor)}
              />
              Poor
            </label>
          </div>
        </div>

        <div>
          Weather
          <div>
            <label>
              <input
                type="radio"
                value={Weather.Sunny}
                checked={newWeather === Weather.Sunny}
                onChange={() => setNewWeather(Weather.Sunny)}
              />
              Sunny
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value={Weather.Rainy}
                checked={newWeather === Weather.Rainy}
                onChange={() => setNewWeather(Weather.Rainy)}
              />
              Rainy
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value={Weather.Cloudy}
                checked={newWeather === Weather.Cloudy}
                onChange={() => setNewWeather(Weather.Cloudy)}
              />
              Cloudy
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value={Weather.Stormy}
                checked={newWeather === Weather.Stormy}
                onChange={() => setNewWeather(Weather.Stormy)}
              />
              Stormy
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value={Weather.Windy}
                checked={newWeather === Weather.Windy}
                onChange={() => setNewWeather(Weather.Windy)}
              />
              Windy
            </label>
          </div>
        </div>

        <div>
          Comment
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <DiaryEntries diaries={diaries} />
    </div>
  )
}

export default App;