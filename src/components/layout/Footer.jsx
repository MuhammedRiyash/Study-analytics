import { Linkedin, Twitter, Instagram, AtSign, Globe } from 'lucide-react'
import { useCourse } from '../../context/CourseContext'
import { OWNER } from '../../config/siteConfig'

const SOCIAL_LINKS = [
  { href: OWNER.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: OWNER.social.twitter, icon: Twitter, label: 'Twitter' },
  { href: OWNER.social.threads, icon: AtSign, label: 'Threads' },
  { href: OWNER.social.instagram, icon: Instagram, label: 'Instagram' },
  { href: OWNER.social.portfolio, icon: Globe, label: 'Portfolio' },
]

export default function Footer() {
  const { totalDone, xp } = useCourse()

  return (
    <footer
      className="w-full border-t py-5 px-4"
      style={{ borderColor: 'var(--bd)' }}
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="text-sm font-medium" style={{ color: 'var(--tx3)' }}>
          Study Analytics &mdash; 100 Days Digital Marketing Mastery
        </p>

        <p className="text-xs mt-1.5" style={{ color: 'var(--tx3)' }}>
          {totalDone}/100 completed &middot; {xp} XP earned
        </p>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mt-3">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-80"
              style={{ color: 'var(--tx3)' }}
              aria-label={label}
            >
              <Icon size={18} strokeWidth={1.8} />
            </a>
          ))}
        </div>

        <p className="text-[11px] mt-3" style={{ color: 'var(--tx3)', opacity: 0.7 }}>
          &copy; 2025 {OWNER.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
