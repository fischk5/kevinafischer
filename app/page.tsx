import styles from './page.module.css'
import SocialLinks from "@/components/social/SocialLinks";
import Footer from "@/components/footer/Footer";
import BlogLanding from "@/components/blogLanding/BlogLanding";

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <BlogLanding />
      </div>
      <div>
        <SocialLinks/>
        <Footer/>
      </div>
    </div>
  );
}
