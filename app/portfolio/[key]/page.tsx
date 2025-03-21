import { fetchPortfolioProjectByKey } from "@/services/contentfulApi"
import PortfolioProject from "@/components/portfolio/PortfolioProject"
import { notFound } from "next/navigation"
import styles from './page.module.css'
import Footer from "@/components/footer/Footer"

interface PortfolioPageProps {
    params: Promise<{
        key: string
    }>
}

export default async function PortfolioProjectPage({ params }: PortfolioPageProps) {
    // Await the params Promise first
    const { key } = await params;
    
    // Fetch project data from Contentful
    const { portfolioProjectData } = await fetchPortfolioProjectByKey(key);
    
    if (!portfolioProjectData) {
        notFound();
    }
    
    return (
        <div className={styles.container}>
            <PortfolioProject portfolioProjectData={portfolioProjectData} />
            <Footer />
        </div>
    );
} 