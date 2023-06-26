import { DiaryEntry } from '../types';
import Entry from './Entry'

const DiaryEntries = ({ diaries }: { diaries: Array<DiaryEntry> }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((entry:DiaryEntry) => (
        <Entry key={entry.id} entry = {entry}/>
      ))}
    </div>
  );
};

export default DiaryEntries;