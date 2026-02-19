import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, Calendar, Trophy, Users, Compass, Sparkles, Map, Send, Zap, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


export function NavigationBar() {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const sections = ['home', 'what-is-launchpad', 'overview', 'why-different', 'curriculum', 'journey', 'outcomes', 'belief', 'gamification', 'application'];

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -40% 0px', // Wider margin for better tracking
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Resilient Observation: Retry until all sections are found
        let observedCount = 0;
        const observedIds = new Set();

        const observeSections = () => {
            sections.forEach((id) => {
                if (observedIds.has(id)) return;
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element);
                    observedIds.add(id);
                    observedCount++;
                }
            });

            if (observedCount >= sections.length) {
                clearInterval(retryInterval);
            }
        };

        const retryInterval = setInterval(observeSections, 1000);
        observeSections(); // Initial attempt

        // Special case for home section at the very top
        const handleInitialPosition = () => {
            if (window.scrollY < 100) {
                setActiveSection('home');
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleInitialPosition);

        handleScroll();
        handleInitialPosition();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleInitialPosition);
            observer.disconnect();
            clearInterval(retryInterval);
        };
    }, []);

    const navLinks = [
        { label: 'About', href: '#what-is-launchpad' },
        { label: 'Program', href: '#overview' },
        { label: 'Curriculum', href: '#curriculum' },
        { label: 'Outcomes', href: '#outcomes' },
    ];

    const dockItems = [
        { id: 'home', sectionId: 'home', icon: Home, label: 'Home', onClick: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'about', sectionId: 'what-is-launchpad', icon: Sparkles, label: 'About', onClick: () => document.getElementById('what-is-launchpad')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'paths', sectionId: 'overview', icon: Compass, label: 'Paths', onClick: () => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'diff', sectionId: 'why-different', icon: Zap, label: 'Why Us', onClick: () => document.getElementById('why-different')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'skills', sectionId: 'curriculum', icon: Cpu, label: 'Skills', onClick: () => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'journey', sectionId: 'journey', icon: Map, label: 'Journey', onClick: () => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'results', sectionId: 'outcomes', icon: Trophy, label: 'Results', onClick: () => document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'apply', sectionId: 'application', icon: Send, label: 'Apply', onClick: () => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' }) },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
            style={{
                background: isScrolled
                    ? 'linear-gradient(180deg, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.85) 100%)'
                    : 'linear-gradient(180deg, rgba(10, 15, 30, 0.6) 0%, transparent 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <h1 className="brand-name flex items-center">
                            <span className="brand-launch text-2xl lg:text-3xl">
                                LAUNCHP<span className="rocket-icon" aria-label="A"></span>D
                            </span>
                        </h1>
                    </motion.div>

                    {/* Desktop Navigation - Premium Glassmorphism Dock */}
                    <motion.div
                        className="hidden md:flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-3 rounded-full"
                            style={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {dockItems.map((item, index) => {
                                const isActive = activeSection === item.sectionId;
                                const isHovered = hoveredItem === item.id;
                                const IconComponent = item.icon;

                                return (
                                    <motion.div
                                        key={item.id}
                                        className="relative"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 * index }}
                                    >
                                        <motion.button
                                            onClick={item.onClick}
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden"
                                            style={{
                                                background: isActive
                                                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)'
                                                    : isHovered
                                                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
                                                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                                border: isActive
                                                    ? '1px solid rgba(59, 130, 246, 0.5)'
                                                    : isHovered
                                                        ? '1px solid rgba(255, 255, 255, 0.3)'
                                                        : '1px solid rgba(255, 255, 255, 0.1)',
                                                boxShadow: isActive
                                                    ? '0 0 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                                    : isHovered
                                                        ? '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                                                        : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IconComponent
                                                className="w-5 h-5 transition-colors duration-300"
                                                style={{
                                                    color: isActive ? '#60a5fa' : isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'
                                                }}
                                            />

                                            {/* Active indicator dot */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-blue-400"
                                                    layoutId="activeIndicator"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </motion.button>

                                        {/* Premium Tooltip */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap z-50"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
                                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                                                        fontSize: '12px',
                                                        fontWeight: 500,
                                                        color: '#ffffff',
                                                        letterSpacing: '0.02em'
                                                    }}
                                                >
                                                    {item.label}
                                                    {/* Tooltip arrow */}
                                                    <div
                                                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                                                        style={{
                                                            borderLeft: '6px solid transparent',
                                                            borderRight: '6px solid transparent',
                                                            borderTop: '6px solid rgba(30, 41, 59, 0.95)'
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden"
                        style={{
                            background: 'linear-gradient(180deg, rgba(10, 15, 30, 0.98) 0%, rgba(10, 15, 30, 0.95) 100%)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {dockItems.map((item, index) => {
                                const IconComponent = item.icon;
                                const isActive = activeSection === item.sectionId;
                                return (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.03 * index }}
                                        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-colors text-left"
                                        style={{
                                            background: isActive
                                                ? 'linear-gradient(rgba(10, 15, 30, 0.95), rgba(10, 15, 30, 0.95)) padding-box, linear-gradient(135deg, #B1122C 0%, #00A9FF 100%) border-box'
                                                : 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid transparent',
                                            minHeight: '48px',
                                        }}
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setTimeout(() => {
                                                item.onClick();
                                            }, 100);
                                        }}
                                    >
                                        <IconComponent
                                            size={18}
                                            style={{ color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)', flexShrink: 0 }}
                                        />
                                        <span style={{ color: isActive ? '#FFFFFF' : '#cbd5e1', fontWeight: isActive ? 600 : 400, fontSize: '15px' }}>
                                            {item.label}
                                        </span>
                                    </motion.button>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-2"
                            >
                                <Button
                                    className="w-full py-3 font-medium text-white rounded-xl"
                                    style={{
                                        background: 'linear-gradient(135deg, #B1122C 0%, #B1122C 30%, #FF3A4A 55%, #00A9FF 80%, #00A9FF 100%)',
                                        border: 'none',
                                        minHeight: '48px',
                                    }}
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setTimeout(() => {
                                            document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                >
                                    Apply Now
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
