import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface ProductSpec {
    label: string;
    value: string;
}

interface ProductDocument {
    name: string;
    url: string;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const product = await prisma.product.findFirst({
        where: { slug: slug },
        include: { category: true, brand: true }
    });

    if (!product) {
        notFound();
    }

    // Spec Parsing
    let specs: ProductSpec[] = [];
    if (product.specs) {
        try { specs = JSON.parse(product.specs as string); } catch (e) { specs = []; }
    }

    // Docs Parsing
    let documents: ProductDocument[] = [];
    if (product.documents) {
        try { documents = JSON.parse(product.documents as string); } catch (e) { documents = []; }
    }

    // Gallery Parsing
    let gallery: string[] = [];
    if (product.gallery) {
        try { gallery = JSON.parse(product.gallery as string); } catch (e) { gallery = []; }
    }

    const allImages = [product.image, ...gallery].filter(img => img && typeof img === 'string' && img.length > 0) as string[];

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 font-sans">
            <ParticleBackground />
            <Header />

            <main className="flex-grow pt-24 pb-16 relative z-10 container mx-auto px-4 md:px-6">

                {/* Breadcrumbs (Compact) */}
                <div className="mb-6 flex items-center gap-2 text-xs text-gray-400 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-kulanBlue">Главная</Link>
                    <i className="fas fa-chevron-right text-[10px]"></i>
                    <Link href="/catalog" className="hover:text-kulanBlue">Каталог</Link>
                    {product.category && (
                        <>
                            <i className="fas fa-chevron-right text-[10px]"></i>
                            <Link href={`/catalog?category=${product.category.slug}`} className="hover:text-kulanBlue">
                                {product.category.title}
                            </Link>
                        </>
                    )}
                </div>

                {/* Compact Top Section: Image + Info + Description */}
                <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">

                    {/* Left: Compact Image */}
                    <div className="w-full md:w-auto md:flex-shrink-0">
                        <div className="relative bg-white rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden w-full md:w-80 h-80 flex items-center justify-center p-4">
                            {allImages.length > 0 ? (
                                <Image
                                    src={allImages[0]}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="object-contain w-full h-full"
                                    priority
                                />
                            ) : (
                                <div className="text-gray-300">
                                    <i className="fas fa-box-open text-4xl opacity-50"></i>
                                </div>
                            )}
                        </div>

                        {allImages.length > 1 && (
                            <div className="flex gap-2 mt-2 w-full md:w-80 overflow-x-auto pb-1">
                                {allImages.map((img, idx) => (
                                    <button key={idx} className={`relative w-14 h-14 flex-shrink-0 bg-white rounded-lg border overflow-hidden hover:border-kulanBlue transition ${idx === 0 ? 'border-kulanBlue' : 'border-gray-100 dark:border-slate-700'}`}>
                                        <Image src={img} alt="" fill className="object-contain p-1" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Info & Description */}
                    <div className="flex-1 min-w-0 pt-2 flex flex-col h-full">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                            {product.category && (
                                <span className="inline-block px-2 py-1 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-gray-100 dark:border-slate-700">
                                    {product.category.title}
                                </span>
                            )}
                            {product.brand && (
                                <span className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-kulanBlue dark:text-blue-400 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-900/30">
                                    {product.brand.name}
                                </span>
                            )}
                            {product.article && (
                                <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-md text-[10px] font-bold uppercase tracking-wider border border-gray-200 dark:border-slate-600">
                                    Артикул: {product.article}
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 dark:text-white mb-3 leading-tight">
                            {product.name}
                        </h1>

                        {/* Description moved here */}
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed overflow-hidden">
                            <div
                                className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300 [&_*]:!bg-transparent [&_*]:!text-inherit dark:[&_*]:!text-gray-300 break-words max-w-none line-clamp-[10]"
                                dangerouslySetInnerHTML={{ __html: product.description || '' }}
                            />
                        </div>

                    </div>
                </div>

                {/* Bottom Section: Details Grid */}
                <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-slate-700 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Full Specs */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                                <i className="fas fa-list-ul text-gray-400 mr-2"></i> Характеристики
                            </h3>
                            {specs.length > 0 ? (
                                <div className="space-y-3">
                                    {specs.map((spec, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm group">
                                            <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition">{spec.label}</span>
                                            <div className="h-px bg-gray-100 dark:bg-slate-700 flex-grow mx-3 group-hover:bg-gray-200 dark:group-hover:bg-slate-600 transition"></div>
                                            <span className="text-gray-900 dark:text-white font-bold">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm italic">Характеристики не указаны</p>
                            )}
                        </div>

                        {/* Applicability & Docs */}
                        <div className="space-y-8">
                            {/* Applicability */}
                            <div>
                                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                                    <i className="fas fa-car text-gray-400 mr-2"></i> Применимость
                                </h3>
                                {product.applicability ? (
                                    <div
                                        className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 [&_*]:!bg-transparent [&_*]:!text-inherit dark:[&_*]:!text-gray-300 break-words"
                                        dangerouslySetInnerHTML={{ __html: product.applicability }}
                                    />
                                ) : (
                                    <p className="text-gray-400 text-sm italic">Не указана</p>
                                )}
                            </div>

                            {/* Docs */}
                            {documents.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                                        <i className="fas fa-file-pdf text-gray-400 mr-2"></i> Документы
                                    </h3>
                                    <div className="flex flex-col gap-2">
                                        {documents.map((doc, i) => (
                                            <a
                                                key={i}
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition border border-gray-100 dark:border-slate-600 group"
                                            >
                                                <i className="fas fa-file-alt text-gray-400 group-hover:text-kulanBlue transition"></i>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-kulanBlue dark:group-hover:text-blue-400 transition">
                                                    {doc.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
