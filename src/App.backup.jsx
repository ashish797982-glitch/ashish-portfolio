import { useEffect, useState } from "react";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";



const heroWords = [

  "AI & SOFTWARE DEVELOPER",

  "AI APPLICATION BUILDER",

  "INTELLIGENT SYSTEMS",

  "BACKEND ENGINEER",

];



const technologies = [

  "Python",

  "Java",

  "JavaScript",

  "SQL",

  "Gemini",

  "Ollama",

  "LLMs",

  "RAG",

  "Embeddings",

  "AI Agents",

  "FastAPI",

  "Flask",

  "REST APIs",

  "SQLite",

  "PostgreSQL",

  "Alembic",

  "JWT",

  "Android",

  "Android Studio",

  "Git",

  "GitHub",

  "Twilio",

  "ngrok",

];



const roadmap = [

  {

    number: "01",

    title: "Understand",

    description:

      "Break an idea into a clear problem, user need and technical direction.",

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



const projects = [

  {

    number: "01",

    category: "PERSONAL AI ASSISTANT",

    title: "ASTRA",

    shortTitle: "Personal AI Assistant",

    description:

      "A personal AI assistant designed around conversational intelligence, persistent context, semantic memory, retrieval and tool orchestration.",

    technologies: [

      "Python",

      "FastAPI",

      "Ollama",

      "Gemini",

      "SQLite",

      "Android",

    ],

  },

  {

    number: "02",

    category: "CONVERSATIONAL AI",

    title: "VEYRA",

    shortTitle: "AI Character Platform",

    description:

      "An AI character and conversational platform combining a mobile interface with a structured backend, authentication and persistent data.",

    technologies: [

      "FastAPI",

      "PostgreSQL",

      "Gemini",

      "JWT",

      "Alembic",

      "Android",

    ],

  },

  {

    number: "03",

    category: "VOICE AI",

    title: "AI ACADEMIC + WELLBEING CALL BOT",

    shortTitle: "Voice AI Application",

    description:

      "A voice AI application connecting telephony, speech processing, crisis detection, local AI inference and conversational responses.",

    technologies: [

      "Python",

      "Flask",

      "Ollama",

      "Twilio",

      "SQLite",

      "ngrok",

    ],

  },

];



const credentials = [
  {
    number: "01",
    type: "VERIFIED CREDENTIAL",
    title: "Unlocking AI for Everyone",
    subtitle: "Beginner 2",
    issuer: "Microsoft • NCVET",
    date: "06 AUG 2026",
    meta: "Skill Competency Certificate",
    verified: true,
  },
  {
    number: "02",
    type: "COMING SOON",
    title: "Credential to be added",
    subtitle: "Verified credential",
    issuer: "Details will be added when verified",
    date: "—",
    meta: "Future credential",
    verified: false,
  },
  {
    number: "03",
    type: "COMING SOON",
    title: "Credential to be added",
    subtitle: "Verified credential",
    issuer: "Details will be added when verified",
    date: "—",
    meta: "Future credential",
    verified: false,
  },
];



function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [heroIndex, setHeroIndex] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.22], [0, -70]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.96]);
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.72]);
  const heroGlowY = useTransform(scrollYProgress, [0, 0.22], [0, -45]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.2], [0, -28]);




  useEffect(() => {

    const timer = setInterval(() => {

      setHeroIndex((current) => (current + 1) % heroWords.length);

    }, 2600);



    return () => clearInterval(timer);

  }, []);



  const closeMenu = () => setMenuOpen(false);



  return (

    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">

      {/* =========================================================

          GLOBAL BACKGROUND

      ========================================================= */}



      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <motion.div

          animate={{

            opacity: [0.7, 0.95, 0.7],

            scale: [1, 1.06, 1],

          }}

          transition={{

            duration: 9,

            repeat: Infinity,

            ease: "easeInOut",

          }}

          className="absolute left-1/2 top-[-20%] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-purple-700/10 blur-[150px]"

        />



        <motion.div

          animate={{

            opacity: [0.45, 0.7, 0.45],

            x: [0, -25, 0],

          }}

          transition={{

            duration: 12,

            repeat: Infinity,

            ease: "easeInOut",

          }}

          className="absolute right-[-15%] top-[30%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.06] blur-[140px]"

        />



        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.04] blur-[150px]" />

      </div>



      {/* =========================================================

          NAVIGATION

      ========================================================= */}



      <nav className="fixed left-0 right-0 top-0 z-50">

        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">

          <motion.a

            href="#home"

            initial={{ opacity: 0, y: -15 }}

            animate={{ opacity: 1, y: 0 }}

            className="relative z-50 text-xl font-semibold tracking-[-0.06em]"

          >

            AK<span className="text-purple-400">.</span>

          </motion.a>



          <div className="hidden items-center gap-7 rounded-full border border-white/[0.08] bg-black/30 px-6 py-3 backdrop-blur-xl md:flex">

            {[

              ["About", "#about"],

              ["Technologies", "#technologies"],

              ["Roadmap", "#roadmap"],

              ["Work", "#work"],

              ["Credentials", "#credentials"],

              ["Contact", "#contact"],

            ].map(([label, href]) => (

              <a

                key={label}

                href={href}

                className="text-[11px] uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 hover:text-white"

              >

                {label}

              </a>

            ))}

          </div>



          <a

            href="#contact"

            className="hidden rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/10 md:block"

          >

            Let's Talk

          </a>



          <button

            onClick={() => setMenuOpen(!menuOpen)}

            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"

            aria-label="Open navigation"

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

                {[

                  ["About", "#about"],

                  ["Technologies", "#technologies"],

                  ["Roadmap", "#roadmap"],

                  ["Work", "#work"],

                  ["Credentials", "#credentials"],

                  ["Contact", "#contact"],

                ].map(([label, href]) => (

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
      ========================================================= */}

      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 md:px-10 lg:px-14"
      >
        <motion.div
          style={{ y: heroGlowY }}
          className="pointer-events-none absolute left-[42%] top-[12%] h-[520px] w-[520px] rounded-full bg-purple-600/[0.08] blur-[150px]"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="mx-auto w-full max-w-[1500px]">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div style={{ y: heroContentY }} className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-7 flex items-center gap-3"
              >
                <span className="h-px w-10 bg-purple-400" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-purple-300/70">
                  Welcome to my portfolio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.05,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-5xl text-[clamp(3.5rem,8vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.085em]"
              >
                Building
                <br />
                <span className="text-white/20">intelligent</span>
                <br />
                <span className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
                  software.
                </span>
              </motion.h1>

              <div className="mt-10 h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroWords[heroIndex]}
                    initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -28, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-xs font-medium tracking-[0.28em] text-white/55"
                  >
                    {heroWords[heroIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-5 max-w-xl text-sm leading-7 text-white/40 md:text-base"
              >
                I build AI-powered applications, intelligent assistants and
                practical software systems by combining modern AI models with
                backend engineering and user-focused interfaces.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <a
                  href="#work"
                  className="group rounded-full bg-white px-6 py-3 text-xs font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-purple-100"
                >
                  Explore my work
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#contact"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-xs text-white/70 transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-500/[0.07] hover:text-white"
                >
                  Let's connect
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.15,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <motion.div
                style={{
                  y: heroGlowY,
                  scale: heroImageScale,
                  opacity: heroImageOpacity,
                }}
                className="pointer-events-none absolute inset-6 rounded-full bg-purple-500/20 blur-[110px]"
              />

              <motion.div
                style={{
                  y: heroImageY,
                  scale: heroImageScale,
                  opacity: heroImageOpacity,
                }}
                className="relative"
              >
                <div className="absolute -inset-5 rounded-[3rem] border border-purple-400/[0.05]" />
                <div className="absolute -inset-2 rounded-[2.8rem] bg-gradient-to-br from-purple-400/[0.08] via-transparent to-indigo-500/[0.04] blur-sm" />

                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.09] bg-gradient-to-b from-white/[0.08] to-white/[0.015] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.55)] md:p-4">
                  <div className="relative overflow-hidden rounded-[2rem] bg-[#101010]">
                    <motion.img
                      src="/profile.png"
                      alt="Ashish Kumar"
                      className="h-[500px] w-full object-cover object-top sm:h-[620px]"
                      whileHover={{ scale: 1.025 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/[0.08] via-transparent to-transparent mix-blend-screen" />

                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(196,181,253,0.8)]" />
                      <span className="text-[8px] uppercase tracking-[0.25em] text-white/45">
                        Available for ideas
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                          Currently building
                        </p>
                        <p className="mt-1 text-sm text-white/80">
                          AI-powered systems
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-xs backdrop-blur-md">
                        ↗
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-16 flex items-center justify-between border-t border-white/[0.07] pt-5"
          >
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
              <span>AI</span>
              <span>Backend</span>
              <span>Voice AI</span>
              <span>Android</span>
            </div>

            <a
              href="#about"
              className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-white"
            >
              <span>Scroll to explore</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================================================

          ABOUT

      ========================================================= */}



      <section

        id="about"

        className="relative px-6 py-32 md:px-10 lg:px-14 lg:py-44"

      >

        <div className="mx-auto max-w-[1500px]">

          <motion.div

            initial={{ opacity: 0, y: 30 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{ duration: 0.8 }}

          >

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-8 bg-purple-400" />



              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/60">

                01 — About

              </span>

            </div>



            <h2 className="max-w-6xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.075em]">

              Building with{" "}

              <span className="text-white/25">curiosity.</span>

              <br />

              Engineering with{" "}

              <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">

                purpose.

              </span>

            </h2>

          </motion.div>



          <div className="mt-20 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">

            <motion.div

              initial={{ opacity: 0, x: -30 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

              transition={{ duration: 0.8 }}

            >

              <p className="max-w-3xl text-xl leading-9 text-white/65 md:text-2xl md:leading-10">

                I'm an AI & Software Developer focused on building practical

                applications that combine artificial intelligence, backend

                engineering and modern user experiences.

              </p>



              <p className="mt-8 max-w-2xl text-sm leading-8 text-white/35 md:text-base">

                I enjoy turning ideas into working software — from AI

                assistants and conversational systems to voice AI applications,

                backend APIs and Android applications.

              </p>



              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/35 md:text-base">

                My current work explores LLMs, AI memory, retrieval,

                automation, conversational AI and the engineering required to

                connect these technologies into usable products.

              </p>

            </motion.div>



            <motion.div

              initial={{ opacity: 0, x: 30 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

              transition={{ duration: 0.8 }}

              className="grid gap-3 sm:grid-cols-2"

            >

              {[

                ["AI", "Applications"],

                ["Backend", "Systems"],

                ["Voice", "AI"],

                ["Android", "Applications"],

              ].map(([first, second]) => (

                <div

                  key={first}

                  className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-purple-400/20"

                >

                  <span className="text-2xl font-medium tracking-[-0.05em]">

                    {first}

                  </span>



                  <p className="mt-1 text-sm text-white/30">{second}</p>

                </div>

              ))}

            </motion.div>

          </div>

        </div>

      </section>



      {/* =========================================================

          TECHNOLOGIES

      ========================================================= */}



      <section

        id="technologies"

        className="relative border-y border-white/[0.05] px-6 py-28 md:px-10 lg:px-14"

      >

        <div className="mx-auto max-w-[1500px]">

          <motion.div

            initial={{ opacity: 0, y: 25 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

          >

            <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-purple-300/60">

              02 — Technologies

            </div>



            <h2 className="text-[clamp(2.7rem,5vw,5.5rem)] font-semibold tracking-[-0.07em]">

              Technologies I work with.

            </h2>

          </motion.div>



          <div className="mt-14 flex flex-wrap gap-2.5">

            {technologies.map((technology, index) => (

              <motion.span

                key={technology}

                initial={{ opacity: 0, y: 12 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{

                  duration: 0.35,

                  delay: Math.min(index * 0.025, 0.5),

                }}

                className="rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-xs text-white/45 transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-500/[0.06] hover:text-white"

              >

                {technology}

              </motion.span>

            ))}

          </div>

        </div>

      </section>



      {/* =========================================================

          ROADMAP

      ========================================================= */}



      <section

        id="roadmap"

        className="relative px-6 py-32 md:px-10 lg:px-14 lg:py-44"

      >

        <div className="mx-auto max-w-[1500px]">

          <motion.div

            initial={{ opacity: 0, y: 25 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

          >

            <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-purple-300/60">

              03 — Execution

            </div>



            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">

              Core execution

              <br />

              <span className="text-white/25">roadmap.</span>

            </h2>

          </motion.div>



          <div className="mt-20 grid gap-3 md:grid-cols-2 xl:grid-cols-4">

            {roadmap.map((item) => (

              <motion.div

                key={item.number}

                initial={{ opacity: 0, y: 35 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{ duration: 0.65 }}

                whileHover={{ y: -7 }}

                className="group min-h-[330px] rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-7 transition-colors duration-500 hover:border-purple-400/20"

              >

                <div className="flex items-start justify-between">

                  <span className="text-xs text-purple-300/60">

                    {item.number}

                  </span>



                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">

                    {item.meta}

                  </span>

                </div>



                <div className="mt-28">

                  <h3 className="text-2xl font-medium tracking-[-0.04em]">

                    {item.title}

                  </h3>



                  <p className="mt-4 text-sm leading-7 text-white/35">

                    {item.description}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>



      {/* =========================================================

          PROJECTS — CINEMATIC SHOWCASE

      ========================================================= */}



      <section

        id="work"

        className="relative px-6 py-32 md:px-10 lg:px-14 lg:py-44"

      >

        <div className="mx-auto max-w-[1500px]">

          <motion.div

            initial={{ opacity: 0, y: 25 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

          >

            <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-purple-300/60">

              04 — Selected Work

            </div>



            <h2 className="max-w-5xl text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">

              Featured engineering

              <br />

              <span className="text-white/25">projects.</span>

            </h2>



            <p className="mt-8 max-w-xl text-sm leading-7 text-white/30 md:text-base">

              A selection of AI, backend and voice systems built by turning

              ideas into working software.

            </p>

          </motion.div>



          <div className="mt-20 space-y-5">

            {projects.map((project, index) => (

              <motion.article

                key={project.title}

                initial={{ opacity: 0, y: 45 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, margin: "-80px" }}

                transition={{

                  duration: 0.8,

                  delay: index * 0.08,

                }}

                whileHover={{ y: -5 }}

                className="group relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-br from-white/[0.045] via-white/[0.018] to-transparent transition-all duration-500 hover:border-purple-400/25"

              >

                {/* Ambient project glow */}



                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-500/[0.06] blur-[100px] transition-all duration-700 group-hover:bg-purple-500/[0.14]" />



                <div className="pointer-events-none absolute bottom-0 left-[25%] h-40 w-96 rounded-full bg-violet-500/[0.025] blur-[100px] transition-all duration-700 group-hover:bg-violet-500/[0.07]" />



                <div className="relative p-7 md:p-10 lg:p-12">

                  {/* Top line */}



                  <div className="flex items-start justify-between gap-6">

                    <div className="flex items-center gap-4">

                      <span className="text-xs font-medium tracking-[0.15em] text-purple-300/70">

                        {project.number}

                      </span>



                      <span className="h-px w-8 bg-white/10" />



                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">

                        {project.category}

                      </span>

                    </div>



                    <span className="hidden text-[9px] uppercase tracking-[0.25em] text-white/20 md:block">

                      Engineering project

                    </span>

                  </div>



                  {/* Main project content */}



                  <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">

                    <div>

                      <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-purple-300/45">

                        {project.shortTitle}

                      </p>



                      <h3 className="max-w-4xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.82] tracking-[-0.075em] transition-transform duration-500 group-hover:translate-x-1">

                        {project.title}

                      </h3>

                    </div>



                    <div>

                      <p className="max-w-xl text-sm leading-7 text-white/40 md:text-base md:leading-8">

                        {project.description}

                      </p>

                    </div>

                  </div>



                  {/* Bottom information */}



                  <div className="mt-12 flex flex-col gap-7 border-t border-white/[0.07] pt-7 md:flex-row md:items-end md:justify-between">

                    <div className="flex max-w-3xl flex-wrap gap-2">

                      {project.technologies.map((technology) => (

                        <span

                          key={technology}

                          className="rounded-full border border-white/[0.07] bg-white/[0.02] px-3.5 py-2 text-[9px] uppercase tracking-[0.08em] text-white/35 transition-all duration-300 group-hover:border-purple-400/15 group-hover:text-white/50"

                        >

                          {technology}

                        </span>

                      ))}

                    </div>



                    <button

                      type="button"

                      className="group/button flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-white/45 transition-colors duration-300 hover:text-white"

                    >

                      <span>View project</span>



                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover/button:border-purple-400/40 group-hover/button:bg-purple-500/10 group-hover/button:text-purple-300">

                        <span className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5">

                          ↗

                        </span>

                      </span>

                    </button>

                  </div>

                </div>



                {/* Hover border accent */}



                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-purple-400/70 to-transparent transition-all duration-700 group-hover:w-full" />

              </motion.article>

            ))}

          </div>



          {/* Projects closing statement */}



          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            viewport={{ once: true }}

            className="mt-10 flex items-center justify-between border-t border-white/[0.05] pt-5"

          >

            <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">

              AI • Backend • Voice • Mobile

            </span>



            <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">

              03 Selected Systems

            </span>

          </motion.div>

        </div>

      </section>



            {/* =========================================================
          CREDENTIALS
      ========================================================= */}

      <section
        id="credentials"
        className="relative overflow-hidden border-y border-white/[0.05] px-6 py-32 md:px-10 lg:px-14 lg:py-40"
      >
        <div className="pointer-events-none absolute left-1/3 top-1/4 h-[420px] w-[420px] rounded-full bg-purple-600/[0.07] blur-[150px]" />
        <div className="pointer-events-none absolute right-[-8%] bottom-[-12%] h-[380px] w-[380px] rounded-full bg-violet-500/[0.05] blur-[140px]" />

        <div className="relative mx-auto max-w-[1500px]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-purple-300/60">
              <span className="h-px w-8 bg-purple-400" />
              05 — Credentials
            </div>

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <h2 className="max-w-5xl text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                Learning never
                <br />
                <span className="text-white/25">stops.</span>
              </h2>

              <p className="max-w-sm text-sm leading-7 text-white/30 md:text-base">
                A growing record of verified learning and credentials that
                support the systems I build.
              </p>
            </div>
          </motion.div>

          <div className="mt-20 space-y-3">
            {credentials.map((credential, index) => (
              <motion.article
                key={credential.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 ${
                  credential.verified
                    ? "border-purple-400/20 bg-gradient-to-br from-purple-500/[0.10] via-white/[0.035] to-transparent hover:border-purple-400/35"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13]"
                }`}
              >
                {credential.verified && (
                  <>
                    <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-purple-500/[0.12] blur-[100px] transition-all duration-700 group-hover:bg-purple-500/[0.20]" />
                    <div className="pointer-events-none absolute bottom-0 left-1/4 h-32 w-96 rounded-full bg-violet-500/[0.06] blur-[90px]" />
                  </>
                )}

                <div className="relative p-7 md:p-9 lg:p-11">
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
                      </div>
                    </div>

                    <div className="grid shrink-0 gap-5 border-t border-white/[0.07] pt-6 sm:grid-cols-2 lg:min-w-[330px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                          Issuer
                        </p>
                        <p className="mt-2 text-sm text-white/55">
                          {credential.issuer}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                          {credential.verified ? "Issued" : "Status"}
                        </p>
                        <p className="mt-2 text-sm text-white/55">
                          {credential.date}
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                          Type
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/30">
                          {credential.meta}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-purple-400/70 to-transparent transition-all duration-700 group-hover:w-full" />
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 border-t border-white/[0.05] pt-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
              Verified learning • Continuous growth
            </span>

            <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
              Additional credentials will be added when verified
            </span>
          </motion.div>
        </div>
      </section>

{/* =========================================================

          CONTACT

      ========================================================= */}



      <section

        id="contact"

        className="relative px-6 py-32 md:px-10 lg:px-14 lg:py-44"

      >

        <div className="mx-auto max-w-[1500px]">

          <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr]">

            <motion.div

              initial={{ opacity: 0, x: -30 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

            >

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-8 bg-purple-400" />



                <span className="text-[10px] uppercase tracking-[0.3em] text-purple-300/60">

                  06 — Contact

                </span>

              </div>



              <h2 className="max-w-4xl text-[clamp(3.5rem,7vw,8rem)] font-semibold leading-[0.82] tracking-[-0.08em]">

                Let's build

                <br />

                something

                <br />

                <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">

                  intelligent.

                </span>

              </h2>



              <p className="mt-9 max-w-xl text-sm leading-7 text-white/35 md:text-base">

                Have an idea, project or opportunity? I'd be happy to connect

                and explore what we can build together.

              </p>

            </motion.div>



            <motion.div

              initial={{ opacity: 0, x: 30 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

              className="rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-7 md:p-9"

            >

              <div className="space-y-5">

                <div>

                  <label className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/25">

                    Name

                  </label>



                  <input

                    type="text"

                    placeholder="Your name"

                    className="w-full rounded-2xl border border-white/[0.07] bg-black/20 px-5 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-purple-400/30"

                  />

                </div>



                <div>

                  <label className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/25">

                    Email

                  </label>



                  <input

                    type="email"

                    placeholder="you@example.com"

                    className="w-full rounded-2xl border border-white/[0.07] bg-black/20 px-5 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-purple-400/30"

                  />

                </div>



                <div>

                  <label className="mb-2 block text-[9px] uppercase tracking-[0.25em] text-white/25">

                    Message

                  </label>



                  <textarea

                    rows="6"

                    placeholder="Tell me about your idea..."

                    className="w-full resize-none rounded-2xl border border-white/[0.07] bg-black/20 px-5 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-purple-400/30"

                  />

                </div>



                <button

                  type="button"

                  className="w-full rounded-2xl bg-white py-4 text-xs font-medium text-black transition-transform duration-300 hover:scale-[1.02]"

                >

                  Send message →

                </button>

              </div>

            </motion.div>

          </div>

        </div>

      </section>



      {/* =========================================================

          FOOTER

      ========================================================= */}



      <footer className="border-t border-white/[0.06] px-6 py-8 md:px-10 lg:px-14">

        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-[9px] uppercase tracking-[0.22em] text-white/20 sm:flex-row sm:items-center sm:justify-between">

          <span>© {new Date().getFullYear()} Ashish Kumar</span>



          <span>AI & Software Developer</span>



          <a

            href="#home"

            className="transition-colors hover:text-white/60"

          >

            Back to top ↑

          </a>

        </div>

      </footer>

    </main>

  );

}



export default App;