import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  numeric,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
export const rentOrSaleOrBothEnum = pgEnum("rent_or_sale_or_both", [
  "RENT",
  "SALE",
  "BOTH",
]);
export const actionTypeEnum = pgEnum("action_type", ["RENT", "SALE"]);
export const products = pgTable("products", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  rentOrSale: rentOrSaleOrBothEnum("rent_or_sale_or_both").default("SALE"),
  description: text("description"),
  sellingPrice: numeric("selling_price", { precision: 10, scale: 2 }),
  rentalPrice: numeric("rental_price", { precision: 10, scale: 2 }),
  discountPercentage: numeric("discount_percentage", {
    precision: 4,
    scale: 2,
  }),
  categoryId: text("category_id").references(() => categories.id),
  isPosted: boolean("is_posted").default(false),
  views: numeric("views", { precision: 10, scale: 0 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const productImages = pgTable("product_images", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => nanoid()),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  isCoverImage: boolean("is_cover").default(false),
  imageUrl: text("image_url").notNull(),
});
export const categories = pgTable("categories", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => nanoid()),
  name: text("name").notNull().unique(),
});
export const carts = pgTable("carts", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
});
export const cartItems = pgTable(
  "cart_items",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$default(() => nanoid()),
    cartId: text("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    actionType: actionTypeEnum("action_type").notNull(),
    salePriceAtAdd: numeric("sale_price_at_add", { precision: 10, scale: 2 }),
    rentalPriceAtAdd: numeric("rental_price_at_add", {
      precision: 10,
      scale: 2,
    }),
    rentalStartDate: timestamp("rental_start_date"),
    rentalEndDate: timestamp("rental_end_date"),
    rentalDateDuration: integer("rental_date_duration"),
  },
  (table) => [unique().on(table.cartId, table.productId)]
);
export const favorites = pgTable("favorites", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$default(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
});
export const favoriteItems = pgTable(
  "favorite_items",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$default(() => nanoid()),
    favoriteId: text("favorite_id")
      .notNull()
      .references(() => favorites.id, { onDelete: "cascade" }),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
  },
  (table) => [unique().on(table.favoriteId, table.productId)]
);
