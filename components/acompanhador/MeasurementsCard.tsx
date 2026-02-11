
'use client';

import { CheckCircle2 } from 'lucide-react';

// Simplificação: Apenas visualização ou botão para abrir modal completo
export default function MeasurementsCard({ userId }: { userId: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-70 pointer-events-none relative overflow-hidden">
            {/* Overlay de "Em breve" para simplificar o MVP agora, já que o foco é o peso */}
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Em Breve
                </span>
            </div>

            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-purple-500" />
                Medidas Corporais
            </h3>
            <div className="space-y-3">
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-500">Cintura</span>
                    <span className="font-bold text-gray-900">-- cm</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-500">Quadril</span>
                    <span className="font-bold text-gray-900">-- cm</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-500">Busto</span>
                    <span className="font-bold text-gray-900">-- cm</span>
                </div>
            </div>
            <button className="w-full mt-4 text-purple-600 text-sm font-bold py-2 hover:bg-purple-50 rounded-lg transition-colors">
                Registrar Novas Medidas
            </button>
        </div>
    );
}
