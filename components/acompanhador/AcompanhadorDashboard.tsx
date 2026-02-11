
'use client';

import { useState } from 'react';
import ProgressChart from '@/components/acompanhador/ProgressChart';
import WeightInput from '@/components/acompanhador/WeightInput';
import PhotoGallery from '@/components/acompanhador/PhotoGallery';
import InteractiveBodyMeasurements from '@/components/acompanhador/InteractiveBodyMeasurements';
import { Scale, Ruler, Camera, TrendingDown } from 'lucide-react';
import Mascot from '@/components/shared/Mascot';

interface AcompanhadorDashboardProps {
    userData: any;
    progressData: any[];
    userId: string;
}

export default function AcompanhadorDashboard({ userData, progressData, userId }: AcompanhadorDashboardProps) {
    const currentWeight = progressData?.[progressData.length - 1]?.peso_atual || userData?.quiz_data?.peso || 0;
    const startWeight = userData?.quiz_data?.peso || 0;
    const goalWeight = userData?.quiz_data?.metaKg || 0;
    const lostWeight = startWeight - currentWeight;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <TrendingDown className="text-blue-500" size={32} />
                        Acompanhador Interativo
                    </h1>
                    <p className="text-gray-500 mt-2">Veja sua transformação acontecendo.</p>
                </div>

                {/* Mascot General Feedback */}
                <div className="hidden md:block">
                    <Mascot emotion="happy" message="Você está indo muito bem! Continue assim!" />
                </div>
            </header>

            {/* Resumo Rápido */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                        <Scale size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Peso Atual</p>
                        <p className="text-2xl font-bold text-gray-900">{currentWeight} kg</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-green-100 rounded-xl text-green-600">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Eliminado Total</p>
                        <p className="text-2xl font-bold text-gray-900">{lostWeight > 0 ? `-${lostWeight.toFixed(1)}` : '0'} kg</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                        <Ruler size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Meta Final</p>
                        <p className="text-2xl font-bold text-gray-900">{goalWeight} kg</p>
                    </div>
                </div>
            </div>

            {/* Gráfico e Input de Peso */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:border-blue-200 transition-colors">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Sua Jornada</h2>
                    <div className="h-[300px]">
                        <ProgressChart data={progressData || []} startWeight={startWeight} goalWeight={goalWeight} />
                    </div>
                </div>

                <div className="space-y-6">
                    <WeightInput userId={userId} currentWeight={currentWeight} />

                    {/* Interactive Body Measurements replacing the static card */}
                    <InteractiveBodyMeasurements userId={userId} />
                </div>
            </div>

            {/* Galeria de Fotos */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Camera className="text-pink-500" size={20} />
                        Diário Fotográfico
                    </h2>
                </div>
                <PhotoGallery userId={userId} />
            </div>
        </div>
    );
}
