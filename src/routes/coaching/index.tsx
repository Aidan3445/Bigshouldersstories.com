import { createFileRoute } from '@tanstack/react-router'
import Storytelling from '@/components/coaching/storytelling'
import WhatsYourStory from '@/components/footer/whatsYourStory'
import CollegeEssays from '@/components/coaching/collegeEssays'
import { HeaderImage } from '@/components/headerImage'
import copy from '@/lib/copy'

export const Route = createFileRoute('/coaching/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <HeaderImage imageSrc="/coaching_header.jpg" headerText={copy.coaching.header.text} />
      <Storytelling />
      <CollegeEssays />
      <WhatsYourStory />
    </main>
  )
}
