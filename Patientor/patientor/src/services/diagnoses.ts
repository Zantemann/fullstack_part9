import axios from 'axios';

import { apiBaseUrl } from "../constants";
import { DiagnoseEntry } from "../types";

const getDiagnoses = async () => {
  const {data} = await axios.get<DiagnoseEntry[]>
    (`${apiBaseUrl}/diagnoses`);
  return data;
};


export default {
  getDiagnoses,
};