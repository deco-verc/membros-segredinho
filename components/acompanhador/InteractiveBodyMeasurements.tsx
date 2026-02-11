
'use client';

import { useState } from 'react';
import Mascot from '@/components/shared/Mascot';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Ruler } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function InteractiveBodyMeasurements({ userId }: { userId: string }) {
    const [selectedPart, setSelectedPart] = useState<string | null>(null);
    const [measurements, setMeasurements] = useState({
        busto: 0,
        cintura: 0,
        quadril: 0,
        peso: 0,
    });
    const [updatedValues, setUpdatedValues] = useState<Record<string, number>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [mascotMessage, setMascotMessage] = useState("Clique no corpo para atualizar!");
    const [mascotEmotion, setMascotEmotion] = useState<'neutral' | 'happy' | 'excited'>('neutral');

    const handlePartClick = (part: string) => {
        setSelectedPart(part);
        setMascotMessage(`Atualizando: ${part.charAt(0).toUpperCase() + part.slice(1)}`);
        setMascotEmotion('happy');
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedValues({
            ...updatedValues,
            [selectedPart!]: parseFloat(e.target.value)
        });
    };

    const handleSave = async () => {
        if (!selectedPart || !updatedValues[selectedPart]) return;

        setIsSaving(true);
        // Simulate save or actually save
        const supabase = createClient();

        // Aqui seria a lógica real de salvar no banco
        // await supabase.from('measurements').upsert(...) 

        // Simulação de sucesso
        await new Promise(r => setTimeout(r, 800));

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setMascotMessage("Uau! Ótimo progresso! 🎉");
        setMascotEmotion('excited');
        setIsSaving(false);
        setSelectedPart(null);

        setTimeout(() => {
            setMascotMessage("Clique para medir outra parte!");
            setMascotEmotion('neutral');
        }, 3000);
    };

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 z-10 relative">
                <Ruler className="text-purple-500" />
                Medidas Interativas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">

                {/* Visual Body Representation (Abstract) */}
                <div className="relative h-[300px] bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-dashed border-gray-200 group">
                    {/* Silhouette SVG */}
                    <svg viewBox="0 0 100 200" className="h-full w-auto fill-gray-300 stroke-gray-400 stroke-1 hover:stroke-purple-400 transition-colors drop-shadow-sm">
                        {/* Head */}
                        <circle cx="50" cy="20" r="10" />
                        {/* Upper Body (Bust) */}
                        <path
                            d="M 30 40 Q 50 45 70 40 L 70 70 Q 50 65 30 70 Z"
                            className={`cursor-pointer hover:fill-purple-200 transition-colors ${selectedPart === 'busto' ? 'fill-purple-300 stroke-purple-500' : ''}`}
                            onClick={() => handlePartClick('busto')}
                        />
                        {/* Mid Body (Waist) */}
                        <path
                            d="M 30 70 Q 50 65 70 70 L 75 90 Q 50 85 25 90 Z"
                            className={`cursor-pointer hover:fill-purple-200 transition-colors ${selectedPart === 'cintura' ? 'fill-purple-300 stroke-purple-500' : ''}`}
                            onClick={() => handlePartClick('cintura')}
                        />
                        {/* Lower Body (Hips) */}
                        <path
                            d="M 25 90 Q 50 85 75 90 L 80 130 Q 50 140 20 130 Z"
                            className={`cursor-pointer hover:fill-purple-200 transition-colors ${selectedPart === 'quadril' ? 'fill-purple-300 stroke-purple-500' : ''}`}
                            onClick={() => handlePartClick('quadril')}
                        />

                        {/* Labels for connection lines */}
                        <line x1="80" y1="55" x2="95" y2="55" className="stroke-gray-300 stroke-[0.5]" />
                        <line x1="80" y1="80" x2="95" y2="80" className="stroke-gray-300 stroke-[0.5]" />
                        <line x1="85" y1="110" x2="95" y2="110" className="stroke-gray-300 stroke-[0.5]" />
                    </svg>

                    {/* Tooltips/Helpers */}
                    <div className="absolute right-4 top-[25%] text-xs text-gray-500 font-bold">Busto</div>
                    <div className="absolute right-4 top-[40%] text-xs text-gray-500 font-bold">Cintura</div>
                    <div className="absolute right-4 top-[55%] text-xs text-gray-500 font-bold">Quadril</div>
                </div>

                {/* Interaction Panel */}
                <div className="flex flex-col items-center justify-center space-y-6">
                    {/* The Mascot */}
                    <Mascot emotion={mascotEmotion} message={mascotMessage} />

                    {/* Input Area */}
                    <AnimatePresence mode="wait">
                        {selectedPart ? (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="w-full bg-purple-50 p-4 rounded-xl border border-purple-100"
                            >
                                <label className="block text-sm font-bold text-gray-700 capitalize mb-2">
                                    Medida de {selectedPart} (cm)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        autoFocus
                                        value={updatedValues[selectedPart] || ''}
                                        onChange={handleValueChange}
                                        className="flex-1 px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-500"
                                        placeholder="0.0"
                                    />
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        onClick={() => setSelectedPart(null)}
                                        className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-gray-400 text-sm"
                            >
                                <p>Selecione uma parte do corpo ao lado para registrar suas medidas.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-bl-full opacity-50 -z-0 pointer-events-none" />
        </div>
    );
}
