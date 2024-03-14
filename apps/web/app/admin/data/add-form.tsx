'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ActionResult, createPrinterBrand } from './actions';

const formSchema = z.object({
	name: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export function AddForm() {
	const { pending } = useFormStatus();
	const [state, formAction] = useFormState(createPrinterBrand, {
		message: '',
		type: 'success',
	} satisfies ActionResult);

	const form = useForm<FormSchema>({ resolver: zodResolver(formSchema), defaultValues: { name: '' } });

	useEffect(() => {
		toast[state.type](state.message);
	}, [state]);

	const handleSubmit = () => {};

	return (
		<>
			<form action={formAction}>
				<label htmlFor="name">Enter Brand Name</label>
				<input id="name" name="name" required />
				<button type="submit" aria-disabled={pending}>
					Add
				</button>
			</form>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<input className="input" placeholder="" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</form>
			</Form>
		</>
	);
}
