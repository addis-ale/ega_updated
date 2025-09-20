import { db } from "@/db";
import { cartItems, carts, products } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import axios from "axios";

export const checkoutRoute = createTRPCRouter({
  sendInvoice: protectedProcedure
    .input(
      z.object({
        cartItemIds: z.array(z.string()),
        telegramUsername: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [userCart] = await db
        .select()
        .from(carts)
        .where(eq(carts.userId, ctx.auth.user.id));
      if (!userCart) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }
      const items = await db
        .select()
        .from(cartItems)
        .where(inArray(cartItems.id, input.cartItemIds));

      if (!items || items.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No cart items found.",
        });
      }

      const cartDetails = await Promise.all(
        items.map(async (item) => {
          const product = await db
            .select()
            .from(products)
            .where(eq(products.id, item.productId))
            .limit(1)
            .then((res) => res[0]);

          return {
            name: product?.name ?? "Unknown Product",
            quantity: item.quantity,
            actionType: item.actionType,
            rentalStartDate: item.rentalStartDate,
            rentalEndDate: item.rentalEndDate,
            rentalDateDuration: item.rentalDateDuration ?? 0,
            total:
              item.actionType === "SALE"
                ? Number(item.salePriceAtAdd ?? 0) * item.quantity
                : (item.rentalDateDuration ?? 0) *
                  Number(item.rentalPriceAtAdd ?? 0) *
                  item.quantity,
          };
        })
      );

      let message = `🧾 *New Order Received!*\n`;
      message += `👤 Customer: ${input.telegramUsername}\n\n`;

      let grandTotal = 0;

      cartDetails.forEach((item, i) => {
        grandTotal += item.total;

        message += `📦 *${i + 1}. ${item.name}*\n`;
        message += `   🔖 Type: ${item.actionType}\n`;
        message += `   🔢 Quantity: ${item.quantity}\n`;

        if (item.actionType === "RENT") {
          message += `   📅 Rental: ${item.rentalStartDate
            ?.toISOString()
            .slice(0, 10)} → ${item.rentalEndDate
            ?.toISOString()
            .slice(0, 10)} (${item.rentalDateDuration} days)\n`;
        }

        message += `   💰 Total: *${item.total} ETB*\n\n`;
      });

      message += `━━━━━━━━━━━━━━━\n`;
      message += `🧮 *Grand Total: ${grandTotal} ETB* 🧮\n`;

      const botToken = process.env.BOT_TOKEN!;
      const chatId = process.env.ADMIN_CHAT_ID!;

      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      await db
        .delete(cartItems)
        .where(inArray(cartItems.id, input.cartItemIds));
      return { success: true };
    }),
});
