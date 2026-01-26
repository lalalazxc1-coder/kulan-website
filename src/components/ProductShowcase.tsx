'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VanillaTilt from 'vanilla-tilt';
import { ProductCard } from '@/components/catalog/ProductCard';

interface Product {
    id: number;
    name: string;
    image: string | null;
    slug: string;
    article: string | null;
    brand?: {
        name: string;
        image: string | null;
    } | null;
}

export default function ProductShowcase({ products }: { products: Product[] }) {
    const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        tiltRefs.current.forEach((ref) => {
            if (ref) {
                VanillaTilt.init(ref, {
                    max: 2,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.1,
                    scale: 1.01,
                });
            }
        });

        // Cleanup
        return () => {
            // vanilla-tilt stores the instance on the element, but doesn't have a clean explicit destroy in d.ts often
            // Usually fine for this scope.
            tiltRefs.current.forEach((ref: any) => {
                if (ref && ref.vanillaTilt) ref.vanillaTilt.destroy();
            });
        };
    }, [products]);

    if (!products || products.length === 0) return null;

    return (
        <section className="min-h-[fit-content] lg:min-h-screen flex flex-col justify-center py-20 bg-transparent relative overflow-hidden scroll-mt-24" id="showcase">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400">
                        Витрина товаров
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        Актуальные позиции из нашего ассортимента. Подборка обновляется.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            ref={el => { tiltRefs.current[index] = el }}
                            className="h-full"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/catalog" className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl group">
                        <span>Перейти в каталог</span>
                        <i className="fas fa-arrow-right text-kulanBlue dark:text-blue-400 group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}
