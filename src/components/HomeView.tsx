"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MissionSection } from "@/components/MissionSection";
import { CareerSection } from "@/components/CareerSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { CTASection } from "@/components/CTASection";

import { FloatingControls } from "@/components/FloatingControls";
import { FeedbackModal } from "@/components/FeedbackModal";
import { ParticleBackground } from "@/components/ParticleBackground";
import ProductShowcase from "@/components/ProductShowcase";
import type { ProductWithCategoryAndBrand } from "@/types";

interface HomeViewProps {
    metrics: {
        stat_years: string;
        stat_clients: string;
        stat_brands: string;
        stat_branches: string;
        stat_employees: string;
    },
    products?: ProductWithCategoryAndBrand[]
}

export function HomeView({ metrics, products = [] }: HomeViewProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 font-sans">
            <ParticleBackground />
            <FloatingControls />
            <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Header />

            <main className="relative z-10 w-full">
                <HeroSection metrics={metrics} />
                <ProductShowcase products={products || []} />
                <AboutSection />
                <MissionSection />
                <ProjectsSection />
                <CareerSection metrics={metrics} />
                <CTASection onOpenModal={() => setIsModalOpen(true)} />
            </main>

            <Footer />
        </div>
    );
}
