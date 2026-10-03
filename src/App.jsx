import { Component, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/* =========================================================
   DATA
========================================================= */

const heroWords = [
  "AI & SOFTWARE DEVELOPER",
  "AI APPLICATION BUILDER",
  "INTELLIGENT SYSTEMS",
  "BACKEND ENGINEER",
];

const navLinks = [
  ["About", "#about"],
  ["Technologies", "#technologies"],
  ["Roadmap", "#roadmap"],
  ["Work", "#work"],
  ["Credentials", "#credentials"],
  ["Contact", "#contact"],
];

const technologies = [
  "Python", "Java", "JavaScript", "SQL", "Gemini", "Ollama", "LLMs", "RAG",
  "Embeddings", "AI Agents", "FastAPI", "Flask", "REST APIs", "SQLite",
  "PostgreSQL", "Alembic", "JWT", "Android", "Android Studio", "Git",
  "GitHub", "Twilio", "ngrok",
];

const roadmap = [
  {
    number: "01",
    title: "Understand",
    description: "Break an idea into a clear problem, user need and technical direction.",
    meta: "PROBLEM → SYSTEM",
  },
  {
    number: "02",
    title: "Architect",
    description:
      "Design the backend, AI components, data flow and interfaces required to make the idea work.",
    meta: "ARCHITECTURE",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Turn the architecture into working software using modern AI and backend technologies.",
    meta: "ENGINEERING",
  },
  {
    number: "04",
    title: "Iterate",
    description:
      "Test, improve and refine the system until the technology becomes a usable product.",
    meta: "TEST → IMPROVE",
  },
];

// Add `href: "https://..."` to any project to turn on its "View project" link.
const projects = [
  {
    number: "01",
    category: "PERSONAL AI ASSISTANT",
    title: "ASTRA",
    shortTitle: "Personal AI Assistant",
    description:
      "A personal AI assistant designed around conversational intelligence, persistent context, semantic memory, retrieval and tool orchestration.",
    technologies: ["Python", "FastAPI", "Ollama", "Gemini", "SQLite", "Android"],
    href: "",
  },
  {
    number: "02",
    category: "CONVERSATIONAL AI",
    title: "VEYRA",
    shortTitle: "AI Character Platform",
    description:
      "An AI character and conversational platform combining a mobile interface with a structured backend, authentication and persistent data.",
    technologies: ["FastAPI", "PostgreSQL", "Gemini", "JWT", "Alembic", "Android"],
    href: "",
  },
  {
    number: "03",
    category: "VOICE AI",
    title: "AI ACADEMIC + WELLBEING CALL BOT",
    shortTitle: "Voice AI Application",
    description:
      "A voice AI application connecting telephony, speech processing, crisis detection, local AI inference and conversational responses.",
    technologies: ["Python", "Flask", "Ollama", "Twilio", "SQLite", "ngrok"],
    href: "",
  },
  {
    number: "04",
    category: "VOICE AGENT",
    title: "NEHA",
    shortTitle: "AI Voice Agent",
    // TODO: edit this so it describes what NEHA really does.
    description:
      "A voice AI agent that holds natural phone conversations, combining speech recognition, language-model reasoning and spoken responses.",
    technologies: ["Python", "Flask", "Ollama", "Twilio", "SQLite", "ngrok", "Sarvam"],
    href: "",
  },
];

// `verified: true` shows the purple "Verified" styling + badge.
// Optional: add `href: "https://..."` to show a "View credential" link.
const credentials = [
  {
    number: "01",
    type: "VERIFIED CREDENTIAL",
    title: "AI & Data Science Certification Program",
    subtitle: "Artificial Intelligence & Data Science",
    issuer: "Vishlesan i-Hub Foundation • IIT Patna",
    date: "Verified",
    meta: "Certification",
    verified: true,
  },
  {
    number: "02",
    type: "VERIFIED CREDENTIAL",
    title: "Unlocking AI for Everyone",
    subtitle: "Beginner 2",
    issuer: "Microsoft • Skill India Digital Hub",
    date: "06 AUG 2026",
    meta: "NSQF Level 2",
    verified: true,
  },
  {
    number: "03",
    type: "VERIFIED CREDENTIAL",
    title: "AI Tools Workshop",
    subtitle: "AI tools & ChatGPT workshop",
    issuer: "be10x",
    date: "Verified",
    meta: "AI Tools Workshop",
    verified: true,
  },
  {
    number: "04",
    type: "VERIFIED CREDENTIAL",
    title: "Personal Finance – Investment Options",
    subtitle: "Making Your Money Grow!",
    issuer: "GO BPO Services Pvt. Ltd. • Skill India Digital Hub",
    date: "Verified",
    meta: "Skill India Digital Hub",
    verified: true,
  },
  {
    number: "05",
    type: "CERTIFICATE OF PARTICIPATION",
    title: "IT Forensic Analyst",
    subtitle: "Online skilling course",
    issuer:
      "National Association of Software and Service Companies • Skill India Digital Hub",
    date: "29 SEP 2026",
    meta: "IT-ITeS Sector Skill Council",
    verified: false,
  },
  {
    number: "06",
    type: "CERTIFICATE OF PARTICIPATION",
    title: "AI - Data Engineering Analyst",
    subtitle: "Online skilling course",
    issuer:
      "National Association of Software and Service Companies • Skill India Digital Hub",
    date: "29 SEP 2026",
    meta: "IT-ITeS Sector Skill Council",
    verified: false,
  },
];

/* ---------- contact config (all optional via .env) ---------- */

const CONTACT_EMAIL = (import.meta.env.VITE_CONTACT_EMAIL || "ashishpn5454@gmail.com").trim();
// WhatsApp needs a real phone number: country code + digits, no "+" (e.g. 919876543210).
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "");

