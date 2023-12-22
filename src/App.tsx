import * as React from "react";
import { PatientsData as patientsData } from "./data/PatientData";
import { DuplicatePatient } from "./components/DuplicatePatient/DuplicatePatient";

export function App() {

  return (

    <div className="m-auto flex w-full max-w-screen-xl flex-col p-6 md:p-8">
      < DuplicatePatient patient1={patientsData[0]} patient2={patientsData[1]} />
    </div>
  );
}
