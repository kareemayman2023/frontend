import HeroSection from '@/components/homeComponents/HeroSection'
import SecondHero from '@/components/homeComponents/SecondHero'
import SpecialitySection from '@/components/homeComponents/SpecialitySection'
import TopDoctorsSection from '@/components/homeComponents/TopDoctorsSection'
import { useEffect, useRef } from 'react'
import { createChat } from '@n8n/chat'
import { useUser } from './store/useUser'
import './styles/n8nStyles.css'
import '@n8n/chat/style.css'

const Home = () => {
  const { user } = useUser()
  const initializedRef = useRef(false)
  useEffect(() => {
    if (!user) {
      document
        .querySelectorAll(
          '#n8n-chat, iframe[src*="n8n"], div[class*="n8n"], div[id*="n8n"]'
        )
        .forEach((el) => el.remove())
      return
    }

    if (initializedRef.current) return

    initializedRef.current = true

    createChat({
      webhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL,
      metadata: {
        userID: user._id,
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: ['Welcome to HealthHub! How can I help you today?'],
      i18n: {
        en: {
          title: 'HealthHub Chatbot 🤖',
          subtitle: '',
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
          closeButtonTooltip: 'Close chat',
        },
      },
      enableStreaming: false,
    })
  }, [user])
  return (
    <div className="flex flex-col gap-20">
      <HeroSection />
      <SpecialitySection />
      <TopDoctorsSection />
      <SecondHero />
    </div>
  )
}

export default Home
