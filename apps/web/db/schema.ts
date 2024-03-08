import {
	bigint,
	bigserial,
	index,
	interval,
	jsonb,
	numeric,
	pgSchema,
	text,
	timestamp,
	uniqueIndex,
} from 'drizzle-orm/pg-core';

export const spoolhubSchema = pgSchema('spoolhub');

export const locations = spoolhubSchema.table(
	'locations',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		name: text('name'),
		user_id: text('user_id').notNull(),
		description: text('description'),
		type: text('type'),
	},
	(table) => ({
		typeIndex: index('locations_type_idx').on(table.type),
	}),
);

export const spools = spoolhubSchema.table(
	'spools',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		user_id: text('user_id').notNull(),
		sku: text('sku'),
		material: text('material'),
		color_name: text('color_name'),
		color: text('color'),
		brand: text('brand'),
		original_quantity: numeric('original_quantity', { precision: 12, scale: 2 }),
		remaining_quantity: numeric('remaining_quantity', { precision: 12, scale: 2 }),
		purchase_price: numeric('purchase_price', { precision: 12, scale: 2 }),
		purchase_date: timestamp('purchase_date', { withTimezone: true }),
		location_id: bigint('location_id', { mode: 'number' }).references(() => locations.id),
		last_dried_date: timestamp('last_dried_date', { withTimezone: true }),
		tags: jsonb('tags'),
	},
	(table) => ({
		skuIndex: index('spools_sku_idx').on(table.sku),
		userIdIndex: index('spools_user_id_idx').on(table.user_id),
		originalQuantityIndex: index('spools_original_quantity_idx').on(table.original_quantity),
		materialIndex: index('spools_material_idx').on(table.material),
		colorNameIndex: index('spools_color_name_idx').on(table.color_name),
		brandIndex: index('spools_brand_idx').on(table.brand),
	}),
);

export const user_printers = spoolhubSchema.table(
	'user_printers',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		user_id: text('user_id').notNull(),
		printer_model_id: bigint('printer_model_id', { mode: 'number' })
			.references(() => printer_models.id)
			.notNull(),
		printer_brand_id: bigint('printer_brand_id', { mode: 'number' })
			.references(() => printer_brands.id)
			.notNull(),
		nickname: text('nickname'),
		location_ids: jsonb('location_ids'),
		tags: jsonb('tags'),
	},
	(table) => ({
		userNicknameIndex: uniqueIndex('user_printers_user_nickname_idx').on(table.user_id, table.nickname),
	}),
);

export const prints = spoolhubSchema.table(
	'prints',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		name: text('name'),
		url: text('url'),
		user_id: text('user_id').notNull(),
		start_time: timestamp('start_time', { withTimezone: true }),
		duration: interval('duration', { precision: 0 }),
		user_printer_id: bigint('user_printer_id', { mode: 'number' }).references(() => user_printers.id),
		status: text('status'),
		tags: jsonb('tags'),
	},
	(table) => ({
		userIdIndex: index('prints_user_id_idx').on(table.user_id),
		userPrinterId: index('prints_user_printer_id_idx').on(table.user_printer_id),
	}),
);

export const print_spools = spoolhubSchema.table('print_spools', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	print_id: bigint('print_id', { mode: 'number' }).references(() => prints.id),
	spool_id: bigint('spool_id', { mode: 'number' }).references(() => spools.id),
	amount_used: numeric('amount_used', { precision: 12, scale: 2 }),
});

export const filament_types = spoolhubSchema.table(
	'filament_types',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		name: text('name'),
		user_id: text('user_id'),
	},
	(table) => ({
		nameIndex: index('filament_types_name_idx').on(table.name),
		userIdIndex: index('filament_types_user_id_idx').on(table.user_id),
	}),
);

export const filament_brands = spoolhubSchema.table(
	'filament_brands',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		name: text('name'),
		user_id: text('user_id'),
	},
	(table) => ({
		nameIndex: index('filament_brands_name_idx').on(table.name),
		userIdIndex: index('filament_brands_user_id_idx').on(table.user_id),
	}),
);

export const printer_brands = spoolhubSchema.table(
	'printer_brands',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		name: text('name'),
		user_id: text('user_id'),
	},
	(table) => ({
		nameIndex: index('printer_brands_name_idx').on(table.name),
		userIdIndex: index('printer_brands_user_id_idx').on(table.user_id),
	}),
);

export type PrinterBrand = typeof printer_brands.$inferSelect;
export type NewPrinterBrand = typeof printer_brands.$inferInsert;

export const printer_models = spoolhubSchema.table(
	'printer_models',
	{
		id: bigserial('id', { mode: 'number' }).primaryKey(),
		printer_brand_id: bigint('printer_brand_id', { mode: 'number' })
			.references(() => printer_brands.id)
			.notNull(),
		name: text('name'),
		user_id: text('user_id'),
	},
	(table) => ({
		nameIndex: index('printer_models_name_idx').on(table.name),
		userIdIndex: index('printer_models_user_id_idx').on(table.user_id),
	}),
);
