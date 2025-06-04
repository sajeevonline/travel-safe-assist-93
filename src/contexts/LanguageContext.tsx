
import React, { createContext, useContext, useState } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    mobile: 'Mobile',
    otp: 'OTP',
    policyNumber: 'Policy Number',
    dateOfBirth: 'Date of Birth',
    forgotAccess: 'Forgot access?',
    dashboard: 'Dashboard',
    viewPolicy: 'View Policy',
    searchCoverage: 'Search Coverage',
    findDoctor: 'Find Doctor',
    telemedicine: 'Telemedicine',
    prescriptions: 'My Prescriptions',
    support: 'Support & Help',
    logout: 'Logout',
    policyDetails: 'Policy Details',
    coverage: 'Coverage',
    dependents: 'Dependents',
    validUntil: 'Valid Until',
    downloadPdf: 'Download PDF',
    searchTreatment: 'Search treatment or condition',
    bookAppointment: 'Book Appointment',
    scheduleConsultation: 'Schedule Consultation',
    uploadPrescription: 'Upload Prescription',
    orderMedicine: 'Order Medicine',
    trackDelivery: 'Track Delivery',
    contactSupport: 'Contact Support',
  },
  es: {
    welcome: 'Bienvenido',
    login: 'Iniciar Sesión',
    email: 'Correo',
    password: 'Contraseña',
    mobile: 'Móvil',
    otp: 'OTP',
    policyNumber: 'Número de Póliza',
    dateOfBirth: 'Fecha de Nacimiento',
    forgotAccess: '¿Olvidaste el acceso?',
    dashboard: 'Panel',
    viewPolicy: 'Ver Póliza',
    searchCoverage: 'Buscar Cobertura',
    findDoctor: 'Encontrar Doctor',
    telemedicine: 'Telemedicina',
    prescriptions: 'Mis Recetas',
    support: 'Soporte y Ayuda',
    logout: 'Cerrar Sesión',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('travelInsurance_language', language.code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      availableLanguages: languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
