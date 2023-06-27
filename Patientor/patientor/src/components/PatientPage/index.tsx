import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from "../../services/patients";
import { Patient, Gender } from '../../types';
const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

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
    fetchPatient();
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
    </Box>
  );
};

export default PatientPage