import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  primaryKey,
  decimal,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').default('User'),
  mustChangePassword: boolean('must_change_password').notNull().default(false),
  profileVerified: boolean('profile_verified').notNull().default(false),
  passwordChangedAt: timestamp('password_changed_at'),
  profileVerifiedAt: timestamp('profile_verified_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  sessionId: text('session_id').notNull().unique(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  refreshToken: text('refresh_token').notNull(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow(),
  lastUsedAt: timestamp('last_used_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
  revokedAt: timestamp('revoked_at'),
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const userRoles = pgTable(
  'user_roles',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.roleId] }),
  }),
);

export const buildings = pgTable('buildings', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  zipCode: varchar('zip_code', { length: 20 }).notNull(),
  country: varchar('country', { length: 100 }).default('USA'),

  // Building details
  type: varchar('type', { length: 50 }).notNull(), // Residential, Commercial, Mixed, etc.
  totalUnits: integer('total_units').notNull().default(0),
  yearBuilt: integer('year_built'),
  squareFootage: integer('square_footage'),
  numberOfFloors: integer('number_of_floors'),

  // Financial
  purchasePrice: decimal('purchase_price', { precision: 12, scale: 2 }),
  monthlyRent: decimal('monthly_rent', { precision: 10, scale: 2 }),
  propertyTax: decimal('property_tax', { precision: 10, scale: 2 }),
  insurance: decimal('insurance', { precision: 10, scale: 2 }),

  // Status and management
  status: varchar('status', { length: 20 }).default('active'), // active, inactive, maintenance
  managerId: integer('manager_id').references(() => users.id, {
    onDelete: 'set null',
  }),

  // Coordinates for mapping
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),

  // Images and documents
  imageUrl: text('image_url'),
  description: text('description'),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const adminActivity = pgTable('admin_activity', {
  id: serial('id').primaryKey(),
  adminId: integer('admin_id').notNull(),
  action: text('action').notNull(),
  target: text('target').notNull(),
  details: text('details'),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const schema = {
  users,
  sessions,
  roles,
  userRoles,
  buildings,
  adminActivity,
};
