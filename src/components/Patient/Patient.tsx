import * as React from "react";
import { Patient as PatientType } from "../../type/Patient";
import { PatientFields as patientFields } from "../../data/PatientData";

type PatientProps = {
    patientData: PatientType;
    activeFieldSelection?: string | null;
    setFieldValue?: (arg0: string) => void;
    isMergComplete?: boolean;
};

export function Patient({
    patientData,
    activeFieldSelection = null,
    setFieldValue,
    isMergComplete = false,
}: PatientProps) {
    return (
        <div className="flex flex-col w-full p-2 mr-4">
            {patientFields.map((field) => {
                return (
                    <button
                        key={field.name}
                        onClick={() =>
                            setFieldValue && setFieldValue(patientData[field.name])
                        }
                        className={`flex p-1 ${activeFieldSelection === field.name && !isMergComplete
                            ? "border cursor hover:border-gray-600 border-gray-300"
                            : ""
                            }`}
                    >
                        <span>{field.label} :</span>
                        <span>{patientData[field.name]}</span>
                    </button>
                );
            })}
        </div>
    );
}

