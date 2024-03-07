import { db } from '@/db';
import { checkRole } from '@/utils/roles';
import { redirect } from 'next/navigation';

export default async function DataDashboard(params: { searchParams: { search?: string } }) {
	if (!checkRole('admin')) redirect('/');

	const printerBrands = await db.query.printer_brands.findMany();

	return (
		<>
			<div>
				<h2>Printer Brands</h2>
				<ul>
					{printerBrands.map((brand) => (
						<li key={brand.id}>{brand.name}</li>
					))}
				</ul>
			</div>
		</>
	);
}
