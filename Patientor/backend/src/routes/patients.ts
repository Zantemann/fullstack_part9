import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const id: string = req.params.id;
  const patients = patientService.getEntries();

  const patient = patients.find(patient => patient.id === id);
  res.json(patient);
  
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Error happened.';
    if ( error instanceof Error ) {
      errorMessage = ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /*
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedEntry);
  */
});

export default router;