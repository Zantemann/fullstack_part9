import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";

import { Patient, Gender, Entry, DiagnoseEntry } from '../../types';
const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<DiagnoseEntry[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const data = await patientService.getPatient(id);
          setPatient(data);
        } catch (error) {
          console.error('Error fetching patient:', error);
        }
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const diagnosesData = await diagnoseService.getDiagnoses();
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      }
    };

    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  let genderIcon;
  if (patient.gender === Gender.Male) {
    genderIcon = <MaleIcon />;
  } else if (patient.gender === Gender.Female) {
    genderIcon = <FemaleIcon />;
  } else {
    genderIcon = <TransgenderIcon />;
  }

  return (
    <Box>
      <Typography variant="h4">{patient.name} {genderIcon}</Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      
      {patient.entries.length > 0 && (
        <>
          <Typography variant="h6">Entries</Typography>
          <div>
            {patient.entries.map((entry: Entry) => (
              <div key={entry.id}>
                <Typography>{entry.date} {entry.description}</Typography>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <ul>
                    {entry.diagnosisCodes.map((code: string) => {
                      const diagnosis = diagnoses.find((d) => d.code === code);
                      const diagnosisName = diagnosis ? diagnosis.name : '';
                      return <li key={code}>{code} {diagnosisName}</li>;
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </Box>
  );
};

export default PatientPage