import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const translations = {
  en: {
    store: "Store",
    features: "Features",
    services: "Services",
    contact: "Contact",
    socialMedia: "Social Media",
    streaming: "Streaming",
    getStarted: "Get Started",
    search: "Search",
    cart: "Cart",
    checkout: "Checkout",
    total: "Total",
    support: "Support",
    contactSupport: "Contact Support"
  },
  fr: {
    store: "Boutique",
    features: "Fonctionnalités",
    services: "Services",
    contact: "Contact",
    socialMedia: "Réseaux sociaux",
    streaming: "Streaming",
    getStarted: "Commencer",
    search: "Rechercher",
    cart: "Panier",
    checkout: "Commander",
    total: "Total",
    support: "Support",
    contactSupport: "Contacter le support"
  },
  ar: {
    store: "المتجر",
    features: "المميزات",
    services: "الخدمات",
    contact: "اتصل بنا",
    socialMedia: "وسائل التواصل الاجتماعي",
    streaming: "بث",
    getStarted: "ابدأ الآن",
    search: "بحث",
    cart: "سلة التسوق",
    checkout: "الدفع",
    total: "المجموع",
    support: "الدعم",
    contactSupport: "اتصل بالدعم"
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage,
        translations: translations[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}