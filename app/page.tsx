import { WelcomeHero } from "@/components/WelcomeHero";
import { artistName, artistTagline } from "@/data/paintings";

export default function Home() {
  return (
  // <h1>this is landing page</h1>
  
  <WelcomeHero artistName={artistName} tagline={artistTagline} />
  )
}
 