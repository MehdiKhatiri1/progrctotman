import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const translations = {
  en: {
    main: "Main",
    store: "Store",
    contact: "Contact",
    socialMedia: "Social Media",
    streaming: "Streaming",
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    youtube: "YouTube",
    spotify: "Spotify",
    netflix: "Netflix",
    search: "Search",
    cart: "Cart",
    checkout: "Checkout",
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
    errorLoadingServices: "Error Loading Services",
    tryAgainLater: "Please try again later",
    total: "Total",
    quantity: "Quantity",
    price: "Price",
    description: "Description",
    addToCart: "Add to Cart",
    removeFromCart: "Remove from Cart",
    emptyCart: "Your cart is empty",
    continueToCheckout: "Continue to Checkout"
  },
  fr: {
    main: "Principal",
    store: "Boutique",
    contact: "Contact",
    socialMedia: "Réseaux sociaux",
    streaming: "Streaming",
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    youtube: "YouTube",
    spotify: "Spotify",
    netflix: "Netflix",
    search: "Rechercher",
    cart: "Panier",
    checkout: "Paiement",
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
    errorLoadingServices: "Erreur de chargement des services",
    tryAgainLater: "Veuillez réessayer plus tard",
    total: "Total",
    quantity: "Quantité",
    price: "Prix",
    description: "Description",
    addToCart: "Ajouter au panier",
    removeFromCart: "Retirer du panier",
    emptyCart: "Votre panier est vide",
    continueToCheckout: "Continuer vers le paiement"
  },
  ar: {
    main: "رئيسي",
    store: "المتجر",
    contact: "اتصل بنا",
    socialMedia: "وسائل التواصل الاجتماعي",
    streaming: "بث",
    instagram: "انستغرام",
    tiktok: "تيك توك",
    facebook: "فيسبوك",
    youtube: "يوتيوب",
    spotify: "سبوتيفاي",
    netflix: "نتفليكس",
    search: "بحث",
    cart: "السلة",
    checkout: "الدفع",
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
    errorLoadingServices: "خطأ في تحميل الخدمات",
    tryAgainLater: "يرجى المحاولة لاحقاً",
    total: "المجموع",
    quantity: "الكمية",
    price: "السعر",
    description: "الوصف",
    addToCart: "أضف إلى السلة",
    removeFromCart: "إزالة من السلة",
    emptyCart: "سلة التسوق فارغة",
    continueToCheckout: "المتابعة إلى الدفع"
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

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