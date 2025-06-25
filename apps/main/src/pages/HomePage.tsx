import { Banner } from '../components/Banner'
import { ChatSection } from '../components/ChatSection'
import { Footer } from '../components/Footer'

interface HomePageProps {
  isEvil: boolean
  displayText: string
  primaryColor: string
}

export const HomePage = ({ isEvil, displayText, primaryColor }: HomePageProps) => (
  <>
    <Banner isEvil={isEvil} displayText={displayText} primaryColor={primaryColor} />
    <ChatSection isEvil={isEvil} />
    <Footer isEvil={isEvil} />
  </>
)