import diaries from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diaries;
};

export default {
  getEntries
};