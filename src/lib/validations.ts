import { z } from 'zod';

// ==========================================
// Product Validation Schemas
// ==========================================

export const ProductSpecSchema = z.object({
    label: z.string().min(1, 'Название характеристики обязательно'),
    value: z.string().min(1, 'Значение обязательно'),
});

export const ProductDocumentSchema = z.object({
    name: z.string().min(1, 'Название документа обязательно'),
    url: z.string().url('Некорректный URL документа'),
});

export const CreateProductSchema = z.object({
    name: z.string().min(3, 'Минимум 3 символа').max(255, 'Максимум 255 символов'),
    slug: z.string()
        .min(3, 'Минимум 3 символа')
        .max(255, 'Максимум 255 символов')
        .regex(/^[a-z0-9-]+$/, 'Только латиница, цифры и дефисы в нижнем регистре'),
    article: z.string().max(100, 'Максимум 100 символов').optional().nullable(),
    description: z.string().optional().nullable(),
    applicability: z.string().optional().nullable(),

    categoryId: z.coerce.number().int().positive('Выберите категорию').optional().nullable(),
    brandId: z.coerce.number().int().positive('Выберите бренд').optional().nullable(),

    specs: z.array(ProductSpecSchema).optional().default([]),
    documents: z.array(ProductDocumentSchema).optional().default([]),
});

export const UpdateProductSchema = CreateProductSchema.partial().extend({
    id: z.coerce.number().int().positive('ID обязателен'),
});

// ==========================================
// Category Validation Schemas
// ==========================================

export const CreateCategorySchema = z.object({
    title: z.string().min(2, 'Минимум 2 символа').max(255, 'Максимум 255 символов'),
    slug: z.string()
        .min(2, 'Минимум 2 символа')
        .max(255, 'Максимум 255 символов')
        .regex(/^[a-z0-9-]+$/, 'Только латиница, цифры и дефисы в нижнем регистре'),
    parentId: z.coerce.number().int().positive().optional().nullable(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
    id: z.coerce.number().int().positive('ID обязателен'),
});

// ==========================================
// Brand Validation Schemas
// ==========================================

export const CreateBrandSchema = z.object({
    name: z.string().min(2, 'Минимум 2 символа').max(255, 'Максимум 255 символов'),
    slug: z.string()
        .min(2, 'Минимум 2 символа')
        .max(255, 'Максимум 255 символов')
        .regex(/^[a-z0-9-]+$/, 'Только латиница, цифры и дефисы в нижнем регистре'),
});

export const UpdateBrandSchema = CreateBrandSchema.partial().extend({
    id: z.coerce.number().int().positive('ID обязателен'),
});

// ==========================================
// User Validation Schemas
// ==========================================

export const CreateUserSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(8, 'Минимум 8 символов').max(100, 'Максимум 100 символов'),
    name: z.string().min(2, 'Минимум 2 символа').max(255, 'Максимум 255 символов').optional().nullable(),
    role: z.enum(['admin', 'editor']).default('admin'),
});

export const UpdateUserSchema = z.object({
    id: z.coerce.number().int().positive('ID обязателен'),
    email: z.string().email('Некорректный email').optional(),
    password: z.string().min(8, 'Минимум 8 символов').max(100, 'Максимум 100 символов').optional(),
    name: z.string().min(2, 'Минимум 2 символа').max(255, 'Максимум 255 символов').optional().nullable(),
    role: z.enum(['admin', 'editor']).optional(),
});

// ==========================================
// Auth Validation Schemas
// ==========================================

export const LoginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(1, 'Пароль обязателен'),
});

// ==========================================
// Settings Validation Schemas
// ==========================================

export const SiteSettingSchema = z.object({
    key: z.string().min(1, 'Ключ обязателен'),
    value: z.string().min(1, 'Значение обязательно'),
    label: z.string().optional().nullable(),
});

// ==========================================
// Branch Validation Schemas
// ==========================================

export const BranchLocationSchema = z.object({
    id: z.coerce.number().int().positive().optional(),
    name_ru: z.string().optional().nullable(),
    name_kk: z.string().optional().nullable(),
    name_en: z.string().optional().nullable(),
    address_ru: z.string().min(1, 'Адрес (RU) обязателен'),
    address_kk: z.string().min(1, 'Адрес (KK) обязателен'),
    address_en: z.string().min(1, 'Адрес (EN) обязателен'),
    phones: z.string().optional().nullable(),
    emails: z.string().optional().nullable(),
    type: z.enum(['office', 'warehouse', 'head_office']),
    sortOrder: z.coerce.number().int().default(0),
});

export const CreateBranchSchema = z.object({
    slug: z.string()
        .min(2, 'Минимум 2 символа')
        .max(100, 'Максимум 100 символов')
        .regex(/^[a-z0-9-]+$/, 'Только латиница, цифры и дефисы в нижнем регистре'),
    name_ru: z.string().min(1, 'Название (RU) обязательно'),
    name_kk: z.string().min(1, 'Название (KK) обязательно'),
    name_en: z.string().min(1, 'Название (EN) обязательно'),
    sortOrder: z.coerce.number().int().default(0),
    locations: z.array(BranchLocationSchema).optional().default([]),
});

export const UpdateBranchSchema = CreateBranchSchema.partial().extend({
    id: z.coerce.number().int().positive('ID обязателен'),
});

// ==========================================
// Type Exports (for use in components)
// ==========================================

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type CreateBrandInput = z.infer<typeof CreateBrandSchema>;
export type UpdateBrandInput = z.infer<typeof UpdateBrandSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type SiteSettingInput = z.infer<typeof SiteSettingSchema>;
export type CreateBranchInput = z.infer<typeof CreateBranchSchema>;
export type UpdateBranchInput = z.infer<typeof UpdateBranchSchema>;
