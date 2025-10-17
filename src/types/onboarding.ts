export interface OnboardingSection {
    id: string;
    title: string;
    icon: string;
    completed: boolean;
}

export interface PatientData {
    who?: {
        firstName: string;
        lastName: string;
        middleName?: string;
        dateOfBirth: string;
        gender: string;
        ssn?: string;
    };
    contact?: {
        phone: string;
        email: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
    };
    choices?: {
        preferredLanguage?: string;
        communicationPreference?: string;
        appointmentReminders?: boolean;
        marketingOptIn?: boolean;
        portalAccess?: boolean;
        preferredPharmacy?: string;
    };
    provider?: {
        primaryProvider?: string;
        referringProvider?: string;
        previousProvider?: string;
        insuranceProvider: string;
        insuranceId: string;
        groupNumber?: string;
    };
    stats?: {
        height?: number;
        weight?: number;
        bloodType?: string;
        allergies?: string;
        medications?: string;
        medicalHistory?: string;
    };
    guardian?: {
        guardianName?: string;
        guardianRelation?: string;
        guardianPhone?: string;
        guardianEmail?: string;
        guardianAddress?: string;
        powerOfAttorney?: boolean;
    };
    employer?: {
        employerName?: string;
        occupation?: string;
        workPhone?: string;
        workAddress?: string;
        employmentStatus?: string;
        workEmail?: string;
    };
}
