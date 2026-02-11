
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // Ajuste conforme seu client
import { Button } from '@/components/ui/button'; // Se existir
import { Input } from '@/components/ui/input'; // Se existir
import { toast } from 'sonner'; // Se estiver usando sonner
import { Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WeightInput({ userId, currentWeight }: { userId: string, currentWeight: number }) {
    const [weight, setWeight] = useState<string>(''); // Inicialmente vazio para forçar input
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!weight) return;

        setLoading(true);
        const today = new Date().toISOString().split('T')[0];

        try {
            const { error } = await supabase
                .from('user_progress')
                .upsert({
                    user_id: userId,
                    date: today,
                    peso_atual: parseFloat(weight),
                    // Outros campos opcionais podem ser nulos ou default
                }, { onConflict: 'user_id, date' });

            if (error) throw error;

            toast.success('Peso registrado com sucesso!');
            setWeight('');
            router.refresh(); // Atualiza a página para refletir no gráfico
        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar peso.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-500" />
                Registrar Hoje
            </h3>
            <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="relative flex-1">
                    <input
                        type="number"
                        step="0.1"
                        placeholder="Ex: 65.5"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400 text-sm">kg</span>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[80px]"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Salvar'}
                </button>
            </form>
            <p className="text-xs text-gray-400 mt-2 text-center">Último registro: {currentWeight}kg</p>
        </div>
    );
}
