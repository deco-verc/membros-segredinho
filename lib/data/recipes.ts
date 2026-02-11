
export interface Recipe {
    id: string;
    title: string;
    category: 'cafe' | 'almoco' | 'jantar' | 'doce' | 'lanche';
    prepTime: string;
    calories: number;
    image?: string; // Placeholder emoji or color for now
    ingredients: string[];
    instructions: string[];
}

export const recipes: Recipe[] = [
    {
        id: '1',
        title: 'Panqueca de Banana Fit',
        category: 'cafe',
        prepTime: '10 min',
        calories: 250,
        ingredients: ['1 banana madura', '2 ovos', '1 colher de aveia', 'Canela a gosto'],
        instructions: ['Amasse a banana', 'Misture com os ovos e aveia', 'Asse em frigideira antiaderente']
    },
    {
        id: '2',
        title: 'Frango com Batata Doce Assada',
        category: 'almoco',
        prepTime: '40 min',
        calories: 350,
        ingredients: ['150g peito de frango', '100g batata doce', 'Ervas finas', 'Azeite'],
        instructions: ['Tempere o frango', 'Corte batata em rodelas', 'Asse tudo por 30min a 200 graus']
    },
    {
        id: '3',
        title: 'Mousse de Chocolate Fake',
        category: 'doce',
        prepTime: '5 min',
        calories: 120,
        ingredients: ['1 abacate pequeno', '2 colheres cacau 70%', 'Adoçante a gosto'],
        instructions: ['Bata tudo no liquidificador até ficar cremoso', 'Leve à geladeira por 1h']
    },
    {
        id: '4',
        title: 'Omelete de Forno com Legumes',
        category: 'jantar',
        prepTime: '20 min',
        calories: 200,
        ingredients: ['3 ovos', 'Espinafre', 'Tomate cereja', 'Queijo cottage'],
        instructions: ['Bata os ovos', 'Misture os legumes picados', 'Asse em forminhas de silicone']
    },
    {
        id: '5',
        title: 'Crepioca de Frango Cremoso',
        category: 'lanche',
        prepTime: '10 min',
        calories: 280,
        ingredients: ['1 ovo', '2 colheres de goma de tapioca', 'Requeijão light', 'Frango desfiado'],
        instructions: ['Misture ovo e tapioca', 'Faça o disco na frigideira', 'Recheie com frango e requeijão']
    },
    {
        id: '6',
        title: 'Salada de Grão de Bico',
        category: 'almoco',
        prepTime: '15 min',
        calories: 320,
        ingredients: ['Grão de bico cozido', 'Tomate', 'Pepino', 'Limão', 'Azeite'],
        instructions: ['Misture todos os ingredientes', 'Tempere com limão e sal']
    },
    {
        id: '7',
        title: 'Brigadeiro de Whey',
        category: 'doce',
        prepTime: '5 min',
        calories: 80,
        ingredients: ['1 scoop de whey chocolate', '1 colher de leite em pó desnatado', 'Água aos poucos'],
        instructions: ['Misture os pós', 'Adicione água aos poucos até dar ponto de brigadeiro']
    },
    {
        id: '8',
        title: 'Sopa Detox Verde',
        category: 'jantar',
        prepTime: '30 min',
        calories: 150,
        ingredients: ['Abobrinha', 'Espinafre', 'Couve', 'Gengibre'],
        instructions: ['Cozinhe tudo com pouca água', 'Bata no liquidificador', 'Sirva quente']
    }
];
