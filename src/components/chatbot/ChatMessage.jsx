export default function ChatMessage({ message, isBot }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed
        ${isBot
          ? 'bg-[var(--bg3)] text-[var(--tx)] rounded-bl-md'
          : 'bg-[var(--ac)] text-white rounded-br-md'
        }`}>
        <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
          __html: message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        }} />
      </div>
    </div>
  )
}
