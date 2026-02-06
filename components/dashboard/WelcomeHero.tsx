'use client';

import { motion } from 'framer-motion';
import { Calendar, Flame } from 'lucide-react';

interface WelcomeHeroProps {
    nome: string;
    diasAtivos: number;
    streak: number;
}

export default function WelcomeHero({ nome, diasAtivos, streak }: WelcomeHeroProps) {
    // Get time of day greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

    return (
        <div className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full opacity-50 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-20 w-32 h-32 bg-emerald-50 rounded-full opacity-60 translate-y-1/2 blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-gray-900 mb-2"
                    >
                        {greeting}, <span className="text-green-600">{nome}</span>! ✨
                    </motion.h1>
                    <p className="text-gray-500 text-lg">
                        Hoje é um ótimo dia para cuidar de você.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Days Active Badge */}
                    <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl text-blue-700 border border-blue-100">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Calendar size={20} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Dias no Foco</p>
                            <p className="text-xl font-bold">{diasAtivos}</p>
                        </div>
                    </div>

                    {/* Streak Badge */}
                    <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl text-orange-700 border border-orange-100">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                            <Flame size={20} className="text-orange-500 fill-orange-500" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-orange-400">Sequência</p>
                            <p className="text-xl font-bold">{streak} dias</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
