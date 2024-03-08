'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { ActionResult, createPrinterBrand } from './actions';

export function AddForm() {
	const { pending } = useFormStatus();
	const [state, formAction] = useFormState(createPrinterBrand, {
		message: '',
		type: 'success',
	} satisfies ActionResult);

	useEffect(() => {
		toast[state.type](state.message);
	}, [state]);

	return (
		<form action={formAction}>
			<label htmlFor="name">Enter Brand Name</label>
			<input id="name" name="name" required />
			<button type="submit" aria-disabled={pending}>
				Add
			</button>
		</form>
	);
}
