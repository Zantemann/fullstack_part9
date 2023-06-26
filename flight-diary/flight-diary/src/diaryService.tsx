import axios from 'axios';
import { DiaryEntry, NewDiary } from './types';

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>('http://localhost:3003/api/diaries')
    .then(response => response.data)
}

export const createEntry = (object: NewDiary) => {
  return axios
    .post<DiaryEntry>('http://localhost:3003/api/diaries', object)
    .then(response => response.data)
}