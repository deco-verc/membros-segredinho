'use client';

import { motion } from 'framer-motion';
import { Target, TrendingDown, Scale } from 'lucide-react';

interface ProgressCardProps {
    userId: string;
    pesoInicial: number;
    meta: number; // KGs to lose or target weight
    pesoAtual: number;
}

export default function ProgressCard({ pesoInicial, meta, pesoAtual }: ProgressCardProps) {
    // Assuming meta is "KGs to lose" from the quiz (e.g., 10kg), so target = pesoInicial - meta
    // OR if meta is target weight directly. Let's assume meta is KEY "metaKg" (kgs to lose) 
    // based on the quiz structure 'metaKg: number'.

    const pesoMeta = pesoInicial - meta;
    const totalPerder = pesoInicial - pesoMeta;
    const jaPerdeu = pesoInicial - pesoAtual;
    const progresso = Math.min(Math.max((jaPerdeu / totalPerder) * 100, 0), 100);

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingDown className="text-green-500" />
                    Sua Evolução
                </h2>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {progresso.toFixed(0)}% da meta
                </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden mb-8">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progresso}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex justify-center items-center gap-1">
                        <Scale size={12} /> Início
                    </p>
                    <p className="text-lg font-bold text-gray-900">{pesoInicial}kg</p>
                </div>

                <div className="p-3 bg-green-50 rounded-xl border border-green-100 transform scale-105 shadow-sm">
                    <p className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold flex justify-center items-center gap-1">
                        Atual
                    </p>
                    <p className="text-2xl font-bold text-green-700">{pesoAtual}kg</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex justify-center items-center gap-1">
                        <Target size={12} /> Meta
                    </p>
                    <p className="text-lg font-bold text-gray-900">{pesoMeta}kg</p>
                </div>
            </div>
        </div>
    );
}
