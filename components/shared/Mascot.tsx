
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Mascot({ emotion = 'happy', message = '' }: { emotion?: 'happy' | 'excited' | 'neutral' | 'thinking', message?: string }) {
    const [currentMessage, setCurrentMessage] = useState(message);

    useEffect(() => {
        if (message) setCurrentMessage(message);
    }, [message]);

    // Animations for the blob body
    const variants = {
        neutral: { scale: 1, rotate: 0, borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%"] },
        happy: { scale: 1.1, rotate: [0, -5, 5, 0], borderRadius: ["50%", "45%", "50%"], transition: { repeat: Infinity, duration: 2 } },
        excited: { scale: [1, 1.2, 1], rotate: [0, -10, 10, -10, 10, 0], borderRadius: "40%", transition: { repeat: Infinity, duration: 0.5 } },
        thinking: { scale: 1, rotate: 0, borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 60% 40% / 60% 30% 70% 40%"] }
    };

    const eyeVariants = {
        neutral: { scaleY: 1 },
        happy: { scaleY: 0.5, scaleX: 1.2 }, // Squint
        excited: { scaleY: 1.5, scaleX: 1.2 }, // Wide eyes
        thinking: { scaleY: 1, translateX: 5 } // Look side
    };

    return (
        <div className="relative flex items-center justify-center w-40 h-40">
            {/* Speech Bubble */}
            {currentMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute -top-16 bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow-lg border border-gray-100 min-w-[150px] z-20"
                >
                    <p className="text-sm font-bold text-gray-700 text-center">{currentMessage}</p>
                </motion.div>
            )}

            {/* Body */}
            <motion.div
                className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 shadow-xl shadow-purple-500/30 relative flex items-center justify-center"
                variants={variants}
                animate={emotion}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
                {/* Eyes */}
                <div className="flex gap-4 mb-2">
                    <motion.div variants={eyeVariants} animate={emotion} className="w-3 h-3 bg-white rounded-full shadow-sm" />
                    <motion.div variants={eyeVariants} animate={emotion} className="w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
                {/* Mouth */}
                <motion.div
                    className="absolute bottom-6 w-4 h-2 bg-white/50 rounded-full"
                    animate={{ width: emotion === 'happy' ? '1.5rem' : '0.5rem', height: emotion === 'excited' ? '1rem' : '0.3rem' }}
                />
            </motion.div>

            {/* Shadow */}
            <div className="absolute bottom-4 w-16 h-2 bg-black/10 rounded-full blur-sm" />
        </div>
    );
}
