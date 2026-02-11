
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Coffee, Sun, Moon, Heart, Zap, X } from 'lucide-react';
import ModuleHeader from '@/components/shared/ModuleHeader';
import Mascot from '@/components/shared/Mascot';
import BreathingExercise from '@/components/compulsao/BreathingExercise';

export default function BonusCompulsaoPage() {
    const [activeTab, setActiveTab] = useState<'guia' | 'sos' | 'estrategias'>('guia');
    const [showSOS, setShowSOS] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <ModuleHeader
                title="Protocolo Anti-Compulsão"
                description="Domine seus gatilhos emocionais e pare de se sabotar."
                emoji="🧘‍♀️"
                bgClass="bg-rose-50 border-rose-100"
            />

            <div className="max-w-4xl mx-auto px-4 space-y-8">

                {/* Menu de Navegação Interno */}
                <div className="flex p-1 bg-white rounded-xl shadow-sm border border-gray-100 mb-6 sticky top-4 z-10 overflow-x-auto">
                    {[
                        { id: 'guia', label: '📖 O Guia Completo', color: 'rose' },
                        { id: 'estrategias', label: '🛠️ Ferramentas Práticas', color: 'purple' },
                        { id: 'sos', label: '🚨 SOS Crise', color: 'red' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? `bg-${tab.color}-100 text-${tab.color}-700 shadow-sm`
                                    : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Conteúdo: GUIA */}
                {activeTab === 'guia' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 prose max-w-none">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que você sente que perde o controle?</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Olá, querida! Antes de tudo, eu preciso que você respire fundo e entenda uma coisa muito importante:
                                <strong> você não tem "falta de vergonha na cara" e você não é fraca.</strong>
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                A compulsão alimentar não é sobre comida. É sobre <strong>química cerebral</strong>. Quando você ataca um doce ou repete o prato mesmo estando cheia, seu cérebro está, na verdade, tentando te "salvar" de alguma emoção desconfortável (tédio, ansiedade, tristeza ou cansaço).
                            </p>

                            <div className="bg-rose-50 p-6 rounded-2xl border-l-4 border-rose-400 my-6">
                                <h3 className="font-bold text-rose-800 text-lg mb-2">O Ciclo da Dopamina</h3>
                                <p className="text-rose-700">
                                    Açúcar e farinha agem no seu cérebro igualzinho a drogas viciantes. Eles dão um pico rápido de prazer (dopamina) e depois uma queda brusca. Essa queda te deixa irritada e com MAIS vontade. É um ciclo biológico, não moral. Vamos quebrar isso juntas?
                                </p>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">Os 3 Gatilhos Principais</h3>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Moon size={20} /></div>
                                    <div>
                                        <strong className="block text-gray-900">1. Cansaço / Sono ruim</strong>
                                        <span className="text-gray-600">Se você dorme mal, o hormônio da fome (grelina) dispara e o da saciedade (leptina) cai. Você vai querer carboidrato o dia todo.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Zap size={20} /></div>
                                    <div>
                                        <strong className="block text-gray-900">2. Privação Severa</strong>
                                        <span className="text-gray-600">"Hoje não vou comer nada!". Errado. Isso gera efeito rebote à noite. Coma bem para não comer besteira.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Heart size={20} /></div>
                                    <div>
                                        <strong className="block text-gray-900">3. Emoções Represadas</strong>
                                        <span className="text-gray-600">Engolir sapo faz a gente querer engolir comida. Aprender a falar "não" emagrece!</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}

                {/* Conteúdo: ESTRATEGIAS */}
                {activeTab === 'estrategias' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <Mascot emotion="thinking" message="Essas táticas funcionam em 5 minutos!" />

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-4xl mb-4 block">💧</span>
                                <h3 className="font-bold text-gray-900 mb-2">Técnica do Copo D'água</h3>
                                <p className="text-gray-600 text-sm">
                                    Sentiu vontade de comer fora de hora? Beba um copo cheio de água (300ml) e espere 10 minutos. O cérebro confunde sede com fome em 70% das vezes.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-4xl mb-4 block">🦷</span>
                                <h3 className="font-bold text-gray-900 mb-2">Higiene Bucal Imediata</h3>
                                <p className="text-gray-600 text-sm">
                                    Terminou de almoçar e quer doce? Corra escovar os dentes. O sabor da pasta de dente envia um sinal químico de "fim de refeição" para o cérebro e estraga o gosto do doce.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-4xl mb-4 block">🚶‍♀️</span>
                                <h3 className="font-bold text-gray-900 mb-2">Mude o Cenário</h3>
                                <p className="text-gray-600 text-sm">
                                    Saia da cozinha DE IMEDIATO. Vá para o quarto, quintal ou banho. A compulsão visual dura apenas 3 a 5 minutos. Se você sair de perto da comida, a vontade passa.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-4xl mb-4 block">📝</span>
                                <h3 className="font-bold text-gray-900 mb-2">O "Porquê" Profundo</h3>
                                <p className="text-gray-600 text-sm">
                                    Pergunte-se: "Eu comeria uma maçã agora?". Se a resposta for "não", não é fome, é vontade de comer (emoção).
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Conteúdo: SOS */}
                {activeTab === 'sos' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-red-50 p-8 rounded-full mb-6 animate-pulse">
                            <Zap className="text-red-500 w-16 h-16" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Botão de Pânico</h2>
                        <p className="text-gray-600 max-w-md mb-8">
                            Se você está prestes a atacar a geladeira, pare tudo e clique abaixo. Vamos regular sua ansiedade juntos em 60 segundos.
                        </p>

                        {!showSOS ? (
                            <button
                                onClick={() => setShowSOS(true)}
                                className="bg-red-600 text-white font-bold text-xl px-12 py-6 rounded-full shadow-xl hover:scale-105 transition-transform hover:bg-red-700"
                            >
                                ESTOU TENDO UMA CRISE
                            </button>
                        ) : (
                            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl relative">
                                <button onClick={() => setShowSOS(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Siga a respiração...</h3>
                                <BreathingExercise />
                                <p className="text-sm text-gray-500 mt-6">Repita até se sentir calma.</p>
                            </div>
                        )}
                    </motion.div>
                )}

            </div>
        </div>
    );
}
