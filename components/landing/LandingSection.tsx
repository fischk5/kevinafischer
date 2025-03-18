import styles from './LandingSection.module.css'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectData {
    srcUrl: string;
    title: string;
    altText: string;
    destinationUrl: string;
}

export default function LandingSection() {
    const projects: ProjectData[] = [
        {
            srcUrl: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/Tetheros%20Landing2.png",
            title: "Tetheros",
            altText: "Tetheros - simplified project management",
            destinationUrl: "https://tetheros.com"
        },
        {
            srcUrl: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/Tetherform%20Landing%20Page.png",
            title: "Tetherform",
            altText: "Tetherform - form builder and analysis tool",
            destinationUrl: "https://tetherform.com"
        },
        {
            srcUrl: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/MoonLite%20Landing.png",
            title: "MoonLite",
            altText: "MoonLite - candle making production management",
            destinationUrl: "https://moonlite.app"
        },
        {
            srcUrl: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/Comment%20Pilgrim.png",
            title: "Comment Pilgrim",
            altText: "Comment Pilgrim - get content ideas from the comments section",
            destinationUrl: "https://www.linkedin.com/in/kevinalanfischer/details/projects/"
        },
        {
            srcUrl: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/HorrrorVerse.png",
            title: "HorrrorVerse",
            altText: "HorrrorVerse - discover your next scary movie",
            destinationUrl: "https://horrrorverse.com"
        },
        {
            srcUrl: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/Armatage%20Candle%20Company.png",
            title: "Armatage Candle Company",
            altText: "Armatage Candle Company - premier online resource for accelerating your candle making technique and business",
            destinationUrl: "https://armatagecandlecompany"
        }
    ];

    return (
        <div className={styles.feature}>
            <h3>Featured Projects</h3>
            <div className={styles.projectsGrid}>
                {projects.map((project, index) => (
                    <div key={index} className={styles.projectItem}>
                        <div className={styles.imageContainer}>
                            <Image 
                                src={project.srcUrl} 
                                alt={project.altText}
                                width={360}
                                height={203}  // 16:9 aspect ratio
                                className={styles.projectImage}
                            />
                            <div className={styles.overlay}>
                                <h4>{project.title}</h4>
                                <Link href={project.destinationUrl} target="_blank" rel="noopener noreferrer">
                                    <button>Learn More</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
