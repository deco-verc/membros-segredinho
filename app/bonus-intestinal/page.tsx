
import { CheckCircle, AlertTriangle, Carrot, Coffee, Trash2, Zap } from 'lucide-react';

export default function BonusIntestinalPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">

            {/* Hero Section */}
            <div className="text-center space-y-4">
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                    Protocolo Exclusivo
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    Reset Intestinal <span className="text-green-600">7 Dias</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Elimine o inchaço, destrave seu metabolismo e recupere sua energia focando na saúde da sua microbiota.
                </p>
            </div>

            {/* Alertas Importantes */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={24} />
                    <div>
                        <h3 className="font-bold text-orange-900 text-lg">Antes de começar</h3>
                        <p className="text-orange-800">
                            Este protocolo é focado em alimentos naturais anti-inflamatórios. Se você sentir desconforto severo, suspenda e procure orientação.
                            Hidratação é fundamental: beba 35ml de água por kg de peso corporal.
                        </p>
                    </div>
                </div>
            </div>

            {/* Timeline 7 Dias */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">

                {/* Fase 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Trash2 size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-green-600 font-bold text-sm uppercase tracking-wider mb-1 block">Dias 1 e 2</span>
                        <h3 className="font-bold text-gray-900 text-xl mb-3">A Limpeza (Detox)</h3>
                        <p className="text-gray-600 mb-4">
                            O objetivo é remover os maiores irritantes do seu intestino para dar um descanso à mucosa.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                <strong>Evitar:</strong> Glúten, Laticínios, Açúcar refinado.
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                <strong>Focar:</strong> Caldos, sopas, vegetais cozidos (não crus).
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Fase 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Zap size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-1 block">Dias 3, 4 e 5</span>
                        <h3 className="font-bold text-gray-900 text-xl mb-3">Reparação e Semeadura</h3>
                        <p className="text-gray-600 mb-4">
                            Agora que a inflamação baixou, vamos nutrir as células intestinais e introduzir fibras prebióticas.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                <strong>Incluir:</strong> Biovitamina de abacate, sementes de chia/linhaça hidratadas.
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                <strong>Dica:</strong> Chá de espinheira santa antes das refeições.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Fase 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <CheckCircle size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-1 block">Dias 6 e 7</span>
                        <h3 className="font-bold text-gray-900 text-xl mb-3">Reintrodução Inteligente</h3>
                        <p className="text-gray-600 mb-4">
                            Voltamos à rotina normal, mas observando os sinais do corpo.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                <strong>Teste:</strong> Reintroduza 1 grupo alimentar por vez (ex: queijo) e espere 24h.
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-700">
                                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                <strong>Sinal verde:</strong> Sem gases/inchaço? Pode manter.
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Receita Bônus */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Coffee className="text-green-600" />
                    Shot Matinal Anti-Inflamatório
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Ingredientes:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>50ml de água morna</li>
                            <li>1/2 limão espremido</li>
                            <li>1 colher (café) de cúrcuma</li>
                            <li>1 pitada de pimenta preta (ativa a cúrcuma)</li>
                            <li>10 gotas de própolis verde</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-700 mb-2">Como tomar:</h4>
                        <p className="text-gray-600">
                            Em jejum, logo ao acordar. Espere pelo menos 15 minutos para tomar seu café da manhã. Isso prepara o pH do estômago.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