const contactLinks = [
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: "✉", external: false },
  {
    label: "WhatsApp",
    value: WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : "",
    href: WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "",
    icon: "◉",
    external: true,
  },
  {
    label: "Instagram",
    value: "ashish__893",
    href: "https://www.instagram.com/ashish__893/",
    icon: "◎",
    external: true,
  },
  { label: "Telegram", value: "@ashishk4454", href: "https://t.me/ashishk4454", icon: "➤", external: true },
].filter((link) => link.href);

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const easeCinema = [0.22, 1, 0.36, 1];

const pad = (n) => String(n).padStart(2, "0");

const inputClass =
  "w-full rounded-2xl border border-white/[0.07] bg-black/20 px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-purple-400/40 focus:shadow-[0_0_30px_rgba(168,85,247,0.12)]";

const labelClass = "mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/25";

/* =========================================================
   SMALL REUSABLE PIECES
========================================================= */

/** Last line of defence: shows a friendly screen instead of a blank page. */
class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Portfolio crashed:", error, info);
    document.body.style.overflow = ""; // never leave the page scroll-locked
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="grid min-h-screen place-items-center bg-[#050505] px-6 text-center text-white">
        <div>
          <p className="text-xl font-semibold tracking-[-0.06em]">
            AK<span className="text-purple-400">.</span>
          </p>
          <h1 className="mt-6 text-2xl font-medium">Something went wrong.</h1>
          <p className="mt-2 text-sm text-white/40">Reloading usually fixes it.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full border border-white/15 px-6 py-3 text-xs text-white/80 hover:border-purple-400/40"
          >
            Reload page
          </button>
        </div>
      </main>
    );
  }
}

/** Profile photo with a fallback so a missing /profile.png never shows a broken image. */
function ProfileImage({ className = "", eager = false, ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label="Ashish Kumar"
        className={`grid place-items-center bg-gradient-to-br from-purple-900/40 to-[#101010] text-7xl font-semibold tracking-[-0.06em] text-white/30 ${className}`}
      >
        AK
      </div>
    );
  }

  return (
    <motion.img
      src="/profile.png"
      alt="Ashish Kumar"
      decoding="async"
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={className}
      {...props}
    />
  );
}

/** Card with a purple light that follows the cursor. */
function Spotlight({ children, className = "", ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} className={`group relative ${className}`} {...rest}>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(168,85,247,0.13), transparent 45%)",
        }}
      />
      {children}
    </motion.div>
  );
}

/** Fade + slide up when scrolled into view. `as` can be "div", "p", etc. */
function Reveal({ as = "div", y = 25, delay = 0, className = "", children }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: easeCinema }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Section label: "—— 04 — Selected Work" */
function Label({ n, children }) {
  return (
    <Reveal className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-purple-300/60">
      <span className="h-px w-8 bg-purple-400" />
      {n} — {children}
    </Reveal>
  );
}

/** Heading where each line slides up from behind a mask. */
function MaskLines({ lines, className = "" }) {
  return (
    <h2 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.12, ease: easeCinema }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/** One word that lights up as the paragraph scrolls through the viewport. */
function ScrollWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrollWord key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </p>
  );
}

/** Endlessly scrolling outlined text band. */
function Marquee({ items, reverse = false }) {
  const row = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 items-center will-change-transform"
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span
              className="px-8 text-[clamp(3.5rem,9vw,9rem)] font-semibold leading-none tracking-[-0.06em] text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.14)" }}
            >
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-purple-400/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Working contact form (free: Web3Forms, 250 submissions/month).
 * Needs VITE_WEB3FORMS_KEY in your .env file. Without it, falls back to mailto.
 */
