export const BOT_NAME = 'Study Bot'

export const GREETING = "Hey! 👋 I'm the Study Analytics assistant. How can I help you?"

export const QUICK_REPLIES = [
  { text: 'How does this platform work?', id: 'how-it-works' },
  { text: 'I have a suggestion', id: 'suggestion' },
  { text: 'I need help', id: 'help' },
]

export const FAQ = {
  'how-it-works': {
    answer: "This platform helps you track your 100-day Digital Marketing mastery journey! 🚀\n\n📋 **Checklist** — Complete tasks day by day\n📊 **Dashboard** — See your overall progress\n🏆 **Achievements** — Unlock badges as you go\n⏱ **Focus Timer** — Stay productive with Pomodoro sessions\n📈 **Analytics** — Deep dive into your progress data\n\nJust click on any task to mark it complete. Your progress is saved automatically!",
    followUp: 'Anything else I can help with?'
  },
  'what-is-xp': {
    answer: "You earn XP for every task you complete!\n\n🟢 Beginner tasks: **10 XP**\n🟡 Intermediate tasks: **20 XP**\n🔴 Advanced tasks: **35 XP**\n\nAs you earn XP, you level up from Rookie all the way to Legend! 🏆",
    followUp: 'Want to know anything else?'
  },
  'how-to-save': {
    answer: "Your progress is automatically saved in your browser's local storage. No account needed! Just make sure you use the same browser and device.\n\n⚠️ Clearing browser data will reset your progress.",
    followUp: 'Need help with anything else?'
  },
  'about-courses': {
    answer: "Currently, we offer the **100 Days Digital Marketing Mastery** course covering SEO, PPC, Social Ads, Content Marketing, Email Marketing, Analytics, CRO, and Strategy.\n\nMore courses are coming soon! 🎉",
    followUp: 'Anything else?'
  },
}

export const COLLECT_INFO_TRIGGER = ['suggestion', 'help']

export const COLLECT_MESSAGE = "I'd love to help! Let me collect your details so Riyash can get back to you."

export const SUCCESS_MESSAGE = "Thanks! Your message has been sent. Riyash will reply soon. 🚀"

export const FALLBACK_RESPONSE = "I'm not sure about that, but I can connect you with Riyash! Would you like to send a message?"
