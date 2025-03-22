export interface PortfolioProject {
    project_name: string;
    description: string;
    key: string;
    image_url: string;
}

export const portfolioProjects: PortfolioProject[] = [
    {
        project_name: "Tetheros",
        description: "Project management simplified",
        key: "tetheros",
        image_url: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/kaf_landing_thumbnail_tetheros.png"
    },
    {
        project_name: "Tetherform",
        description: "Personal portfolio showcase",
        key: "tetherform",
        image_url: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/kaf_landing_tetherform.png"
    },
    {
        project_name: "MoonLite",
        description: "Modern shopping experience",
        key: "moonlite",
        image_url: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/kaf_landing_moonlite.png"
    },
    {
        project_name: "Armatage Candle Company",
        description: "Monitor your health journey",
        key: "armatage-candle-company",
        image_url: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/kaf_landing_armatagecandlecompany.png"
    },
    {
        project_name: "HorrrorVerse",
        description: "Stay organized and productive",
        key: "horrrorverse",
        image_url: "https://storage.googleapis.com/kevinafischer_public/kevinafischer/kaf_landing_horrrorverse.png"
    }
]; 