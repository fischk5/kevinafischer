import styles from './LandingHero.module.css'
import Image from "next/image";

export default function LandingHero() {
  return (
    <div className={styles.container}>
        <div className={styles.doubleWide}>
            <div className={styles.narrative}>
                <h1>Kevin Fischer</h1>
                <p>Kevin Fischer is a software engineer, founder, and content creator best known for running Tetheros, a technology company launched to provide innovative solutions that create leverage and accelerate productivity.</p>
                <p>He's also the owner of Armatage Candle Company, a candle making education brand he launched as the premier online resource for accelerating candle making techniques and business, where he has an audience of 65k+ candle makers.</p>
                {/* <button>Read the blog</button> */}
            </div>
            <div className={styles.image}>
                <Image
                src="https://storage.googleapis.com/kevinafischer_public/kevinafischer/2025%2003%2018%20Kevin%20With%20Books.png" 
                alt="Kevin Fischer"
                width={960}
                height={540}
                style={{ width: '100%', height: 'auto', boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
                />
            </div>

        </div>
    </div>
  )
}
