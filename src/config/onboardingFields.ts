export const sectionFields = {
    who: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'middleName', label: 'Middle Name', type: 'text' },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
        { name: 'ssn', label: 'SSN', type: 'text', pattern: '\\d{3}-\\d{2}-\\d{4}' },
    ],
    contact: [
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'address', label: 'Street Address', type: 'text', required: true },
        { name: 'city', label: 'City', type: 'text', required: true },
        { name: 'state', label: 'State', type: 'select', options: ['CA', 'NY', 'TX', 'FL'], required: true },
        { name: 'zipCode', label: 'ZIP Code', type: 'text', pattern: '\\d{5}', required: true },
    ],
    choices: [
        { name: 'preferredLanguage', label: 'Preferred Language', type: 'select', options: ['English', 'Spanish', 'French'] },
        { name: 'communicationPreference', label: 'Communication Method', type: 'select', options: ['Phone', 'Email', 'SMS'] },
        { name: 'appointmentReminders', label: 'Appointment Reminders', type: 'checkbox' },
        { name: 'marketingOptIn', label: 'Marketing Communications', type: 'checkbox' },
        { name: 'portalAccess', label: 'Patient Portal Access', type: 'checkbox', default: true },
        { name: 'preferredPharmacy', label: 'Preferred Pharmacy', type: 'text' },
    ],
    // Add other sections...
};
