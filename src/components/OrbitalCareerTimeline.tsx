import { Lightbulb, Palette, Code, Briefcase, TrendingUp, Rocket, Users, Building2 } from 'lucide-react';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';
import { motion } from 'motion/react';

export function OrbitalCareerTimeline() {
  // 6 nodes alternating: Entrepreneur (red) and Career (blue)
  const timelineData = [
    // 🔴 ENTREPRENEUR - Startup Foundations
    {
      id: 1,
      title: 'Startup Foundations',
      date: 'Entrepreneur Track',
      content: 'Transform your innovative ideas into viable business ventures. Learn lean startup methodology, validate your concepts, develop MVPs, and master the art of pitching to investors. Build the entrepreneurial mindset needed to disrupt industries.',
      category: 'Entrepreneur',
      icon: Rocket,
      relatedIds: [2, 6],
      status: 'completed' as const,
      energy: 95,
    },
    // 🔵 CAREER - Tech & Development
    {
      id: 2,
      title: 'Tech & Development',
      date: 'Career Track',
      content: 'Master modern development stacks and build production-grade applications. Learn full-stack development, cloud infrastructure, AI/ML integration, and DevOps practices that top companies demand from their engineering teams.',
      category: 'Career',
      icon: Code,
      relatedIds: [1, 3],
      status: 'in-progress' as const,
      energy: 90,
    },
    // 🔴 ENTREPRENEUR - Growth & Marketing
    {
      id: 3,
      title: 'Growth & Marketing',
      date: 'Entrepreneur Track',
      content: 'Drive explosive startup growth through strategic marketing. Master viral loops, content strategy, paid acquisition, SEO, and the art of turning users into passionate advocates who fuel your startup\'s organic expansion.',
      category: 'Entrepreneur',
      icon: TrendingUp,
      relatedIds: [2, 4],
      status: 'completed' as const,
      energy: 85,
    },
    // 🔵 CAREER - Creative & Design
    {
      id: 4,
      title: 'Creative & Design',
      date: 'Career Track',
      content: 'Craft compelling brand identities and user experiences that captivate. Master design systems, visual storytelling, UI/UX principles, and create designs that leave lasting impressions and differentiate products in the market.',
      category: 'Career',
      icon: Palette,
      relatedIds: [3, 5],
      status: 'in-progress' as const,
      energy: 80,
    },
    // 🔴 ENTREPRENEUR - Business Operations
    {
      id: 5,
      title: 'Business Operations',
      date: 'Entrepreneur Track',
      content: 'Build scalable business systems and operational excellence. Master financial modeling, team management, supply chain optimization, legal frameworks, and create the infrastructure that supports rapid startup growth.',
      category: 'Entrepreneur',
      icon: Building2,
      relatedIds: [4, 6],
      status: 'completed' as const,
      energy: 75,
    },
    // 🔵 CAREER - Leadership & Management
    {
      id: 6,
      title: 'Leadership & Management',
      date: 'Career Track',
      content: 'Develop executive presence and leadership capabilities. Master team dynamics, strategic planning, stakeholder management, and AI-powered decision making to lead organizations through digital transformation.',
      category: 'Career',
      icon: Users,
      relatedIds: [5, 1],
      status: 'in-progress' as const,
      energy: 70,
    },
  ];

  return (
    <motion.section
      className="bg-slate-950 pt-12 pb-20 md:pt-14 md:pb-28"
      initial={{
        opacity: 0,
        scale: 0.9,
        rotateX: 15,
        filter: "blur(12px)",
        y: 100
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        y: 0
      }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{
        duration: 1.2,
        type: "spring",
        stiffness: 60,
        damping: 20,
        delay: 0.2
      }}
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 100
        }}
      >
        <RadialOrbitalTimeline timelineData={timelineData} />
      </motion.div>
    </motion.section>
  );
}
