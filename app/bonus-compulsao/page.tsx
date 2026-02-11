
'use client';

import { useState } from 'react';
import { Play, Headphones, Heart, AlertCircle, X, BatteryCharging, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Componente inline para evitar arquivos extras de config
const BreathingCircle = () => {
    const [text, setText] = useState('Inspire...');
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <motion.div
                animate={{
                    scale: [1, 1.5, 1.5, 1],
                    opacity: [0.5, 1, 0.8, 0.5],
                    backgroundColor: ["#60a5fa", "#3b82f6", "#2563eb", "#60a5fa"]
                }}
                transition={{
                    duration: 14, // 4 in, 4 hold, 6 out
                    repeat: Infinity,
                    times: [0, 0.28, 0.57, 1] // Proporção do tempo
                }}
                className="w-40 h-40 rounded-full bg-blue-400 flex items-center justify-center"
            >
                <div className="text-white font-bold text-center">
                    <p className="text-sm uppercase tracking-widest opacity-80 mb-1">Ritmo</p>
                    4-7-8
                </div>
            </motion.div>
            <p className="text-gray-500 mt-6 text-sm max-w-xs text-center">
                Siga o ritmo: Inspire (4s), Segure (7s), Expire (8s).
            </p>
        </div>
    );
};

export default function BonusCompulsaoPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

            {/* Modal SOS Customizado */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Respire Comigo</h3>
                            <p className="text-gray-500 text-center text-sm mb-4">Isso vai passar em alguns segundos.</p>

                            <BreathingCircle />

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                Estou melhor
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero SOS */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-rose-900/20">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">SOS Compulsão</h1>
                    <p className="text-rose-100 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                        Sentindo ansiedade ou vontade incontrolável de comer?
                        Não se julgue. Use nossa ferramenta de regulação emocional agora.
                    </p>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-white text-rose-600 text-xl font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform animate-pulse flex items-center gap-3 mx-auto"
                    >
                        <AlertCircle className="fill-orange-500 text-white" />
                        ATIVAR MODO SOS
                    </button>
                </div>

                {/* Background Decoration */}
                <Heart size={300} className="absolute -top-10 -left-10 text-white/10 blur-sm pointer-events-none" />
                <Wind size={200} className="absolute -bottom-10 -right-10 text-white/10 blur-sm pointer-events-none" />
            </div>

            {/* Audio Terapia */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        <Headphones size={24} />
                    </div>
                    Reprogramação Mental
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { title: "Escute ao Acordar (Blindagem)", duration: "5:30", color: "bg-blue-50 text-blue-600", desc: "Comece o dia no controle." },
                        { title: "Momentos de Crise (SOS)", duration: "3:45", color: "bg-rose-50 text-rose-600", desc: "Acalme a mente imediatamente." },
                        { title: "Antes de Dormir (Relaxamento)", duration: "8:00", color: "bg-purple-50 text-purple-600", desc: "Durma bem e regule hormônios." },
                        { title: "Visualização do Corpo Novo", duration: "10:20", color: "bg-green-50 text-green-600", desc: "Treine seu cérebro para o sucesso." }
                    ].map((audio, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-blue-200 hover:shadow-md transition-all cursor-not-allowed group relative overflow-hidden">
                            {/* Overlay Coming Soon */}
                            <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase">Em breve</div>

                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${audio.color} group-hover:scale-110 transition-transform`}>
                                <Play size={20} fill="currentColor" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 leading-tight mb-1">{audio.title}</h4>
                                <p className="text-sm text-gray-500 mb-2">{audio.desc}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <BatteryCharging size={12} />
                                    {audio.duration} mins
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dicas Rapidas */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { emoji: "💧", title: "Água ou Fome?", desc: "Beba um copo grande de água e espere 10 min. 70% das vezes é apenas sede." },
                    { emoji: "🚶‍♀️", title: "Mude de Ambiente", desc: "Saia da cozinha agora. Vá para o quarto ou quintal. Mude o estímulo visual." },
                    { emoji: "🦷", title: "Escove os Dentes", desc: "O sabor da pasta de dente envia um sinal químico de 'fim de refeição' ao cérebro." }
                ].map((dica, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-4xl mb-4 transform hover:scale-125 transition-transform duration-300 inline-block cursor-default">{dica.emoji}</div>
                        <h4 className="font-bold text-gray-900 mb-2">{dica.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{dica.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
