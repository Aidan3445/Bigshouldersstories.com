import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/coaching/header'
import Storytelling from '@/components/coaching/storytelling'
import WhatsYourStory from '@/components/footer/whatsYourStory'
import CollegeEssays from '@/components/coaching/collegeEssays'

export const Route = createFileRoute('/coaching/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <Storytelling />
      <CollegeEssays />
      <WhatsYourStory />
    </main>
  )
}
