/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, ArrowRight } from 'lucide-react';

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80',
    title: 'Degradê Navalhado (Skin Fade)',
    category: 'Degradê',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80',
    title: 'Corte Social Clássico',
    category: 'Social',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80',
    title: 'Barba Alinhada na Navalha',
    category: 'Barba',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1605497746445-97d1b0a9eead?w=600&auto=format&fit=crop&q=80',
    title: 'Degradê Moderno (Mid Fade)',
    category: 'Degradê',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80',
    title: 'Corte Infantil Social',
    category: 'Social',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=600&auto=format&fit=crop&q=80',
    title: 'Barboterapia & Higienização',
    category: 'Barba',
  },
];

const CATEGORIES = ['Todos', 'Degradê', 'Social', 'Barba'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredGallery = selectedCategory === 'Todos'
    ? INITIAL_GALLERY
    : INITIAL_GALLERY.filter((item) => item.category === selectedCategory);

  return (
    <section id="galeria" className="py-20 bg-zinc-950 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-mono inline-flex items-center gap-2 mb-2">
            <Camera className="w-3 h-3 text-amber-500" /> Galeria de Estilo
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-white">
            Nossos <span className="font-semibold text-amber-500 font-serif">Trabalhos</span>
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mt-2 text-sm">
            Cortes limpos, barbas alinhadas e atenção máxima aos detalhes. Escolha sua inspiração.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all duration-300 rounded ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-zinc-950 scale-102 font-semibold shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid transition */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/5] overflow-hidden rounded bg-zinc-90 w-full cursor-zoom-in"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base font-medium text-white tracking-wide">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 mt-2 font-mono">
                    Ver ampliação <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                </div>
                {/* Always-on Tag label in corner for mobile readability */}
                <div className="absolute top-3 left-3 bg-zinc-950/70 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono tracking-wider text-zinc-200 uppercase pointer-events-none">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-zinc-950/95 flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white text-3xl font-light hover:text-amber-500 transition-colors"
                aria-label="Fechar"
              >
                &times;
              </button>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25 }}
                className="max-h-[85vh] max-w-[90vw] overflow-hidden rounded relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Amostra ampliada de corte"
                  referrerPolicy="no-referrer"
                  className="max-h-[80vh] max-w-full object-contain rounded border border-zinc-800"
                />
                <p className="text-center text-zinc-400 text-xs font-mono mt-3">
                  Clique fora da imagem para fechar
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
