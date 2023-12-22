import * as React from "react";
import { Patient } from "../Patient/Patient";
import { PatientFields as patientFields } from "../../data/PatientData";
import { Patient as PatientType, PatientKeys } from "../../type/Patient";;

type DuplicatePatientProps = {
    patient1: PatientType;
    patient2: PatientType;
};


export function DuplicatePatient({
    patient1,
    patient2,
}: DuplicatePatientProps) {
    const { email } = patient1;
    const [fieldsToBeMerged, setFieldsToBeMerged] = React.useState<PatientKeys[]>([]);
    const activeFieldSelection = fieldsToBeMerged.length ? fieldsToBeMerged[0] : null;

    const [firstName, setSelectedFirstName] = React.useState<string>("");
    const [lastName, setSelectedLastName] = React.useState<string>("");
    const [dob, setSelectedDOB] = React.useState<string>("");


    React.useEffect(() => {
        const fieldsToBeMerged: PatientKeys[] = []
        patientFields.forEach((field) => {
            if (patient1[field.name] !== patient2[field.name]) {
                fieldsToBeMerged.push(field.name)
            } else {
                setFieldValue(field.name, patient1[field.name])
            };
        });
        setFieldsToBeMerged(fieldsToBeMerged)
    }, []);

    function setFieldValue(fieldName: string, fieldValue: string) {
        if (fieldName === 'firstName') {
            setSelectedFirstName(fieldValue);
        } else if (fieldName === 'lastName') {
            setSelectedLastName(fieldValue);
        } else if (fieldName === 'dob') {
            setSelectedDOB(fieldValue);
        }

    }

    function handleSetFieldValue(fieldValue: string) {
        if (activeFieldSelection) {
            setFieldValue(activeFieldSelection, fieldValue);
        }
        setFieldsToBeMerged(fieldsToBeMerged.slice(1));
    }

    function handleLeftSelection() {
        if (activeFieldSelection) {
            handleSetFieldValue(patient1[activeFieldSelection]);
        }
    }

    function handleRightSelection() {
        if (activeFieldSelection) {
            handleSetFieldValue(patient2[activeFieldSelection]);
        }
    }

    const isMergeComplete = fieldsToBeMerged.length === 0;


    const mergedData = {
        ...patient1,
        firstName,
        lastName,
        dob,
    };

    return (
        <div className="m-4 p-4 border border-black flex flex-col w-108">
            <h2 className="text-center">Select Right fields for the Patient: {email}</h2>
            {!isMergeComplete && (<p className=" text-green-500 text-center">
                {fieldsToBeMerged.length} fields to be merged
            </p>)}

            <div className="flex w-full p-8">
                <Patient
                    setFieldValue={handleSetFieldValue}
                    activeFieldSelection={activeFieldSelection}
                    patientData={patient1}
                    isMergComplete={isMergeComplete}
                />
                <Patient patientData={mergedData} />
                <Patient
                    isMergComplete={isMergeComplete}
                    setFieldValue={handleSetFieldValue}
                    activeFieldSelection={activeFieldSelection}
                    patientData={patient2}
                />
            </div>
            {!isMergeComplete && (
                <div className="flex w-full justify-between px-8">
                    <button
                        onClick={handleLeftSelection}
                        className="p-1 hover bg-blue-100 w-20 rounded"
                        disabled={isMergeComplete}
                    >
                        Left
                    </button>
                    <button
                        onClick={handleRightSelection}
                        className="p-1 bg-blue-100 w-20 rounded"
                        disabled={isMergeComplete}
                    >
                        Right
                    </button>
                </div>
            )}
            {isMergeComplete && (
                <div className="flex w-full items-center flex-col mt-4">
                    <h2>Merged Data</h2>
                    <Patient patientData={mergedData} />
                </div>
            )}
        </div>
    );
}

