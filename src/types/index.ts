import { Prisma } from '@prisma/client';

// ==========================================
// Product Types
// ==========================================

export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: {
        category: true;
        brand: true;
        createdBy: true;
    }
}>;

export type ProductWithCategory = Prisma.ProductGetPayload<{
    include: { category: true }
}>;

export type ProductWithBrand = Prisma.ProductGetPayload<{
    include: { brand: true }
}>;

export type ProductWithCategoryAndBrand = Prisma.ProductGetPayload<{
    include: {
        category: true;
        brand: true;
    }
}>;

// ==========================================
// Category Types
// ==========================================

export type CategoryWithChildren = Prisma.CategoryGetPayload<{
    include: { children: true }
}>;

export type CategoryWithParent = Prisma.CategoryGetPayload<{
    include: { parent: true }
}>;

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
    include: { products: true }
}>;

export interface CategoryNode extends Prisma.CategoryGetPayload<{}> {
    children: CategoryNode[];
}

// ==========================================
// Brand Types
// ==========================================

export type BrandWithProducts = Prisma.BrandGetPayload<{
    include: { products: true }
}>;

// ==========================================
// User Types
// ==========================================

export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        products: true;
        categories: true;
        brands: true;
    }
}>;

export type SafeUser = Omit<Prisma.UserGetPayload<{}>, 'password'>;

// ==========================================
// Branch Types
// ==========================================

export type BranchWithLocations = Prisma.BranchGetPayload<{
    include: { locations: true }
}>;

export type BranchLocationWithBranch = Prisma.BranchLocationGetPayload<{
    include: { branch: true }
}>;

// ==========================================
// Common Utility Types
// ==========================================

export type PaginatedResult<T> = {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

export type ServerActionResult<T = void> =
    | { success: true; data: T }
    | { success: false; error: string; errors?: Record<string, string[]> };

// ==========================================
// API Response Types
// ==========================================

export interface ApiError {
    message: string;
    code?: string;
    field?: string;
}

export interface ApiSuccess<T = unknown> {
    data: T;
    message?: string;
}

// ==========================================
// Form State Types (for useActionState)
// ==========================================

export interface FormState {
    error?: string;
    errors?: Record<string, string[]>;
    success?: boolean;
    message?: string;
}

// ==========================================
// Translation Types
// ==========================================

export type Language = 'ru' | 'en' | 'kk';

export interface TranslationDictionary {
    [key: string]: string;
}

export interface Translations {
    ru: TranslationDictionary;
    en: TranslationDictionary;
    kk: TranslationDictionary;
}
