import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { Terminal, Send, FileText, ArrowUp, CheckCircle2 } from 'lucide-react';
import { IconGithub, IconLinkedin, IconMail } from './Icons';
import { MagneticButton } from './MagneticButton';

interface ContactTerminalProps {
  onReplay: () => void;
}

export const ContactTerminal: React.FC<ContactTerminalProps> = ({ onReplay }) => {
  const [formState, setFormState] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('transmitting');
    setTimeout(() => {
      setFormState('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-[#05070b] py-32 px-6 sm:px-12 lg:px-20 select-none overflow-hidden flex flex-col justify-between"
    >
      {/* Background radial ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Editorial Chapter Header */}
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-[0.25em] uppercase mb-8">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>07 // INITIATE TRANSMISSION</span>
          <span className="text-slate-600">—</span>
          <span>CONNECT WITH NIKUNJ</span>
        </div>

        {/* Terminal Command Dissolution Prompt */}
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#060b17] font-mono text-xs text-slate-300 mb-12 flex items-center gap-3">
          <span className="text-emerald-400 font-bold">nikunj@portfolio:~$</span>
          <span className="text-cyan-300 font-semibold">connect --secure</span>
          <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
        </div>

        {/* Massive Editorial Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Huge Editorial Statement & Channels */}
          <div className="lg:col-span-6 space-y-10">
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tighter leading-none">
              LET&apos;S<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-portfolio-secondary">
                BUILD
              </span><br />
              SOMETHING.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base font-sans max-w-md leading-relaxed">
              Available for software engineering roles, data analytics pipelines, and AI product development. Let&apos;s engineer something scalable together.
            </p>

            {/* Direct Channels with Magnetic Interaction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <MagneticButton
                as="a"
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                strength={5}
                className="p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-cyan-400/40 hover:bg-cyan-950/20 text-slate-200 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <IconGithub className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold">GITHUB</span>
                </div>
                <span className="text-cyan-400 text-[10px] group-hover:translate-x-1 transition-transform">→</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                strength={5}
                className="p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-portfolio-secondary/40 hover:bg-purple-950/20 text-slate-200 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <IconLinkedin className="w-4 h-4 text-portfolio-secondary" />
                  <span className="font-bold">LINKEDIN</span>
                </div>
                <span className="text-portfolio-secondary text-[10px] group-hover:translate-x-1 transition-transform">→</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`mailto:${profileData.contact.email}`}
                data-cursor="external"
                strength={5}
                className="p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-emerald-400/40 hover:bg-emerald-950/20 text-slate-200 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <IconMail className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">EMAIL</span>
                </div>
                <span className="text-emerald-400 text-[10px] group-hover:translate-x-1 transition-transform">→</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                strength={5}
                className="p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-cyan-400/40 hover:bg-cyan-950/20 text-slate-200 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-cyan-300" />
                  <span className="font-bold">RESUME</span>
                </div>
                <span className="text-cyan-300 text-[10px] group-hover:translate-x-1 transition-transform">↓</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Encrypted Relay Form */}
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#070b16] p-8 backdrop-blur-md relative font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-slate-400">TRANSMISSION_RELAY.sh</span>
              <span className="text-cyan-300 text-[10px]">ENCRYPTED PAYLOAD</span>
            </div>

            {formState === 'sent' ? (
              <div className="p-8 rounded-xl bg-[#08131e] border border-emerald-500/30 flex flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                <span className="text-emerald-400 font-bold text-sm">TRANSMISSION CONFIRMED</span>
                <p className="text-slate-300 text-[11px] max-w-xs">
                  Your message payload has been encrypted and transmitted. Nikunj will respond shortly.
                </p>
                <span className="text-[10px] text-cyan-300 mt-2">STATUS: SENT ✓</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-slate-300 font-bold">
                    NAME
                  </label>
                  <input
                    required
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ada Lovelace"
                    className="w-full bg-[#05070b] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-cyan-400 focus:shadow-cyan-glow transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-slate-300 font-bold">
                    EMAIL
                  </label>
                  <input
                    required
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="ada@computing.org"
                    className="w-full bg-[#05070b] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-cyan-400 focus:shadow-cyan-glow transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-slate-300 font-bold">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Let's engineer a distributed AI system..."
                    className="w-full bg-[#05070b] border border-white/10 rounded-xl p-3 text-white text-xs outline-none focus:border-cyan-400 focus:shadow-cyan-glow transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'transmitting'}
                  data-cursor="TRANSMIT"
                  className="w-full mt-2 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-cyan-glow disabled:opacity-50"
                >
                  {formState === 'transmitting' ? (
                    <span>ENCRYPTING &amp; TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FINAL INTERACTION: 08 // END OF JOURNEY + [ REPLAY EXPERIENCE ] */}
      <div id="replay" className="w-full max-w-7xl mx-auto pt-24 mt-20 border-t border-white/5 flex flex-col items-center text-center font-mono select-none">
        <div className="text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">
          08 // END OF JOURNEY
        </div>
        <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-4">
          BUILD. <span className="text-cyan-300">ANALYZE.</span> <span className="text-portfolio-secondary">AUTOMATE.</span>
        </h3>
        <p className="text-slate-500 text-xs tracking-widest uppercase mb-8">
          NIKUNJ RATHI &copy; {new Date().getFullYear()} &bull; ENGINEERED FOR SCALE
        </p>

        <button
          onClick={onReplay}
          data-cursor="REPLAY"
          className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-cyan-400/50 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 font-bold text-xs tracking-widest transition-all shadow-cyan-glow cursor-pointer focus:outline-none hover:scale-105"
        >
          <span>[ REPLAY EXPERIENCE &uarr; ]</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
