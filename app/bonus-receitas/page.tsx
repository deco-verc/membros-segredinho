
'use client';

import { useState } from 'react';
import { recipes, Recipe } from '@/lib/data/recipes';
import { Search, Clock, Flame, ChefHat, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    { id: 'all', label: 'Todas' },
    { id: 'cafe', label: 'Café da Manhã' },
    { id: 'almoco', label: 'Almoço' },
    { id: 'jantar', label: 'Jantar' },
    { id: 'doce', label: 'Doces Fit' },
    { id: 'lanche', label: 'Lanches' },
];

export default function BonusReceitasPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const filteredRecipes = recipes.filter(recipe => {
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
        const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <ChefHat className="text-orange-500" size={32} />
                        100 Receitas Seca-Barriga
                    </h1>
                    <p className="text-gray-500">Coma bem e emagreça sem passar fome.</p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar receita..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === cat.id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'bg-white text-gray-600 hover:bg-orange-50'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                    <motion.div
                        key={recipe.id}
                        layoutId={recipe.id}
                        onClick={() => setSelectedRecipe(recipe)}
                        className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md cursor-pointer border border-gray-100 group"
                    >
                        <div className="aspect-video bg-orange-100 rounded-xl mb-4 flex items-center justify-center text-orange-400 group-hover:bg-orange-200 transition-colors">
                            <ChefHat size={40} />
                        </div>
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">{recipe.title}</h3>
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {recipe.prepTime}</span>
                                    <span className="flex items-center gap-1"><Flame size={12} /> {recipe.calories} kcal</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredRecipes.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-400">
                        Nenhuma receita encontrada.
                    </div>
                )}
            </div>

            {/* Modal de Detalhes */}
            <AnimatePresence>
                {selectedRecipe && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedRecipe(null)}
                    >
                        <motion.div
                            layoutId={selectedRecipe.id}
                            className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-0 relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedRecipe(null)}
                                className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="h-48 bg-orange-100 flex items-center justify-center text-orange-400">
                                <ChefHat size={64} />
                            </div>

                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedRecipe.title}</h2>
                                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        {CATEGORIES.find(c => c.id === selectedRecipe.category)?.label}
                                    </span>
                                    <span className="flex items-center gap-1"><Clock size={16} /> {selectedRecipe.prepTime}</span>
                                    <span className="flex items-center gap-1"><Flame size={16} /> {selectedRecipe.calories} kcal</span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-3 border-b pb-2">Ingredientes</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            {selectedRecipe.ingredients.map((ing, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                                                    {ing}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-3 border-b pb-2">Modo de Preparo</h3>
                                        <ol className="space-y-3 text-gray-600 text-sm list-decimal list-inside marker:font-bold marker:text-orange-500">
                                            {selectedRecipe.instructions.map((step, i) => (
                                                <li key={i}>{step}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
