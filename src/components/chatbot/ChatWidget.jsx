import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Linkedin, Twitter, Instagram, AtSign, Globe } from 'lucide-react'
import { gsap } from '../../animations/gsapSetup'
import { OWNER } from '../../config/siteConfig'
import ChatMessage from './ChatMessage'
import { GREETING, QUICK_REPLIES, FAQ, COLLECT_INFO_TRIGGER, COLLECT_MESSAGE, SUCCESS_MESSAGE, FALLBACK_RESPONSE } from './chatbotConfig'

const SOCIAL = [
  { href: OWNER.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: OWNER.social.twitter, icon: Twitter, label: 'Twitter' },
  { href: OWNER.social.threads, icon: AtSign, label: 'Threads' },
  { href: OWNER.social.instagram, icon: Instagram, label: 'Instagram' },
  { href: OWNER.social.portfolio, icon: Globe, label: 'Portfolio' },
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ text: GREETING, isBot: true }])
  const [input, setInput] = useState('')
  const [collecting, setCollecting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const panelRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleOpen = () => {
    const next = !isOpen
    setIsOpen(next)
    if (next && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(2)' }
      )
    }
  }

  const addBotMsg = (text) => {
    setTimeout(() => setMessages(prev => [...prev, { text, isBot: true }]), 400)
  }

  const handleQuickReply = (id) => {
    const reply = QUICK_REPLIES.find(q => q.id === id)
    if (!reply) return
    setMessages(prev => [...prev, { text: reply.text, isBot: false }])
    setShowQuickReplies(false)

    if (COLLECT_INFO_TRIGGER.includes(id)) {
      addBotMsg(COLLECT_MESSAGE)
      setTimeout(() => setCollecting(true), 800)
    } else if (FAQ[id]) {
      addBotMsg(FAQ[id].answer)
      if (FAQ[id].followUp) setTimeout(() => addBotMsg(FAQ[id].followUp), 1200)
    } else {
      addBotMsg(FALLBACK_RESPONSE)
    }
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { text: input.trim(), isBot: false }])
    const q = input.toLowerCase().trim()
    setInput('')

    if (q.includes('xp') || q.includes('level')) {
      addBotMsg(FAQ['what-is-xp']?.answer || FALLBACK_RESPONSE)
    } else if (q.includes('save') || q.includes('progress')) {
      addBotMsg(FAQ['how-to-save']?.answer || FALLBACK_RESPONSE)
    } else if (q.includes('course')) {
      addBotMsg(FAQ['about-courses']?.answer || FALLBACK_RESPONSE)
    } else if (q.includes('how') || q.includes('work') || q.includes('use')) {
      addBotMsg(FAQ['how-it-works']?.answer || FALLBACK_RESPONSE)
    } else {
      addBotMsg(FALLBACK_RESPONSE)
      setTimeout(() => setCollecting(true), 800)
    }
  }

  const handleFormSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      addBotMsg('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      addBotMsg('Please enter a valid email address.')
      return
    }

    setSending(true)

    // Build mailto link and open it
    const subject = encodeURIComponent(`Study Analytics Query from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    const mailTo = `mailto:thisismd.riyash@gmail.com?subject=${subject}&body=${body}`
    window.open(mailTo, '_blank')

    setSending(false)
    setCollecting(false)
    setForm({ name: '', email: '', message: '' })
    addBotMsg(SUCCESS_MESSAGE)
  }

  return (
    <>
      {/* Panel */}
      {isOpen && (
        <div ref={panelRef}
          className="fixed z-[9998] bottom-20 right-4 md:bottom-24 md:right-5 w-[calc(100vw-32px)] md:w-[380px] max-h-[70vh] md:max-h-[500px]
            bg-[var(--bg2)] border border-[var(--bd)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--bd)] bg-[var(--bg3)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--ac)] flex items-center justify-center text-white text-sm">🤖</div>
              <div>
                <p className="text-sm font-bold text-[var(--tx)]">Study Bot</p>
                <p className="text-[10px] text-[var(--ok)]">● Online</p>
              </div>
            </div>
            <button onClick={toggleOpen} className="w-8 h-8 rounded-lg hover:bg-[var(--bd)] flex items-center justify-center transition-colors">
              <X size={16} className="text-[var(--tx3)]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {messages.map((m, i) => <ChatMessage key={i} message={m.text} isBot={m.isBot} />)}

            {showQuickReplies && (
              <div className="flex flex-col gap-2 mt-3">
                {QUICK_REPLIES.map(qr => (
                  <button key={qr.id} onClick={() => handleQuickReply(qr.id)}
                    className="text-left px-3 py-2 rounded-xl border border-[var(--ac)]/30 bg-[var(--ac)]/5
                      text-[var(--ac)] text-[12px] font-semibold hover:bg-[var(--ac)]/10 transition-colors">
                    {qr.text}
                  </button>
                ))}
              </div>
            )}

            {collecting && (
              <div className="mt-3 space-y-2">
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  placeholder="Your name" className="w-full px-3 py-2 rounded-lg border border-[var(--bd)] bg-[var(--bg3)] text-[var(--tx)] text-xs outline-none focus:border-[var(--ac)]" />
                <input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  placeholder="Your email" type="email" className="w-full px-3 py-2 rounded-lg border border-[var(--bd)] bg-[var(--bg3)] text-[var(--tx)] text-xs outline-none focus:border-[var(--ac)]" />
                <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))}
                  placeholder="Your message" rows={3} className="w-full px-3 py-2 rounded-lg border border-[var(--bd)] bg-[var(--bg3)] text-[var(--tx)] text-xs outline-none resize-none focus:border-[var(--ac)]" />
                <button onClick={handleFormSubmit} disabled={sending}
                  className="w-full py-2 rounded-lg bg-[var(--ac)] text-white text-xs font-bold hover:opacity-90 disabled:opacity-50 transition-opacity">
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Social icons bar */}
          <div className="flex items-center justify-center gap-4 px-4 py-2.5 border-t border-[var(--bd)] bg-[var(--bg3)]">
            <span className="text-[10px] font-semibold text-[var(--tx3)]">Connect:</span>
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-[var(--tx3)] hover:text-[var(--ac)] transition-colors" aria-label={label}>
                <Icon size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>

          {/* Input */}
          {!collecting && (
            <div className="flex gap-2 p-3 border-t border-[var(--bd)]">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg border border-[var(--bd)] bg-[var(--bg3)] text-[var(--tx)] text-xs outline-none focus:border-[var(--ac)]" />
              <button onClick={handleSend}
                className="w-9 h-9 rounded-lg bg-[var(--ac)] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                <Send size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating button */}
      <button onClick={toggleOpen}
        className="fixed z-[9998] bottom-4 right-4 md:bottom-5 md:right-5 w-14 h-14 rounded-2xl
          bg-[var(--ac)] text-white shadow-lg shadow-[var(--ac)]/30
          flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        style={{ bottom: 'max(16px, env(safe-area-inset-bottom, 16px))' }}>
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  )
}
