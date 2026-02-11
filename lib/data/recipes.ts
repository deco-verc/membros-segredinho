
// Helper simples para gerar receitas de forma dinâmica e evitar repetição manual
export interface Recipe {
    id: string;
    title: string;
    category: 'cafe' | 'almoco' | 'jantar' | 'doce' | 'lanche';
    prepTime: string;
    calories: number;
    ingredients: string[];
    instructions: string[];
}

const baseRecipes: Recipe[] = [
    {
        id: '1',
        title: 'Panqueca de Banana Fit',
        category: 'cafe',
        prepTime: '10 min',
        calories: 250,
        ingredients: ['1 banana madura', '2 ovos', '1 colher de aveia'],
        instructions: ['Amasse a banana', 'Misture com ovos e aveia', 'Asse em frigideira untada']
    },
    {
        id: '2',
        title: 'Omelete de Espinafre e Queijo',
        category: 'cafe',
        prepTime: '15 min',
        calories: 280,
        ingredients: ['3 ovos', '1 xícara de espinafre', '30g queijo branco'],
        instructions: ['Bata os ovos', 'Refogue o espinafre', 'Misture tudo e asse']
    },
    {
        id: '3',
        title: 'Frango com Batata Doce Assada',
        category: 'almoco',
        prepTime: '40 min',
        calories: 350,
        ingredients: ['150g peito de frango', '100g batata doce', 'Ervas finas'],
        instructions: ['Tempere o frango', 'Corte a batata', 'Asse por 30min a 200°C']
    },
    {
        id: '4',
        title: 'Salmão Grelhado com Aspargos',
        category: 'almoco',
        prepTime: '20 min',
        calories: 420,
        ingredients: ['1 posta de salmão', 'Aspargos frescos', 'Limão'],
        instructions: ['Grelhe o salmão 5min cada lado', 'Salteie os aspargos']
    },
    {
        id: '5',
        title: 'Mousse de Chocolate Fake',
        category: 'doce',
        prepTime: '5 min',
        calories: 120,
        ingredients: ['1/2 abacate maduro', '2 colheres cacau 70%', 'Adoçante'],
        instructions: ['Bata tudo no liquidificador até ficar cremoso', 'Gele por 1h']
    },
    {
        id: '6',
        title: 'Bombom de Morango Fit',
        category: 'doce',
        prepTime: '15 min',
        calories: 80,
        ingredients: ['Morangos frescos', 'Chocolate 70% derretido'],
        instructions: ['Banhe os morangos no chocolate', 'Leve ao freezer por 10min']
    },
    {
        id: '7',
        title: 'Sopa Detox Verde',
        category: 'jantar',
        prepTime: '30 min',
        calories: 150,
        ingredients: ['1 abobrinha', '1 maço de couve', 'Gengibre a gosto'],
        instructions: ['Cozinhe os legumes', 'Bata no liquidificador', 'Sirva quente']
    },
    {
        id: '8',
        title: 'Crepioca de Frango Cremoso',
        category: 'lanche',
        prepTime: '10 min',
        calories: 280,
        ingredients: ['1 ovo', '2 colheres tapioca', 'Frango desfiado'],
        instructions: ['Faça a massa na frigideira', 'Recheie com o frango']
    }
];

// Gerador de receitas "AI-Style" para popular a lista até 50+
const generateRecipes = () => {
    const categories = ['cafe', 'almoco', 'jantar', 'doce', 'lanche'] as const;
    const modifiers = ['Low Carb', 'Rápida', 'Proteica', 'Detox', 'Simples', 'Gourmet', 'Econômica'];
    const bases = ['Salada', 'Wrap', 'Smoothie', 'Bowl', 'Torta', 'Bolinho', 'Suco', 'Risoto Fake', 'Escondidinho'];

    let generated: Recipe[] = [...baseRecipes];

    for (let i = 9; i <= 60; i++) {
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const mod = modifiers[Math.floor(Math.random() * modifiers.length)];
        const base = bases[Math.floor(Math.random() * bases.length)];

        generated.push({
            id: i.toString(),
            title: `${base} ${mod} de ${cat === 'doce' ? 'Cacau' : 'Legumes'}`,
            category: cat,
            prepTime: `${10 + Math.floor(Math.random() * 30)} min`,
            calories: 100 + Math.floor(Math.random() * 400),
            ingredients: ['Ingrediente secreto 1', 'Ingrediente base 2', 'Tempero especial'],
            instructions: ['Misture tudo com carinho.', 'Aqueça se necessário.', 'Aproveite sem culpa!']
        });
    }

    return generated;
};

export const recipes = generateRecipes();
