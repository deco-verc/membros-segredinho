export interface DosePersonalizada {
    ingredientes: {
        laranjaMoro: string;
        cromo: string;
        egcg: string;
        gengibre: string;
        canela: string;
    };
    frequencia: string;
    horarios: string[];
    instrucoes: string[];
    ondeComprar: string;
    custoMensal: string;
    ajustesEspeciais: string[];
}

export function calcularDosePersonalizada(quizData: any): DosePersonalizada {
    // Extrair dados relevantes
    const peso = parseFloat(quizData.peso) || 70;
    const idade = quizData.idade || '30-49';
    const sintomas = quizData.sintomasFrequentes || [];
    const autosabotagem = quizData.autosabotagem || [];
    const problemasSaude = quizData.problemasSaude || [];
    const horarioCafe = quizData.horarioCafe;
    const horarioAlmoco = quizData.horarioAlmoco;
    const horarioJantar = quizData.horarioJantar;

    // Dosagem base por peso
    let laranjaMoro = peso < 60 ? 500 : peso < 80 ? 750 : 1000;
    let cromo = peso < 60 ? 200 : peso < 80 ? 300 : 400;
    let egcg = peso < 60 ? 300 : peso < 80 ? 400 : 500;
    let gengibre = peso < 60 ? 1 : peso < 80 ? 1.5 : 2;
    let canela = peso < 60 ? 1 : 2;

    const ajustesEspeciais: string[] = [];

    // Ajustes por sintomas
    if (sintomas.includes('Compulsão') || autosabotagem.includes('Comer emocional')) {
        cromo = Math.min(cromo * 1.5, 600);
        ajustesEspeciais.push('Dose extra de Cromo para controlar compulsão por doces');
    }

    if (sintomas.includes('Metabolismo lento') || autosabotagem.includes('Metabolismo lento')) {
        egcg += 100;
        ajustesEspeciais.push('Dose aumentada de Chá Verde para acelerar metabolismo');
    }

    if (sintomas.includes('Intestino preso') || sintomas.includes('Inchaço')) {
        ajustesEspeciais.push('Adicionar 5g de Psyllium na bebida para regular intestino');
    }

    // Ajustes por idade
    const idadeNum = parseInt(idade.split('-')[0]);
    if (idadeNum >= 50) {
        ajustesEspeciais.push('Adicionar Vitamina D3 2000 UI (ossos + hormônios)');
        ajustesEspeciais.push('Adicionar Magnésio 200mg (sono + relaxamento)');
    }

    // Frequência baseada em peso
    const frequencia = peso < 60 ? '1 vez ao dia' : '2 vezes ao dia';

    // Calcular horários ideais baseado nas refeições do quiz
    const horarios: string[] = [];

    if (horarioCafe && horarioCafe !== 'Pulo o café') {
        const horaInicio = parseInt(horarioCafe.split('h')[0].split(' ')[1]);
        const horaBebida = horaInicio - 0.5;
        horarios.push(`${Math.floor(horaBebida)}h${(horaBebida % 1) * 60}min (30min antes do café)`);
    }

    if ((horarioAlmoco && horarioAlmoco !== 'Pulo o almoço') && horarios.length < 2) {
        const horaInicio = parseInt(horarioAlmoco.split('h')[0].split(' ')[1]);
        const horaBebida = horaInicio - 0.5;
        horarios.push(`${Math.floor(horaBebida)}h${(horaBebida % 1) * 60}min (30min antes do almoço)`);
    }

    if (horarios.length === 0) {
        horarios.push('9h (em jejum pela manhã)');
    }

    // Instruções personalizadas
    const instrucoes = [
        'Misture todos os ingredientes em 300ml de água morna (não fervente)',
        'Adicione suco de 1 limão espremido fresco',
        'Adoce com stevia ou sucralose se preferir (opcional)',
        `Tome ${horarios.length === 1 ? 'sempre' : 'sempre nos'} ${horarios.join(' e ')}`,
        'Aguarde 30 minutos antes de comer qualquer coisa',
        'Mantenha hidratação: mínimo 2L água/dia para potencializar efeito',
    ];

    // Custo mensal estimado
    const custoMensal = peso < 60
        ? 'R$ 120-150/mês'
        : peso < 80
            ? 'R$ 150-180/mês'
            : 'R$ 180-220/mês';

    return {
        ingredientes: {
            laranjaMoro: `${laranjaMoro}mg`,
            cromo: `${cromo}mcg`,
            egcg: `${egcg}mg`,
            gengibre: `${gengibre}g`,
            canela: `${canela}g`,
        },
        frequencia,
        horarios,
        instrucoes,
        ondeComprar: 'Farmácia de manipulação local (recomendado) ou produtos separados em iHerb/Amazon',
        custoMensal,
        ajustesEspeciais,
    };
}
