'use server';

import { db } from '@/db';
import { printer_brands } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type ActionResult = {
	message: string;
	type: 'success' | 'error' | 'info' | 'warning';
};

export async function createPrinterBrand(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
	const schema = z.object({
		name: z.string().min(1),
	});

	const parse = schema.safeParse({
		name: formData.get('name'),
	});

	if (!parse.success) {
		return {
			type: 'error',
			message: 'Name is required',
		};
	}

	const data = parse.data;

	try {
		await db.insert(printer_brands).values(data);
		revalidatePath('/admin/data');
		return {
			type: 'success',
			message: `Added Printer Brand: ${data.name}`,
		};
	} catch (e) {
		return {
			type: 'error',
			message: `Failed to create Printer Brand: ${data.name}`,
		};
	}
}
