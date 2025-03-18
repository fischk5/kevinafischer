import LandingHero from "@/components/landing/LandingHero";
import LandingSection from "@/components/landing/LandingSection";
import SocialLinks from "@/components/social/SocialLinks";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div>
      <LandingHero/>
      <LandingSection/>
      <SocialLinks/>
      <Footer/>
    </div>
  );
}
