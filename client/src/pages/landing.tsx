import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, ShoppingCart, Star, Shield, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SiInstagram, SiTiktok, SiFacebook, SiYoutube, SiSpotify, SiNetflix, SiHbo } from "react-icons/si";

const features = [
  "High-Quality Social Media Growth",
  "Premium Streaming Services",
  "24/7 Customer Support",
  "Secure Payment Methods",
  "Instant Delivery",
  "Money-Back Guarantee"
];

const services = [
  {
    icon: SiInstagram,
    name: "Instagram",
    description: "Boost your Instagram presence with real followers, likes, and engagement",
    link: "/instagram"
  },
  {
    icon: SiTiktok,
    name: "TikTok",
    description: "Grow your TikTok audience and increase your video views",
    link: "/tiktok"
  },
  {
    icon: SiFacebook,
    name: "Facebook",
    description: "Enhance your Facebook page with authentic likes and followers",
    link: "/facebook"
  },
  {
    icon: SiYoutube,
    name: "YouTube",
    description: "Get more YouTube subscribers and video views",
    link: "/youtube"
  }
];

const streamingServices = [
  {
    icon: SiSpotify,
    name: "Spotify",
    description: "Premium music streaming experience",
    link: "/spotify"
  },
  {
    icon: SiNetflix,
    name: "Netflix",
    description: "Access to premium Netflix content",
    link: "/netflix"
  },
  {
    icon: SiHbo,
    name: "HBO",
    description: "Stream HBO's exclusive content",
    link: "/hbo"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 text-primary">
                    <ShoppingCart className="w-full h-full" />
                  </div>
                  <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Trend Shop
                  </span>
                </motion.div>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/store">
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Store
                </span>
              </Link>
              <Link href="#features">
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Features
                </span>
              </Link>
              <Link href="#services">
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Services
                </span>
              </Link>
              <Link href="#contact">
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Contact
                </span>
              </Link>
              <Link href="/store">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.header 
        className="container mx-auto px-4 pt-32 pb-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60"
          {...fadeInUp}
        >
          Boost Your Digital Presence
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Your one-stop shop for social media growth and premium streaming services
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/store">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="tel:+212669056627">
            <Button size="lg" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Contact Sales
            </Button>
          </a>
        </motion.div>
      </motion.header>

      {/* Why Choose Us Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            {...fadeInUp}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                className="flex items-start gap-4 p-6 rounded-lg bg-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                <p className="text-lg">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            {...fadeInUp}
          >
            Our Services
          </motion.h2>

          {/* Social Media Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Social Media Growth</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link key={service.name} href={service.link}>
                    <motion.div
                      className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-12 h-12 text-primary mb-4" />
                      <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
                      <p className="text-muted-foreground">{service.description}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Streaming Services */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center">Streaming Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {streamingServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link key={service.name} href={service.link}>
                    <motion.div
                      className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-12 h-12 text-primary mb-4" />
                      <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
                      <p className="text-muted-foreground">{service.description}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            {...fadeInUp}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Service</h3>
              <p className="text-muted-foreground">Select from our wide range of services</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe Payment</h3>
              <p className="text-muted-foreground">Secure and easy payment process</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and efficient service delivery</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">See Results</h3>
              <p className="text-muted-foreground">Watch your digital presence grow</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            {...fadeInUp}
          >
            Get in Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.a
              href="tel:+212669056627"
              className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-8 h-8 text-primary" />
              <p className="text-lg">+212 669-056627</p>
            </motion.a>
            <motion.a
              href="mailto:contact@trendshop.com"
              className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-8 h-8 text-primary" />
              <p className="text-lg">contact@trendshop.com</p>
            </motion.a>
            <motion.div
              className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-8 h-8 text-primary" />
              <p className="text-lg text-center">Morocco</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}