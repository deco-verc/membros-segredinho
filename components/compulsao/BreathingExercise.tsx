
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BreathingExercise() {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [text, setText] = useState('Inspire...');

    useEffect(() => {
        const cycle = async () => {
            // Ciclo 4-7-8 (Adaptado para ser mais rápido visualmente: 4-4-6)
            setPhase('inhale');
            setText('Inspire pelo nariz (4s)');
            await new Promise(r => setTimeout(r, 4000));

            setPhase('hold');
            setText('Segure o ar (4s)');
            await new Promise(r => setTimeout(r, 4000));

            setPhase('exhale');
            setText('Solte pela boca (6s)');
            await new Promise(r => setTimeout(r, 6000));

            // Loop handled by parent or infinite here? Let's infinite for now
        };

        const interval = setInterval(cycle, 14000); // 4+4+6 = 14s
        cycle(); // Start immediately

        return () => clearInterval(interval);
    }, []);

    const variants = {
        inhale: { scale: 1.5, opacity: 1, backgroundColor: '#60a5fa' }, // Blue 400
        hold: { scale: 1.5, opacity: 0.8, backgroundColor: '#3b82f6' }, // Blue 500
        exhale: { scale: 1, opacity: 0.6, backgroundColor: '#93c5fd' }, // Blue 300
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative flex items-center justify-center w-64 h-64">
                {/* Círculo pulsante */}
                <motion.div
                    className="w-32 h-32 rounded-full absolute"
                    animate={phase}
                    variants={variants}
                    transition={{ duration: phase === 'inhale' ? 4 : phase === 'hold' ? 0 : 6, ease: "easeInOut" }}
                />
                <span className="relative z-10 text-xl font-bold text-slate-700 pointer-events-none select-none text-center px-4 mix-blend-multiply">
                    {text}
                </span>
            </div>
            <p className="text-gray-500 mt-4 text-sm max-w-xs text-center">
                Siga o ritmo do círculo. Isso acalma o sistema nervoso em segundos.
            </p>
        </div>
    );
}
