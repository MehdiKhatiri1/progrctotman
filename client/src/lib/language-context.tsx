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
    contactSupport: "Contact Support",
    login: "Login",
    register: "Register",
    username: "Username",
    password: "Password",
    email: "Email",
    confirmPassword: "Confirm Password",
    loginDescription: "Welcome back! Please login to your account.",
    registerDescription: "Create an account to get started.",
    needAccount: "Need an account? Register",
    haveAccount: "Have an account? Login",
    welcomeTitle: "Welcome to Trend Shop",
    welcomeDescription: "Your one-stop shop for social media growth and premium streaming services.",
    feature1: "High-quality social media services",
    feature2: "Premium streaming accounts",
    feature3: "24/7 customer support"
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
    contactSupport: "Contacter le support",
    login: "Connexion",
    register: "S'inscrire",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    email: "Email",
    confirmPassword: "Confirmer le mot de passe",
    loginDescription: "Bon retour! Veuillez vous connecter à votre compte.",
    registerDescription: "Créez un compte pour commencer.",
    needAccount: "Besoin d'un compte? S'inscrire",
    haveAccount: "Vous avez un compte? Connexion",
    welcomeTitle: "Bienvenue sur Trend Shop",
    welcomeDescription: "Votre guichet unique pour la croissance des médias sociaux et les services de streaming premium.",
    feature1: "Services de médias sociaux de haute qualité",
    feature2: "Comptes de streaming premium",
    feature3: "Support client 24/7"
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
    contactSupport: "اتصل بالدعم",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    email: "البريد الإلكتروني",
    confirmPassword: "تأكيد كلمة المرور",
    loginDescription: "مرحباً بعودتك! الرجاء تسجيل الدخول إلى حسابك.",
    registerDescription: "أنشئ حساباً للبدء.",
    needAccount: "تحتاج إلى حساب؟ سجل الآن",
    haveAccount: "لديك حساب؟ سجل دخول",
    welcomeTitle: "مرحباً بك في Trend Shop",
    welcomeDescription: "وجهتك الشاملة لنمو وسائل التواصل الاجتماعي وخدمات البث المميزة.",
    feature1: "خدمات وسائل التواصل الاجتماعي عالية الجودة",
    feature2: "حسابات بث مميزة",
    feature3: "دعم العملاء على مدار الساعة"
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