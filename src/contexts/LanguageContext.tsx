
import React, { createContext, useContext, useState } from 'react';

interface Language {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', direction: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', direction: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪', direction: 'rtl' },
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
    currency: 'AED',
    country: 'UAE',
    emergencyNumber: '+971-800-TRAVEL',
    hospitalName: 'Dubai Hospital',
    clinicName: 'Abu Dhabi Medical Center',
    doctorName: 'Dr. Ahmed Al-Mansouri',
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
    currency: 'AED',
    country: 'EAU',
    emergencyNumber: '+971-800-TRAVEL',
    hospitalName: 'Hospital de Dubai',
    clinicName: 'Centro Médico de Abu Dhabi',
    doctorName: 'Dr. Ahmed Al-Mansouri',
  },
  ar: {
    welcome: 'مرحباً',
    login: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    mobile: 'الهاتف المحمول',
    otp: 'رمز التحقق',
    policyNumber: 'رقم البوليصة',
    dateOfBirth: 'تاريخ الميلاد',
    forgotAccess: 'نسيت بيانات الدخول؟',
    dashboard: 'لوحة التحكم',
    viewPolicy: 'عرض البوليصة',
    searchCoverage: 'البحث عن التغطية',
    findDoctor: 'البحث عن طبيب',
    telemedicine: 'الطب عن بُعد',
    prescriptions: 'وصفاتي الطبية',
    support: 'الدعم والمساعدة',
    logout: 'تسجيل الخروج',
    policyDetails: 'تفاصيل البوليصة',
    coverage: 'التغطية',
    dependents: 'التابعون',
    validUntil: 'صالحة حتى',
    downloadPdf: 'تحميل PDF',
    searchTreatment: 'البحث عن علاج أو حالة',
    bookAppointment: 'حجز موعد',
    scheduleConsultation: 'جدولة استشارة',
    uploadPrescription: 'رفع وصفة طبية',
    orderMedicine: 'طلب دواء',
    trackDelivery: 'تتبع التوصيل',
    contactSupport: 'اتصل بالدعم',
    currency: 'درهم',
    country: 'الإمارات',
    emergencyNumber: '+971-800-TRAVEL',
    hospitalName: 'مستشفى دبي',
    clinicName: 'مركز أبوظبي الطبي',
    doctorName: 'د. أحمد المنصوري',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('travelInsurance_language', language.code);
    
    // Set document direction for RTL languages
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
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
