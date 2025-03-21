"use client"

import Image from 'next/image'
import Link from 'next/link'
import styles from './Portfolio.module.css'
import { portfolioProjects } from '@/data/portfolioProjects'

export default function Portfolio() {
    return (
        <div className={styles.container}>
            <div className={styles.titleWrapper}>
                <div className={styles.titleBorder}></div>
                <h1 className={styles.title}>Portfolio</h1>
                <h2>On a mission to build innovative and interesting products</h2>
                <p className={styles.intro}>A techno-optimist, Kevin has built everything from AI-integrated project management apps to simple candle making educational content. Learn more about his projects here.</p>
            </div>
            

            
            <div className={styles.projectsGrid}>
                {portfolioProjects.map((project) => (
                    <Link href={`/portfolio/${project.key}`} key={project.key} className={styles.projectItem}>
                        <div className={styles.projectImageContainer}>
                            {project.image_url ? (
                                <Image 
                                    src={project.image_url} 
                                    alt={project.project_name}
                                    fill
                                    className={styles.projectImage}
                                />
                            ) : (
                                <div className={styles.placeholderImage}></div>
                            )}
                            <div className={styles.projectOverlay}>
                                <div className={styles.projectInfo}>
                                    <div className={styles.projectName}>{project.project_name}</div>
                                    <button className={styles.moreButton}>More</button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
} 