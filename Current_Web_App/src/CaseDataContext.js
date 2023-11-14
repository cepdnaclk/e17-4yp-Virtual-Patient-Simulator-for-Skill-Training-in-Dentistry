// CaseDataContext.js
import React, { createContext, useState } from 'react';

export const CaseDataContext = createContext();

export const CaseDataProvider = ({ children }) => {
    const [caseData, setCaseData] = useState({}); // Initialize as an object
    return (
        <CaseDataContext.Provider value={{ caseData, setCaseData }}>
            {children}
        </CaseDataContext.Provider>
    );
};
