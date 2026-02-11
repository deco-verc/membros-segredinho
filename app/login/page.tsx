'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            setSent(true);
            toast.success('Link de acesso enviado!');
        } catch (error: any) {
            // Mostra o erro real vindo do Supabase (ex: Rate limit, Config, etc)
            toast.error(error.message || 'Erro ao enviar link. Tente novamente.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm text-center border border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifique seu e-mail</h2>
                    <p className="text-gray-600 mb-8">
                        Enviamos um link mágico de acesso para <strong>{email}</strong>. Clique nele para entrar!
                    </p>
                    <button
                        onClick={() => setSent(false)}
                        className="text-green-600 font-medium hover:underline"
                    >
                        Tentar outro e-mail
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl shadow-green-900/5">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-4 shadow-lg shadow-green-500/30">
                        <Sparkles size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Segredinho das Japonesas</h1>
                    <p className="text-gray-500 mt-2">Área de Membros Exclusiva</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Seu e-mail de compra
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                placeholder="exemplo@email.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Entrar agora <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-xs text-center text-gray-400 mt-8">
                    Ambiente 100% seguro. Seus dados estão protegidos.
                </p>
            </div>
        </div>
    );
}
