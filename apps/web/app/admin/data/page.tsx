import { db } from '@/db';
import { AddForm } from './add-form';

export default async function DataDashboard() {
	const printerBrands = await db.query.printer_brands.findMany();

	return (
		<>
			<div>
				<h2>Printer Brands</h2>
				<AddForm />
				<ul>
					{printerBrands.map((brand) => (
						<li key={brand.id}>{brand.name}</li>
					))}
				</ul>
			</div>
		</>
	);
}
