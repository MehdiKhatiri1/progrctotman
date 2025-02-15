import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="container relative min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {t("home.title")}
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          {t("home.description")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/services">
            <Button size="lg">{t("home.getStarted")}</Button>
          </Link>
          <Link href="/features">
            <Button variant="outline" size="lg">
              {t("home.learnMore")}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}