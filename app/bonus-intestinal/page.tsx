
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Coffee, Sun, Moon, Heart, CheckCircle, AlertTriangle, Trash2, Zap, ArrowRight, X, ChevronRight } from 'lucide-react';
import ModuleHeader from '@/components/shared/ModuleHeader';

export default function BonusIntestinalPage() {
    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <ModuleHeader
                title="Reset Intestinal 7 Dias"
                description="Seu intestino é seu segundo cérebro. Se ele está inflamado, você não emagrece."
                emoji="🌿"
                bgClass="bg-green-50 border-green-100"
            />

            <div className="max-w-4xl mx-auto px-4 space-y-12">

                {/* Hero / Introdução */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full opacity-50 -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                    <h2 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">O Segredo Nunca Contado</h2>
                    <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                        Você sabia que 90% da serotonina (hormônio da felicidade) é produzida no intestino? Se você vive inchada, com gases ou intestino preso, seu corpo está em estado de emergência. Ele segura gordura para se proteger.
                    </p>
                    <p className="text-gray-600 leading-relaxed relative z-10">
                        Este protocolo de 7 dias vai "resetar" sua microbiota. Pense nisso como formatar um computador lento. Vamos apagar os bugs (bactérias ruins) e instalar os programas certos (probióticos).
                    </p>
                </div>

                {/* Timeline Visual 7 Dias */}
                <div className="relative border-l-4 border-green-200 ml-4 md:ml-8 space-y-12 py-4">

                    {/* Fase 1 */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-12 group">
                        <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-white border-4 border-green-500 group-hover:scale-125 transition-transform shadow-sm" />
                        <span className="text-green-600 font-bold text-sm uppercase tracking-wider mb-1 block">Dias 1 e 2</span>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:border-green-300 transition-colors">
                            <h3 className="font-bold text-gray-900 text-xl mb-3 flex items-center gap-2">
                                <Trash2 className="text-green-500" /> A Faxina (Detox)
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                O objetivo agora é remover os irritantes. Imagine que seu intestino está machucado. Se você ficar cutucando a ferida, ela nunca sara. Vamos dar paz para ele.
                            </p>
                            <ul className="space-y-3 bg-gray-50 p-4 rounded-xl">
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-red-500 font-bold">🚫 PROIBIDO:</span>
                                    Glúten (pão, macarrão), Leite de vaca, Açúcar, Álcool.
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-green-600 font-bold">✅ OBRIGATÓRIO:</span>
                                    Sopas, caldos e vegetais cozidos. Nada cru nestes 2 dias (cru dá trabalho pra digerir).
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Fase 2 */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-12 group">
                        <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-white border-4 border-blue-500 group-hover:scale-125 transition-transform shadow-sm" />
                        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-1 block">Dias 3, 4 e 5</span>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:border-blue-300 transition-colors">
                            <h3 className="font-bold text-gray-900 text-xl mb-3 flex items-center gap-2">
                                <Zap className="text-blue-500" /> Reparação e Semeadura
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                A inflamação baixou. Agora vamos enviar "tijolos" para reconstruir a parede do intestino e alimentar as bactérias boas.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-xl space-y-3">
                                <h4 className="font-bold text-blue-800 text-sm">Receita Poderosa: Biovitamina</h4>
                                <p className="text-blue-700 text-xs leading-relaxed">
                                    Bata: 1/2 maçã cozida + 1 colher de farelo de aveia + 100ml de água de coco + 1 colher de semente de linhaça (hidratada na água por 4h).
                                </p>
                                <p className="text-blue-900 text-xs font-bold">Tome isso de café da manhã nestes 3 dias.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Fase 3 */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-12 group">
                        <div className="absolute -left-[14px] top-0 w-6 h-6 rounded-full bg-white border-4 border-purple-500 group-hover:scale-125 transition-transform shadow-sm" />
                        <span className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-1 block">Dias 6 e 7</span>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:border-purple-300 transition-colors">
                            <h3 className="font-bold text-gray-900 text-xl mb-3 flex items-center gap-2">
                                <CheckCircle className="text-purple-500" /> Teste de Fogo
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Voltando ao normal, mas com inteligência. Você vai reintroduzir 1 alimento "perigoso" por vez e observar.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                    <span>Dia 6: Coma um pedaço de queijo. Espere 24h. Teve gases? Inchaço? Se sim, laticínios são seu veneno.</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                    <span>Dia 7: Coma um pão francês. Espere 24h. Teve azia? Cansaço? O glúten é seu inimigo.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                </div>

                {/* Bônus Shot Matinal */}
                <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center gap-2">
                        <Coffee className="text-yellow-600" />
                        Shot Matinal Anti-Inflamatório
                    </h2>
                    <p className="text-yellow-800 mb-6">
                        Tome isso TODOS os dias, em jejum, para "acordar" seu estômago e preparar a digestão. É barato e poderoso.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 bg-white/50 p-6 rounded-2xl backdrop-blur-sm">
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2">Ingredientes:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                                <li>50ml de água morna</li>
                                <li>1/2 limão espremido</li>
                                <li>1 colher (café) de cúrcuma (açafrão)</li>
                                <li>1 pitada de pimenta preta (ativa a cúrcuma 2000x)</li>
                                <li>10 gotas de própolis verde (opcional, mas recomendo)</li>
                            </ul>
                        </div>
                        <div className="flex items-center justify-center border-l border-yellow-200 pl-8">
                            <p className="text-center text-yellow-800 font-medium italic">
                                "Sua pele vai clarear, seu inchaço vai sumir e sua energia vai dobrar em 7 dias."
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
