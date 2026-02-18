import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Linkedin, Github, Globe, Sparkles, Users, Target, Rocket, Zap, Award } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Alex Javed',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjAxNjA0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  },
  {
    name: 'Jenny William',
    role: 'Chief Operations',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDc2Mjg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  },
  {
    name: 'Alex Joseph',
    role: 'Head of Data',
    image: 'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjAxNTU4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  },
  {
    name: 'Jessica Lauren',
    role: 'Marketing Lead',
    image: 'https://images.unsplash.com/photo-1610251064409-8d94b0939629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjB3b21hbnxlbnwxfHx8fDE3NjAxOTMwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  },
  {
    name: 'Sarah Chen',
    role: 'Tech Lead',
    image: 'https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDkxNzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  },
  {
    name: 'David Martinez',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NjAxNzY4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  },
  {
    name: 'Emma Rodriguez',
    role: 'Innovation Lead',
    image: 'https://images.unsplash.com/photo-1668112262164-56e782a6e07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZm91bmRlcnxlbnwxfHx8fDE3NjAxMjI3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  },
  {
    name: 'Michael Torres',
    role: 'Design Director',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    links: { linkedin: '#', github: '#', portfolio: '#' }
  }
];

export function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll (0 to 1) to horizontal translation
  // 4 sections = 400vw total, we need to move 300vw (75%) to show all 4
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh]"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Sticky container - stays in view while content scrolls horizontally */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">

        {/* Horizontal track - all 4 slides in a row */}
        <motion.div
          style={{ x }}
          className="flex h-full will-change-transform"
        >

          {/* ═══════════════════════════════════════════════════════════════════
              SLIDE 1: INTRO - "Meet Our Expert Team"
          ═══════════════════════════════════════════════════════════════════ */}
          <div
            className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-16 lg:p-20 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.15),transparent_50%)]" />

            {/* Ghost text */}
            <h2 className="absolute text-[20vw] md:text-[15vw] leading-none font-black tracking-tighter text-white/[0.02] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap">
              EXPERTS
            </h2>

            <div className="relative z-10 max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-violet-500/30 rounded-full bg-violet-950/40 backdrop-blur-md mb-8">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-violet-300 font-mono text-sm tracking-wider uppercase">World Class Talent</span>
                </div>

                {/* Main heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9]">
                  Meet Our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                    Expert Team
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
                  Innovators, researchers, and mentors dedicated to propelling your journey in the Launchpad ecosystem. We don't just guide — we build alongside you.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span className="font-bold text-white">20+</span> Experts
                  </span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                  <span className="flex items-center gap-2 text-slate-300">
                    <Target className="w-5 h-5 text-violet-400" />
                    <span className="font-bold text-white">200+</span> Projects
                  </span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
                  <span className="flex items-center gap-2 text-slate-300">
                    <Award className="w-5 h-5 text-fuchsia-400" />
                    <span className="font-bold text-white">9+</span> Years
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              SLIDE 2: VALUES - "Why Our Team is Different"
          ═══════════════════════════════════════════════════════════════════ */}
          <div
            className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-16 lg:p-20 relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 50%, #083344 100%)' }}
          >
            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl w-full items-center relative z-10">

              {/* Left: Text content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-md mb-6">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300 text-sm font-medium">Our Difference</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Why Our Team <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Is Different?</span>
                </h2>

                <p className="text-lg text-slate-400 leading-relaxed mb-10">
                  We don't just teach; we build alongside you. Our mentors are industry veterans from top tech companies, ensuring you learn best practices that matter in the real world.
                </p>

                <ul className="space-y-5">
                  {['Deep Industry Experience', 'Hands-on Mentorship', 'Global Network Access', '24/7 Support System'].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-4 text-white font-medium group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: Value cards */}
              <motion.div
                className="grid gap-5"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {[
                  { icon: Sparkles, title: 'Innovation', desc: 'Pushing boundaries of what is possible in tech education and career development.', gradient: 'from-violet-500 to-fuchsia-500' },
                  { icon: Target, title: 'Integrity', desc: 'Honest, transparent guidance at every step of your professional journey.', gradient: 'from-cyan-500 to-blue-500' },
                  { icon: Rocket, title: 'Impact', desc: 'Focused on your long-term career success, growth, and industry leadership.', gradient: 'from-orange-500 to-red-500' },
                ].map((value, i) => (
                  <motion.div
                    key={i}
                    className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 transition-all duration-300 hover:bg-white/[0.06] group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-3">{value.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{value.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              SLIDE 3: TEAM ROSTER
          ═══════════════════════════════════════════════════════════════════ */}
          <div
            className="w-screen h-screen flex-shrink-0 flex flex-col justify-center p-8 md:p-16 lg:p-20 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #083344 0%, #0f172a 50%, #1e1b4b 100%)' }}
          >
            {/* Glow effects */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
              {/* Header */}
              <motion.div
                className="text-center mb-8 md:mb-12"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-fuchsia-500/30 rounded-full bg-fuchsia-950/30 backdrop-blur-md mb-4">
                  <Users className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-fuchsia-300 text-sm font-medium">The Roster</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">People</span>
                </h2>
                <p className="text-slate-400 text-lg">The brilliant minds behind your success story</p>
              </motion.div>

              {/* Team grid - compact for horizontal scroll */}
              <div className="grid grid-cols-4 md:grid-cols-4 gap-4 md:gap-5">
                {TEAM_MEMBERS.map((member, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                      {/* Image */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                      />

                      {/* Hover overlay with links */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <a href={member.links.linkedin} className="p-2 bg-white/10 hover:bg-violet-500 rounded-full text-white transition-colors backdrop-blur-sm"><Linkedin size={12} /></a>
                          <a href={member.links.github} className="p-2 bg-white/10 hover:bg-cyan-500 rounded-full text-white transition-colors backdrop-blur-sm"><Github size={12} /></a>
                          <a href={member.links.portfolio} className="p-2 bg-white/10 hover:bg-pink-500 rounded-full text-white transition-colors backdrop-blur-sm"><Globe size={12} /></a>
                        </div>
                      </div>
                    </div>

                    {/* Name & role */}
                    <div className="mt-3 text-center">
                      <h4 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{member.name}</h4>
                      <p className="text-slate-500 text-xs md:text-sm font-medium truncate">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              SLIDE 4: CTA & STATS
          ═══════════════════════════════════════════════════════════════════ */}
          <div
            className="w-screen h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-16 lg:p-20 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)' }}
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.25),transparent_60%)]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="max-w-5xl w-full text-center relative z-10">

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-fuchsia-500/30 rounded-full bg-fuchsia-950/40 backdrop-blur-md mb-8">
                  <Rocket className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-fuchsia-300 font-mono text-sm tracking-wider uppercase">Join Us</span>
                </div>

                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  Ready to scale <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400">
                    your potential?
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed">
                  Join our community of innovators and let us help you build the future you envision. Your journey starts here.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {[
                  { num: '9+', label: 'Years Experience' },
                  { num: '20+', label: 'Expert Mentors' },
                  { num: '200+', label: 'Projects Delivered' },
                  { num: '100%', label: 'Commitment' },
                ].map((stat, i) => (
                  <div key={i} className="text-center group">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-violet-400 transition-all duration-300">
                      {stat.num}
                    </div>
                    <div className="text-sm font-bold tracking-wider text-slate-400 uppercase">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="btn-sweep btn-sweep-strong inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-violet-500/25" style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7, #06b6d4)' }}>
                  <span className="text-white">Join the Team</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>

                <p className="mt-6 text-slate-500 text-sm">No commitment required • Start your journey today</p>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
