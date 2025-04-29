
import React, { createContext, useContext, useState } from 'react';

const EnrollmentContext = createContext();

export const useEnrollment = () => useContext(EnrollmentContext);

export const EnrollmentProvider = ({ children }) => {
    const [enrollmentNumber, setEnrollmentNumber] = useState('');

    return (
        <EnrollmentContext.Provider value={{ enrollmentNumber, setEnrollmentNumber }}>
            {children}
        </EnrollmentContext.Provider>
    );
};
