import Hero from "./components/Hero";
import About from "./components/About";
import Calendar from "./components/Calendar";
import Products from "./components/Products";
import WhyChoose from "./components/WhyChoose"; // สมมติว่าแปลงแล้ว
import Testimonials from "./components/Testimonials";
import AdTracker from "./components/Cookie/AdTracker";
import CookieBanner from "./components/Cookie/CookieBanner";
export default function LandingPage() {
  return (
    <main>
      <Hero />
      <About />
      <Products /> 
      <WhyChoose />
      <Calendar />
      <AdTracker />
      <Testimonials />
      <CookieBanner />
    </main>
  );
}