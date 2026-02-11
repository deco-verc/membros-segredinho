
'use client';

import { motion } from 'framer-motion';
import { Calendar, Flame } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

interface WelcomeHeroProps {
    nome: string;
    diasAtivos: number;
    streak: number;
}

export default function WelcomeHero({ nome, diasAtivos, streak }: WelcomeHeroProps) {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        setGreeting(hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite');
    }, []);

    // Ensure we don't render greeting until client side to avoid layout shift matching error
    // Simple placeholder or skeleton could be used, but empty string works for now.

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300"
        >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full opacity-50 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none transition-transform group-hover:scale-110 duration-700" />
            <div className="absolute bottom-0 right-20 w-32 h-32 bg-emerald-50 rounded-full opacity-60 translate-y-1/2 blur-xl pointer-events-none transition-transform group-hover:scale-125 duration-700 delay-100" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        {greeting || 'Vencedora'}, <span className="text-green-600 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">{nome}</span>!
                        <motion.span
                            animate={{ rotate: [0, 20, -10, 20, 0] }}
                            transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                            className="inline-block origin-bottom-right"
                        >
                            👋
                        </motion.span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Hoje é um ótimo dia para cuidar de você.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Days Active Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl text-blue-700 border border-blue-100 cursor-help"
                        title="Dias totais desde seu cadastro"
                    >
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Calendar size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400 opacity-80">Dias no Foco</p>
                            <p className="text-xl font-bold leading-none">{diasAtivos}</p>
                        </div>
                    </motion.div>

                    {/* Streak Badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl text-orange-700 border border-orange-100 cursor-help relative overflow-hidden"
                        title="Dias seguidos acessando a plataforma"
                    >
                        <div className="p-2 bg-white rounded-lg shadow-sm z-10">
                            <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
                        </div>
                        <div className="z-10">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400 opacity-80">Sequência</p>
                            <p className="text-xl font-bold leading-none">{streak} dias</p>
                        </div>
                        {/* Inner glow animation */}
                        <div className="absolute inset-0 bg-orange-200/20 blur-xl animate-pulse" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
