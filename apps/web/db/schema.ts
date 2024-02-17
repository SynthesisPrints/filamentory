import {
	bigserial,
	pgTable,
	uniqueIndex,
	text,
	index,
	timestamp,
	jsonb,
	numeric,
	bigint,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: bigserial("id", {mode: 'number'}).primaryKey(),
	username: text('username').unique(),
	email: text('email').unique(),
});

export const locations = pgTable('locations', {
	id: bigserial("id", {mode: 'number'}).primaryKey(),
	name: text('name'),
	user_id: bigint('user_id', {mode: 'number'}).references(() => users.id),
	description: text('description'),
	type: text('type'),
}, (table) => ({
	typeIndex: index('locations_type_idx').on(table.type),
}));

export const spools = pgTable('spools', {
	id: bigserial("id", {mode: 'number'}).primaryKey(),
	user_id: bigint('user_id', {mode: 'number'}).references(() => users.id),
	sku: text('sku'),
	material: text('material'),
	color_name: text('color_name'),
	color: text('color'),
	brand: text('brand'),
	original_quantity: numeric('original_quantity', { precision: 12, scale: 2 }),
	remaining_quantity: numeric('remaining_quantity', { precision: 12, scale: 2 }),
	purchase_price: numeric('purchase_price', { precision: 12, scale: 2 }),
	purchase_date: timestamp('purchase_date', { withTimezone: true }),
	location_id: bigint('location_id', {mode: 'number'}).references(() => locations.id),
	last_dried_date: timestamp('last_dried_date', { withTimezone: true }),
	tags: jsonb('tags'),
}, (table) => ({
	skuIndex: index('spools_sku_idx').on(table.sku),
	userIdIndex: index('spools_user_id_idx').on(table.user_id),
	originalQuantityIndex: index('spools_original_quantity_idx').on(table.original_quantity),
	materialIndex: index('spools_material_idx').on(table.material),
	colorNameIndex: index('spools_color_name_idx').on(table.color_name),
	brandIndex: index('spools_brand_idx').on(table.brand),
}));

export const printers = pgTable('printers', {
	id: bigserial("id", {mode: 'number'}).primaryKey(),
	name: text('name'),
	type: text('type'),
	location_ids: jsonb('location_ids'),
});

export const user_printers = pgTable('user_printers', {
	id: bigserial("id", {mode: 'number'}).primaryKey(),
	user_id: bigint('user_id', {mode: 'number'}).references(() => users.id),
	printer_id: bigint('printer_id', {mode: 'number'}).references(() => printers.id),
	nickname: text('nickname'),
	location_ids: jsonb('location_ids'),
	tags: jsonb('tags'),
}, (table) => ({
	userNicknameIndex: uniqueIndex('user_printers_user_nickname_idx').on(table.user_id, table.nickname),
}));

export const prints = pgTable('prints', {
	id: bigserial("id", {mode: 'number'}).primaryKey(),
	name: text('name'),
	url: text('url'),
	user_id: bigint('user_id', {mode: 'number'}).references(() => users.id),
	start_time: timestamp('start_time', { withTimezone: true }),
	end_time: timestamp('end_time', { withTimezone: true }),
	user_printer_id: bigint('user_printer_id', {mode: 'number'}).references(() => user_printers.id),
	status: text('status'),
	tags: jsonb('tags'),
}, (table) => ({
	userIdIndex: index('prints_user_id_idx').on(table.user_id),
	userPrinterId: index('prints_user_printer_id_idx').on(table.user_printer_id),
}));

export const print_spools = pgTable('print_spools', {
	id: bigserial("id", {mode: 'number'}).primaryKey(),
	print_id: bigint('print_id', {mode: 'number'}).references(() => prints.id),
	spool_id: bigint('spool_id', {mode: 'number'}).references(() => spools.id),
	amount_used: numeric('amount_used', { precision: 12, scale: 2 }),
});
