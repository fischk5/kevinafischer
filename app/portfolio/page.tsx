import Portfolio from '@/components/portfolio/Portfolio'
import styles from './page.module.css'
import Footer from '@/components/footer/Footer'

export const metadata = {
  title: 'Portfolio | Kevin Alan Fischer',
  description: 'Portfolio showcasing projects and work by Kevin Alan Fischer',
}

export default function PortfolioPage() {
  return (
    <main className={styles.main}>
      <Portfolio />
      <Footer/>
    </main>
  )
} 