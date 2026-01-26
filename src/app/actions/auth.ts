'use server';

import { prisma } from '@/lib/prisma';
import { login } from '@/lib/auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/lib/validations';
import type { FormState } from '@/types';

export async function authenticate(prevState: FormState | undefined, formData: FormData): Promise<FormState | never> {
    // Validate input with Zod
    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            error: 'Неверные данные формы',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: 'Неверный email или пароль' };
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return { error: 'Неверный email или пароль' };
        }

        // Login successful - create session
        await login({
            id: user.id,
            email: user.email,
            name: user.name || '',
            role: user.role
        });

    } catch (error) {
        console.error('Auth error:', error);
        return { error: 'Произошла ошибка при входе. Попробуйте позже.' };
    }

    redirect('/admin');
}
