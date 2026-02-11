
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { calcularDosePersonalizada } from '@/lib/utils/calculateDose';
import { Clock, Info, CheckCircle, AlertCircle, ShoppingBag, DollarSign } from 'lucide-react';
import ModuleHeader from '@/components/shared/ModuleHeader';


export default async function ProtocoloPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect('/login');

    const { data: userData } = await supabase
        .from('users')
        .select('quiz_data')
        .eq('id', user.id)
        .single();

    const quizData = userData?.quiz_data || {};
    const dose = calcularDosePersonalizada(quizData);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <ModuleHeader
                title="Seu Protocolo Exclusivo"
                description="Desenvolvido com base no seu perfil metabólico e hormonal."
                emoji="💊"
                bgClass="bg-green-50 border-green-100"
            />

            <div className="max-w-4xl mx-auto px-4 space-y-8">

                {/* Ingredientes Card */}
                <div className="bg-white rounded-3xl p-8 border border-green-100 shadow-xl shadow-green-900/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-10 -mt-10" />

                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="bg-green-100 p-2 rounded-lg text-green-700">💊</span>
                        Fórmula Personalizada
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {Object.entries(dose.ingredientes).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-green-50 transition-colors group">
                                <p className="text-sm text-gray-500 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                <p className="text-xl font-bold text-gray-900 group-hover:text-green-700">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Posologia e Horários */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="text-blue-500" size={20} />
                            Como tomar
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="min-w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5">1</div>
                                <p className="text-gray-600 text-sm"><span className="font-bold text-gray-900">Frequência:</span> {dose.frequencia}</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="min-w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5">2</div>
                                <div>
                                    <p className="text-gray-600 text-sm font-bold text-gray-900 mb-1">Horários Ideais:</p>
                                    {dose.horarios.map((horario, idx) => (
                                        <p key={idx} className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mr-2 mb-2">
                                            {horario}
                                        </p>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Info className="text-purple-500" size={20} />
                            Instruções de Preparo
                        </h3>
                        <ul className="space-y-3">
                            {dose.instrucoes.map((instrucao, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    {instrucao}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Ajustes Especiais (Se houver) */}
                {dose.ajustesEspeciais.length > 0 && (
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                        <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                            <AlertCircle size={20} />
                            Ajustes para seu perfil
                        </h3>
                        <div className="space-y-2">
                            {dose.ajustesEspeciais.map((ajuste, idx) => (
                                <p key={idx} className="text-sm text-orange-700 flex items-center gap-2">
                                    • {ajuste}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Onde Comprar Footer */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                            <ShoppingBag size={20} className="text-yellow-400" />
                            Onde manipular/comprar?
                        </h4>
                        <p className="text-gray-300 text-sm mb-1">{dose.ondeComprar}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                            <DollarSign size={12} /> Custo Estimado: {dose.custoMensal}
                        </p>
                    </div>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg">
                        Baixar Receita PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
