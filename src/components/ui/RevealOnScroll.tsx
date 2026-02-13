import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface RevealOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function RevealOnScroll({
    children,
    className = "",
    delay = 0.1,
    direction = 'up'
}: RevealOnScrollProps) {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
            x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
