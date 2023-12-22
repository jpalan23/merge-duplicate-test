export type Patient = {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
};

export type PatientKeys = keyof Patient;

export type PatientField = {
    label: string;
    name: PatientKeys;
}