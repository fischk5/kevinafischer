import styles from './SocialLinks.module.css'
import { FaYoutube, FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6'
import Link from 'next/link'

export default function SocialLinks() {
    const socialLinks = [
        {
            platform: 'YouTube',
            icon: <FaYoutube />,
            url: 'https://www.youtube.com/@kevinalanfischer'
        },
        {
            platform: 'X',
            icon: <FaXTwitter />,
            url: 'https://x.com/iamkevinfischer'
        },
        {
            platform: 'LinkedIn',
            icon: <FaLinkedin />,
            url: 'https://www.linkedin.com/in/kevinalanfischer/'
        },
        {
            platform: 'GitHub',
            icon: <FaGithub />,
            url: 'https://github.com/fischk5'
        }
    ]

    return (
        <section className={styles.socialSection}>
            <div className={styles.container}>
                <h3>ON THE WEB</h3>
                <div className={styles.socialLinks}>
                    {socialLinks.map((social, index) => (
                        <Link 
                            key={index} 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                            aria-label={social.platform}
                        >
                            {social.icon}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}