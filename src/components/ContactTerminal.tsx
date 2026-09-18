import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { Terminal, Send, FileText, ArrowUp, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { IconGithub, IconLinkedin, IconMail } from './Icons';
import { MagneticButton } from './MagneticButton';
import { ProfileImage } from './ProfileImage';
import { sendContactMessage } from '../services/emailService';

interface ContactTerminalProps {
  onReplay: () => void;
}

export const ContactTerminal: React.FC<ContactTerminalProps> = ({ onReplay }) => {
  const [formState, setFormState] = useState<'idle' | 'transmitting' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'transmitting') return;

    if (!validate()) {
      return;
    }

    setFormState('transmitting');
    setErrorMessage('');

    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setFormState('sent');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});

      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    } catch (err: any) {
      console.error("EmailJS failed:", {
        status: err?.status,
        text: err?.text,
        message: err?.message,
      });
      setFormState('error');
      setErrorMessage('Unable to send message. Please try again or contact me directly by email.');
    }
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
          <span>08 // INITIATE TRANSMISSION</span>
          <span className="text-slate-600">—</span>
          <span>CONNECT WITH NIKUNJ</span>
        </div>

        {/* Terminal Command Dissolution Prompt */}
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#060b17] font-mono text-xs text-slate-300 mb-12 flex flex-wrap items-center gap-3 transition-colors duration-300">
          <span className="text-emerald-400 font-bold">nikunj@portfolio:~$</span>
          <span className="text-cyan-300 font-semibold">connect --secure</span>
          {formState === 'transmitting' && (
            <span className="text-cyan-400 animate-pulse font-mono font-bold tracking-wider">
              [TRANSMITTING...]
            </span>
          )}
          {formState === 'sent' && (
            <span className="text-emerald-400 font-mono font-bold tracking-wider">
              [TRANSMISSION COMPLETE]
            </span>
          )}
          {formState === 'error' && (
            <span className="text-rose-400 font-mono font-bold tracking-wider">
              [TRANSMISSION FAILED]
            </span>
          )}
          <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
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
                aria-label="GitHub Profile"
                className="min-h-[52px] p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-cyan-400/50 hover:bg-cyan-950/20 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(62,198,255,0.12)] text-slate-200 flex items-center justify-between transition-all duration-300 ease-out group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="flex items-center gap-3">
                  <IconGithub className="w-4 h-4 text-cyan-400 group-hover:brightness-125 transition-all" />
                  <span className="font-bold tracking-wide">GITHUB</span>
                </div>
                <span className="text-cyan-400 text-xs group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                strength={5}
                aria-label="LinkedIn Profile"
                className="min-h-[52px] p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-portfolio-secondary/50 hover:bg-purple-950/20 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(139,123,255,0.12)] text-slate-200 flex items-center justify-between transition-all duration-300 ease-out group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-secondary"
              >
                <div className="flex items-center gap-3">
                  <IconLinkedin className="w-4 h-4 text-portfolio-secondary group-hover:brightness-125 transition-all" />
                  <span className="font-bold tracking-wide">LINKEDIN</span>
                </div>
                <span className="text-portfolio-secondary text-xs group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`mailto:${profileData.contact.email}?subject=Portfolio%20Contact%20%E2%80%94%20Nikunj%20Rathi`}
                data-cursor="external"
                strength={5}
                aria-label="Send Email via Mail Client"
                className="min-h-[52px] p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-emerald-400/50 hover:bg-emerald-950/20 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(52,211,153,0.12)] text-slate-200 flex items-center justify-between transition-all duration-300 ease-out group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <div className="flex items-center gap-3">
                  <IconMail className="w-4 h-4 text-emerald-400 group-hover:brightness-125 transition-all" />
                  <span className="font-bold tracking-wide">EMAIL</span>
                </div>
                <span className="text-emerald-400 text-xs group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={profileData.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                strength={5}
                aria-label="Resume on Google Drive"
                className="min-h-[52px] p-4 rounded-xl border border-white/5 bg-[#080d19] hover:border-cyan-400/50 hover:bg-cyan-950/20 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(62,198,255,0.12)] text-slate-200 flex items-center justify-between transition-all duration-300 ease-out group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-cyan-300 group-hover:brightness-125 transition-all" />
                  <span className="font-bold tracking-wide">RESUME</span>
                </div>
                <span className="text-cyan-300 text-xs group-hover:translate-x-1.5 transition-transform duration-300">↓</span>
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
                <span className="text-emerald-400 font-bold text-sm">TRANSMISSION COMPLETE</span>
                <p className="text-slate-300 text-[11px] max-w-xs leading-relaxed">
                  Message successfully transmitted. Nikunj will review your payload and respond directly via email shortly.
                </p>
                <span className="text-[10px] text-cyan-300 mt-2">STATUS: DELIVERED ✓</span>
                <button
                  type="button"
                  onClick={() => setFormState('idle')}
                  className="mt-4 text-[10px] text-slate-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
                >
                  Send another transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {formState === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-bold text-[11px] text-rose-300">TRANSMISSION FAILED</div>
                      <div className="text-[10px] text-slate-300 leading-normal">
                        {errorMessage || 'Unable to send message. Please try again or contact me directly by email.'}
                      </div>
                    </div>
                  </div>
                )}

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
                    disabled={formState === 'transmitting'}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, name: e.target.value }));
                      if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Ada Lovelace"
                    className={`w-full bg-[#05070b] border ${
                      formErrors.name ? 'border-rose-500/80 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
                    } rounded-xl p-3 text-white text-xs outline-none focus:shadow-cyan-glow transition-all disabled:opacity-50`}
                  />
                  {formErrors.name && (
                    <p className="text-rose-400 text-[10px] font-mono">{formErrors.name}</p>
                  )}
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
                    disabled={formState === 'transmitting'}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, email: e.target.value }));
                      if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="ada@computing.org"
                    className={`w-full bg-[#05070b] border ${
                      formErrors.email ? 'border-rose-500/80 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
                    } rounded-xl p-3 text-white text-xs outline-none focus:shadow-cyan-glow transition-all disabled:opacity-50`}
                  />
                  {formErrors.email && (
                    <p className="text-rose-400 text-[10px] font-mono">{formErrors.email}</p>
                  )}
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
                    disabled={formState === 'transmitting'}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, message: e.target.value }));
                      if (formErrors.message) setFormErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Let's engineer a distributed AI system..."
                    className={`w-full bg-[#05070b] border ${
                      formErrors.message ? 'border-rose-500/80 focus:border-rose-400' : 'border-white/10 focus:border-cyan-400'
                    } rounded-xl p-3 text-white text-xs outline-none focus:shadow-cyan-glow transition-all resize-none disabled:opacity-50`}
                  />
                  {formErrors.message && (
                    <p className="text-rose-400 text-[10px] font-mono">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formState === 'transmitting'}
                  data-cursor="TRANSMIT"
                  className="w-full mt-2 min-h-[44px] py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                >
                  {formState === 'transmitting' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                      <span>TRANSMITTING...</span>
                    </>
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
      <div id="replay" className="w-full max-w-7xl mx-auto pt-24 mt-20 border-t border-white/5 flex flex-col lg:flex-row items-center lg:items-end justify-between font-mono select-none gap-16">
        
        {/* Left Side: Text and Replay Button */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">
            08 // END OF JOURNEY
          </div>
          <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-4">
            BUILD. <span className="text-cyan-300">ANALYZE.</span> <span className="text-portfolio-secondary">AUTOMATE.</span>
          </h3>
          <p className="text-slate-500 text-xs tracking-widest uppercase mb-8">
            NIKUNJ RATHI &copy; 2026 &bull; ENGINEERED FOR SCALE
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

        {/* Right Side: Profile Picture with Futuristic HUD Frame */}
        <ProfileImage />

      </div>
    </section>
  );
};