function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | email

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Quietly reject submissions caught by the honeypot.
    if (formData.get("botcheck")) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY?.trim();

    // No Web3Forms key: open the visitor's email app instead of pretending it was sent.
    if (!accessKey) {
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const subject = `Portfolio message from ${name}`;
      const body = `${message}\n\n— ${name} (${email})`;

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("email");
      return;
    }

    formData.set("access_key", accessKey);
    formData.set("subject", "New message from your portfolio");
    formData.set("from_name", "Portfolio contact form");
    formData.set("replyto", String(formData.get("email") || "").trim());

    setStatus("sending");

    // Abort after 15s so the button can never get stuck on "Sending…".
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus("error");
        return;
      }

      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  };

  // Clear an old success/error message as soon as the visitor edits the form again.
  const onChange = () => {
    if (status !== "idle" && status !== "sending") setStatus("idle");
  };

  const statusMessage = {
    sending: "Sending your message…",
    success: "Message sent successfully. Thanks for reaching out!",
    error: "Your message could not be sent. Please try again or use one of the direct options below.",
    email: "Your email app should open with your message ready. Press Send there to deliver it.",
  }[status];

  return (
    <motion.form
      onSubmit={onSubmit}
      onChange={onChange}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: easeCinema }}
      className="rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-7 backdrop-blur-sm md:p-9"
    >
      <div className="mb-7">
        <p className="text-[10px] uppercase tracking-[0.24em] text-purple-300/70">Start a conversation</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">Send me a message</h3>
        <p className="mt-2 text-sm leading-6 text-white/40">
          Share a little context and I’ll get back to you using the email address you provide.
        </p>
      </div>

      <div className="space-y-5">
        {/* Honeypot for basic spam filtering; real visitors never see or tick it. */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="contact-name" className={labelClass}>Your name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            placeholder="What should I call you?"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>Your email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            placeholder="you@example.com"
            className={inputClass}
          />
          <p className="mt-2 text-[11px] leading-5 text-white/30">So I can reply to you.</p>
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>Your message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            minLength={5}
            maxLength={2000}
            placeholder="Tell me about your idea, project, or opportunity…"
            className={`${inputClass} resize-y`}
          />
        </div>

        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileHover={status === "sending" ? undefined : { scale: 1.015 }}
          whileTap={status === "sending" ? undefined : { scale: 0.985 }}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-4 text-xs font-semibold text-black transition-colors hover:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/25 border-t-black" />
              Sending message…
            </>
          ) : (
            <>
              Send message <span aria-hidden="true">↗</span>
            </>
          )}
        </motion.button>

        <p
          role="status"
          aria-live="polite"
          className={`min-h-[1.25rem] text-xs leading-5 ${
            status === "success" || status === "email"
              ? "text-purple-300"
              : status === "error"
                ? "text-amber-200/90"
                : "text-white/45"
          }`}
        >
          {statusMessage || "Your details are used only to respond to your message."}
        </p>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">or contact directly</span>
          <span className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <div className="space-y-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-white/70 transition hover:border-purple-300/30 hover:text-white"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-purple-200"
                  aria-hidden="true"
                >
                  {link.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-[0.18em] text-white/30">
                    {link.label}
                  </span>
                  <span className="break-all">{link.value}</span>
                </span>
              </span>
              <span className="ml-3 text-purple-300" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </motion.form>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const reduceMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false); // true after the intro
  const [active, setActive] = useState("home");

  /* ---------- scroll-driven hero motion ---------- */
  const { scrollYProgress } = useScroll();
  const scrollBar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const heroImageY = useTransform(scrollYProgress, [0, 0.22], [0, -70]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.96]);
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.72]);
  const heroGlowY = useTransform(scrollYProgress, [0, 0.22], [0, -45]);

  /* ---------- cursor light (GPU-friendly: moves a small layer, no full-screen repaint) ---------- */
  const cx = useMotionValue(-600);
  const cy = useMotionValue(-600);
  const sx = useSpring(cx, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(cy, { stiffness: 90, damping: 20, mass: 0.6 });
  const lightX = useTransform(sx, (v) => v - 260);
  const lightY = useTransform(sy, (v) => v - 260);

  /* ---------- 3D tilt on the hero portrait ---------- */
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const tiltX = useSpring(tiltXRaw, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(tiltYRaw, { stiffness: 120, damping: 18 });

  const onHeroMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltYRaw.set(px * 10);
    tiltXRaw.set(-py * 8);
  };
  const onHeroLeave = () => {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  };

  /* ---------- smooth anchor scrolling (+ offset for the fixed nav) ---------- */
  useEffect(() => {
    const root = document.documentElement;
    const prevPadding = root.style.scrollPaddingTop;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollPaddingTop = "5.5rem";
    if (!reduceMotion) root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollPaddingTop = prevPadding;
      root.style.scrollBehavior = prevBehavior;
    };
  }, [reduceMotion]);

  /* ---------- intro sequence (plays once per browser session) ---------- */
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      /* storage blocked: just play the intro */
    }

    if (reduceMotion || seen) {
      setProgress(100);
      setReady(true);
      return;
    }

    document.body.style.overflow = "hidden";
    let value = 0;
    let doneTimer;
    const timer = setInterval(() => {
      value += Math.random() * 9 + 3;
      if (value >= 100) {
        clearInterval(timer);
        setProgress(100);
        doneTimer = setTimeout(() => {
          try {
            sessionStorage.setItem("intro-seen", "1");
          } catch {
            /* ignore */
          }
          setReady(true);
          document.body.style.overflow = "";
        }, 450);
      } else {
        setProgress(Math.floor(value));
      }
    }, 90);

    return () => {
      clearInterval(timer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  /* ---------- rotating identity line (pauses while the tab is hidden) ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden) return;
      setHeroIndex((current) => (current + 1) % heroWords.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  /* ---------- cursor tracking (mouse devices only) ---------- */
  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [cx, cy, reduceMotion]);

  /* ---------- highlight the nav link of the section in view ---------- */
  useEffect(() => {
    const ids = ["home", ...navLinks.map(([, href]) => href.slice(1))];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ---------- close mobile menu with Escape ---------- */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
        <a
          href="#about"
          className="sr-only z-[110] rounded-full bg-white px-4 py-2 text-xs text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        {/* =========================================================
            INTRO — LETTERBOX CURTAIN
        ========================================================= */}
        <AnimatePresence>
          {!ready && (
            <motion.div
              key="intro"
              className="fixed inset-0 z-[100]"
              exit={{ transition: { duration: 1.1 } }}
            >
              <motion.div
                exit={{ y: "-100%" }}
                transition={{ duration: 1.1, ease: easeCinema }}
                className="absolute inset-x-0 top-0 h-1/2 bg-[#050505]"
              />
              <motion.div
                exit={{ y: "100%" }}
                transition={{ duration: 1.1, ease: easeCinema }}
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050505]"
              />

              <motion.div
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              >
                <span className="text-xl font-semibold tracking-[-0.06em]">
                  AK<span className="text-purple-400">.</span>
                </span>

                <div className="h-px w-48 overflow-hidden bg-white/10 sm:w-64">
                  <div
                    className="h-full origin-left bg-gradient-to-r from-purple-500 to-white transition-transform duration-150"
                    style={{ transform: `scaleX(${progress / 100})` }}
                  />
                </div>

                <span className="text-[10px] tabular-nums tracking-[0.4em] text-white/40">
                  {String(progress).padStart(3, "0")}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================
            GLOBAL CINEMA LAYERS
            Blurred glows only fade (no scale) and are smaller than before:
            animating huge blurred layers was the main GPU/memory hog.
        ========================================================= */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="absolute left-1/2 top-[-20%] -translate-x-1/2">
            <motion.div
              animate={{ opacity: [0.7, 0.95, 0.7] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="h-[520px] w-[520px] rounded-full bg-purple-700/10 blur-[110px] will-change-[opacity] md:h-[650px] md:w-[650px] md:blur-[150px]"
            />
          </div>
          <div className="absolute right-[-15%] top-[30%] hidden h-[420px] w-[420px] rounded-full bg-purple-500/[0.06] blur-[120px] md:block" />
          <div className="absolute bottom-[-10%] left-[-10%] hidden h-[420px] w-[420px] rounded-full bg-indigo-500/[0.04] blur-[120px] md:block" />
        </div>

        {/* Cursor light */}
        <motion.div
          aria-hidden
          style={{
            x: lightX,
            y: lightY,
            background: "radial-gradient(circle, rgba(168,85,247,0.10), transparent 60%)",
          }}
          className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[520px] w-[520px] rounded-full will-change-transform md:block"
        />

        {/* Film grain (static: an animated, blended full-screen layer repaints every frame) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] hidden opacity-[0.04] md:block"
          style={{ backgroundImage: GRAIN }}
        />

        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[55]"
          style={{
            background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Scroll progress line */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollBar }}
          className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-purple-600 via-purple-300 to-white"
        />

        {/* =========================================================
            NAVIGATION
        ========================================================= */}
        <nav className="fixed left-0 right-0 top-0 z-50" aria-label="Main">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
            <motion.a
              href="#home"
              initial={{ opacity: 0, y: -15 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="relative z-50 text-xl font-semibold tracking-[-0.06em]"
            >
              AK<span className="text-purple-400">.</span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="hidden items-center gap-7 rounded-full border border-white/[0.08] bg-black/30 px-6 py-3 backdrop-blur-xl md:flex"
            >
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  aria-current={active === href.slice(1) ? "true" : undefined}
                  className={`text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-white ${
                    active === href.slice(1) ? "text-white" : "text-white/45"
                  }`}
                >
                  {label}
                </a>
              ))}
            </motion.div>

            <a
              href="#contact"
              className="hidden rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/10 md:block"
            >
              Let's Talk
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              <span className="text-lg">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-4 right-4 top-20 rounded-3xl border border-white/10 bg-[#090909]/95 p-6 backdrop-blur-2xl md:hidden"
              >
                <div className="flex flex-col">
                  {navLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      className="border-b border-white/[0.06] py-4 text-sm text-white/70"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* =========================================================
            HERO
            Positioning (-translate-*) lives on plain wrapper divs; Motion
            animates the inner element. Mixing both on one element made
            Motion's inline transform override Tailwind's centering.
        ========================================================= */}
        <section
          id="home"
          onMouseMove={onHeroMove}
          onMouseLeave={onHeroLeave}
          className="relative min-h-screen overflow-hidden bg-[#050505] px-5 pt-20 md:px-10 lg:px-14"
        >
          <div className="pointer-events-none absolute left-1/2 top-[-12%] -translate-x-1/2">
            <motion.div
              style={{ y: heroGlowY }}
              animate={{ opacity: [0.45, 0.7, 0.45] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="h-[520px] w-[520px] rounded-full bg-purple-600/[0.08] blur-[110px] will-change-[opacity] md:h-[700px] md:w-[700px] md:blur-[150px]"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
                maskImage: "linear-gradient(to bottom, black, transparent 85%)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto h-[calc(100svh-5rem)] min-h-[620px] max-w-[1500px]">
            {/* Central portrait */}
            <div className="absolute bottom-0 left-1/2 top-0 w-[min(86vw,760px)] -translate-x-1/2 md:w-[min(58vw,760px)]">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 25 }}
                animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 1.25, delay: 0.15, ease: easeCinema }}
                className="h-full w-full"
                style={{ perspective: 1200 }}
              >
                <motion.div
                  style={{
                    y: heroImageY,
                    scale: heroImageScale,
                    opacity: heroImageOpacity,
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: "preserve-3d",
                  }}
                  className="relative h-full w-full"
                >
                  <div className="relative h-full overflow-hidden rounded-[2.4rem] border border-white/[0.10] bg-white/[0.025] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:p-3">
                    <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#101010]">
                      <ProfileImage
                        eager
                        initial={{ scale: 1.06 }}
                        animate={ready ? { scale: 1 } : {}}
                        transition={{ duration: 2.2, ease: easeCinema }}
                        className="h-full w-full object-cover object-top"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
                      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />

                      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_14px_rgba(196,181,253,0.9)]" />
                        <span className="text-[7px] uppercase tracking-[0.24em] text-white/55 sm:text-[8px]">
                          Open to opportunities
                        </span>
                      </div>

                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.28em] text-white/30">
                            Currently building
                          </p>
                          <p className="mt-1 text-sm text-white/85">AI-powered systems</p>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-xs text-white/60 backdrop-blur-md">
                          ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Editorial hero title */}
            <div className="absolute left-0 top-1/2 z-20 max-w-[92vw] -translate-y-[38%]">
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                animate={ready ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.35, ease: easeCinema }}
              >
                <p className="mb-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.34em] text-white/30 sm:text-[10px]">
                  <span className="h-px w-8 bg-purple-400/60" />
                  HI, I'M ASHISH
                </p>

                <h1
                  className="max-w-[760px] text-[clamp(2.8rem,7.3vw,7.8rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-white"
                  aria-live="off"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroWords[heroIndex]}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -25 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="block"
                    >
                      {heroWords[heroIndex]}
                    </motion.span>
                  </AnimatePresence>
                </h1>
              </motion.div>
            </div>

            {/* Supporting hero information */}
            <div className="absolute right-0 top-1/2 z-20 hidden w-[min(28vw,360px)] -translate-y-[28%] lg:block">
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={ready ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.55, ease: easeCinema }}
              >
                <p className="text-sm leading-7 text-white/45">
                  I build AI-powered applications, intelligent assistants and practical software
                  systems by combining modern AI models with backend engineering and user-focused
                  interfaces.
                </p>

                <div className="mt-7 grid grid-cols-3 gap-2">
                  {[
                    ["AI", "Systems"],
                    ["Backend", "Engineering"],
                    ["Voice", "AI"],
                  ].map(([title, subtitle]) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-white/[0.08] bg-black/25 p-4 backdrop-blur-xl"
                    >
                      <p className="text-sm font-medium text-white/80">{title}</p>
                      <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/25">
                        {subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Small editorial details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="absolute bottom-10 left-0 z-20 flex items-center gap-3 text-[8px] uppercase tracking-[0.28em] text-white/35"
            >
              <span className="h-px w-7 bg-white/30" />
              Scroll to explore
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={ready ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-10 right-0 z-20 hidden text-right text-[8px] uppercase tracking-[0.28em] text-white/25 sm:block"
            >
              <span className="text-purple-300/50">01</span>
              <span className="mx-2">/</span>
              04
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            MARQUEE BAND
        ========================================================= */}
        <div className="relative z-10 space-y-2 border-y border-white/[0.05] py-8" aria-hidden>
          <Marquee items={["AI", "BACKEND", "VOICE", "ANDROID", "AGENTS", "RAG"]} />
          <Marquee items={["ASTRA", "VEYRA", "CALL BOT", "NEHA", "LLMS", "OLLAMA"]} reverse />
        </div>

        {/* =========================================================
            ABOUT
        ========================================================= */}
        <section
          id="about"
          className="relative z-10 px-6 py-32 md:px-10 lg:px-14 lg:py-44"
        >
          <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: easeCinema }}
              className="relative mx-auto w-full max-w-[420px]"
            >
              <div className="absolute -inset-4 rounded-[2.4rem] border border-purple-400/[0.035]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <ProfileImage className="h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* About copy */}
            <div>
              <Label n="01">About</Label>

              <div className="mt-10">
                <ScrollWords
                  text="I'm an AI & Software Developer focused on building practical applications that combine artificial intelligence, backend engineering, prompt engineering, building AI agents and modern user experiences."
                  className="max-w-3xl text-base leading-8 text-white md:text-lg md:leading-9"
                />

                <Reveal
                  as="p"
                  y={20}
                  className="mt-6 max-w-2xl text-sm leading-7 text-white/35 md:text-base"
                >
                  I enjoy turning ideas into working software — from AI assistants and
                  conversational systems to voice AI applications, backend APIs and Android
                  applications.
                </Reveal>

                <Reveal
                  as="p"
                  y={20}
                  delay={0.1}
                  className="mt-5 max-w-2xl text-sm leading-7 text-white/35 md:text-base"
                >
                  My current work explores LLMs, AI memory, retrieval, automation, conversational AI
                  and the engineering required to connect these technologies into usable products.
                </Reveal>

                <Reveal
                  y={20}
                  delay={0.2}
                  className="mt-8 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4"
                >
                  {[
                    ["AI", "Applications"],
                    ["Backend", "Systems"],
                    ["Voice", "AI"],
                    ["Android", "Applications"],
                  ].map(([first, second]) => (
                    <Spotlight
                      key={first}
                      className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-colors duration-500 hover:border-purple-400/20"
                    >
                      <span className="relative z-10 text-sm font-medium text-white">{first}</span>
                      <p className="relative z-10 mt-0.5 text-[10px] text-white/30">{second}</p>
                    </Spotlight>
                  ))}
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            TECHNOLOGIES
        ========================================================= */}
        <section
          id="technologies"
          className="relative z-10 border-y border-white/[0.05] px-6 py-28 md:px-10 lg:px-14"
        >
          <div className="mx-auto max-w-[1500px]">
            <Label n="02">Technologies</Label>
            <MaskLines
              lines={["Technologies I work with."]}
              className="text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.07em]"
            />

            <ul className="mt-14 flex flex-wrap gap-2.5">
              {technologies.map((technology, index) => (
                <motion.li
                  key={technology}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.5) }}
                  whileHover={{ y: -3 }}
                  className="rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs text-white/45 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/[0.08] hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]"
                >
                  {technology}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================
            ROADMAP
        ========================================================= */}
        <section
          id="roadmap"
          className="relative z-10 px-6 py-32 md:px-10 lg:px-14 lg:py-44"
        >
          <div className="mx-auto max-w-[1500px]">
            <Label n="03">Execution</Label>
            <MaskLines
              lines={["Core execution", <span key="r" className="text-white/25">roadmap.</span>]}
              className="max-w-4xl text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
            />

            <div className="relative mt-20">
              {/* Progress line connecting the four steps (desktop) */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: easeCinema }}
                className="absolute -top-6 left-0 right-0 hidden h-px origin-left bg-gradient-to-r from-purple-400/70 via-purple-400/20 to-transparent xl:block"
              />

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {roadmap.map((item, index) => (
                  <Spotlight
                    key={item.number}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: index * 0.1 }}
                    whileHover={{ y: -7 }}
                    className="min-h-[330px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-7 transition-colors duration-500 hover:border-purple-400/20"
                  >
                    <div className="relative z-10 flex items-start justify-between">
                      <span className="text-xs text-purple-300/60">{item.number}</span>
                      <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                        {item.meta}
                      </span>
                    </div>

                    <div className="relative z-10 mt-28">
                      <h3 className="text-2xl font-medium tracking-[-0.04em]">{item.title}</h3>
                      <p className="mt-4 text-sm leading-7 text-white/35">{item.description}</p>
                    </div>
                  </Spotlight>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROJECTS
        ========================================================= */}
        <section
          id="work"
          className="relative z-10 px-6 py-32 md:px-10 lg:px-14 lg:py-44"
        >
          <div className="mx-auto max-w-[1500px]">
            <Label n="04">Selected Work</Label>

            <MaskLines
              lines={["Featured engineering", <span key="p" className="text-white/25">projects.</span>]}
              className="max-w-5xl text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
            />

            <Reveal
              as="p"
              delay={0.1}
              className="mt-8 max-w-xl text-sm leading-7 text-white/35 md:text-base"
            >
              A selection of AI, backend and voice systems built by turning ideas into working
              software.
            </Reveal>

            <div className="mt-20 grid gap-4 md:grid-cols-2">
              {projects.map((p, i) => (
                <Spotlight
                  key={p.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: (i % 2) * 0.08, ease: easeCinema }}
                  whileHover={{ y: -5 }}
                  className="h-full overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-br from-white/[0.045] via-white/[0.018] to-transparent transition-colors duration-500 hover:border-purple-400/25"
                >
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-500/[0.06] blur-[80px] transition-colors duration-700 group-hover:bg-purple-500/[0.14]" />

                  <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium tracking-[0.15em] text-purple-300/70">
                        {p.number}
                      </span>
                      <span className="h-px w-8 bg-white/10" />
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                        {p.category}
                      </span>
                    </div>

                    <div className="mt-12 flex flex-1 flex-col">
                      <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-purple-300/45">
                        {p.shortTitle}
                      </p>

                      <h3 className="text-[clamp(2.2rem,4vw,4.4rem)] font-semibold leading-[0.9] tracking-[-0.075em] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                        {p.title}
                      </h3>

                      <p className="mt-8 max-w-xl text-sm leading-7 text-white/45 md:leading-8">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-10 flex flex-col gap-6 border-t border-white/[0.07] pt-6">
                      <div className="flex flex-wrap gap-2">
                        {p.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3.5 py-2 text-[9px] uppercase tracking-[0.08em] text-white/40 transition-colors duration-300 group-hover:border-purple-400/15 group-hover:text-white/55"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/button flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-white/50 transition-colors duration-300 hover:text-white"
                        >
                          <span>View project</span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover/button:border-purple-400/40 group-hover/button:bg-purple-500/10 group-hover/button:text-purple-300">
                            <span className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5">
                              ↗
                            </span>
                          </span>
                        </a>
                      ) : (
                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/25">
                          Case study coming soon
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 z-10 h-px w-0 bg-gradient-to-r from-transparent via-purple-400/70 to-transparent transition-all duration-1000 group-hover:w-full" />
                </Spotlight>
              ))}
            </div>

            <Reveal
              y={10}
              className="mt-10 flex items-center justify-between border-t border-white/[0.05] pt-5"
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                AI • Backend • Voice • Mobile
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                {pad(projects.length)} Selected Systems
              </span>
            </Reveal>
          </div>
        </section>

        {/* =========================================================
            CREDENTIALS
        ========================================================= */}
        <section
          id="credentials"
          className="relative z-10 overflow-hidden border-y border-white/[0.05] px-6 py-32 md:px-10 lg:px-14 lg:py-40"
        >
          <div className="pointer-events-none absolute left-1/3 top-1/4 h-[360px] w-[360px] rounded-full bg-purple-600/[0.07] blur-[110px]" />
          <div className="pointer-events-none absolute bottom-[-12%] right-[-8%] hidden h-[340px] w-[340px] rounded-full bg-violet-500/[0.05] blur-[110px] md:block" />

          <div className="relative mx-auto max-w-[1500px]">
            <Label n="05">Credentials</Label>

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <MaskLines
                lines={["Learning never", <span key="s" className="text-white/25">stops.</span>]}
                className="max-w-5xl text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.075em]"
              />
              <Reveal
                as="p"
                delay={0.1}
                className="max-w-sm text-sm leading-7 text-white/30 md:text-base"
              >
                A growing record of verified learning and credentials that support the systems I
                build.
              </Reveal>
            </div>

            <div className="mt-20 space-y-3">
              {credentials.map((credential, index) => (
                <Spotlight
                  key={credential.number}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: Math.min(index, 3) * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`overflow-hidden rounded-[2rem] border transition-colors duration-500 ${
                    credential.verified
                      ? "border-purple-400/20 bg-gradient-to-br from-purple-500/[0.10] via-white/[0.035] to-transparent hover:border-purple-400/35"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13]"
                  }`}
                >
                  {credential.verified && (
                    <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-purple-500/[0.12] blur-[80px] transition-colors duration-700 group-hover:bg-purple-500/[0.20]" />
                  )}

                  <div className="relative z-10 p-7 md:p-9 lg:p-11">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-5 md:gap-7">
                        <div className="flex shrink-0 flex-col items-center gap-3">
                          <span className="text-xs font-medium tracking-[0.15em] text-purple-300/70">
                            {credential.number}
                          </span>
                          <span className="h-16 w-px bg-gradient-to-b from-purple-400/40 to-transparent" />
                        </div>

                        <div>
                          <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span
                              className={`rounded-full border px-3 py-1.5 text-[8px] uppercase tracking-[0.22em] ${
                                credential.verified
                                  ? "border-purple-400/25 bg-purple-500/[0.10] text-purple-300/80"
                                  : "border-white/[0.08] bg-white/[0.025] text-white/25"
                              }`}
                            >
                              {credential.type}
                            </span>

                            {credential.verified && (
                              <span className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.2em] text-white/35">
                                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/10 text-[9px] text-purple-300">
                                  ✓
                                </span>
                                Verified
                              </span>
                            )}
                          </div>

                          <h3 className="max-w-4xl text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">
                            {credential.title}
                          </h3>
                          <p className="mt-3 text-sm text-white/40 md:text-base">
                            {credential.subtitle}
                          </p>

                          {credential.href && (
                            <a
                              href={credential.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-purple-300/70 transition-colors hover:text-purple-200"
                            >
                              View credential <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="grid shrink-0 gap-5 border-t border-white/[0.07] pt-6 sm:grid-cols-2 lg:min-w-[330px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">Issuer</p>
                          <p className="mt-2 text-sm text-white/55">{credential.issuer}</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                            {/\d/.test(credential.date) ? "Issued" : "Status"}
                          </p>
                          <p className="mt-2 text-sm text-white/55">{credential.date}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">Type</p>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/30">
                            {credential.meta}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 z-10 h-px w-0 bg-gradient-to-r from-transparent via-purple-400/70 to-transparent transition-all duration-700 group-hover:w-full" />
                </Spotlight>
              ))}
            </div>

            <Reveal
              y={10}
              delay={0.2}
              className="mt-8 flex flex-col gap-3 border-t border-white/[0.05] pt-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                Verified learning • Continuous growth
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                {pad(credentials.length)} credentials • More learning ahead
              </span>
            </Reveal>
          </div>
        </section>

        {/* =========================================================
            CONTACT
        ========================================================= */}
        <section
          id="contact"
          className="relative z-10 px-6 py-32 md:px-10 lg:px-14 lg:py-44"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <Label n="06">Contact</Label>

                <MaskLines
                  lines={[
                    "Let's build",
                    "something",
                    <span
                      key="i"
                      className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent"
                    >
                      intelligent.
                    </span>,
                  ]}
                  className="max-w-4xl text-[clamp(3.5rem,7vw,8rem)] font-semibold leading-[0.86] tracking-[-0.08em]"
                />

                <Reveal
                  as="p"
                  delay={0.1}
                  className="mt-9 max-w-xl text-sm leading-7 text-white/35 md:text-base"
                >
                  Have an idea, project or opportunity? I'd be happy to connect and explore what we
                  can build together.
                </Reveal>

                <Reveal
                  delay={0.15}
                  className="mt-9 max-w-xl overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025]"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <span className="text-[8px] uppercase tracking-[0.24em] text-purple-300/60">
                      Live dispatch mode
                    </span>
                    <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-300" />
                      Ready
                    </span>
                  </div>
                  <pre className="overflow-x-auto px-5 py-5 text-[10px] leading-6 text-white/35">{`if (idea) {
  build(idea)
  iterate()
  ship()
}`}</pre>
                </Reveal>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL SIGNATURE
        ========================================================= */}
        <section
          aria-label="Ashish"
          className="relative z-10 overflow-hidden border-t border-white/[0.06] px-6 pt-24 md:px-10 lg:px-14 lg:pt-32"
        >
          <div className="mx-auto max-w-[1500px]">
            <Reveal y={30}>
              <p className="mb-6 text-[9px] uppercase tracking-[0.32em] text-white/20">
                End of the journey
              </p>
              <h2
                className="select-none whitespace-nowrap text-center text-[clamp(5rem,19vw,19rem)] font-semibold leading-[0.72] tracking-[-0.1em] text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.16)" }}
              >
                ASHISH
              </h2>
            </Reveal>
          </div>
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 md:px-10 lg:px-14">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-[9px] uppercase tracking-[0.22em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Ashish Kumar</span>
            <span>AI & Software Developer</span>
            <a href="#home" className="transition-colors hover:text-white/60">
              Back to top ↑
            </a>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}

export default function Root() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
