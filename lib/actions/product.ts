"use server"

import { revalidatePath } from "next/cache";
import { getUser } from "../helper/getUser";
import { prisma } from "../prisma";
import { z } from "zod"
import { redirect } from "next/navigation";


const ProductShema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().nonnegative("Price must be non-negative"),
    quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
    sku: z.string().optional(),
    lowStockAt: z.coerce.number().int().min(0).optional()
})

export const deleteInventory = async (formData: FormData) => {
    const user = await getUser();
    const id = String(formData.get("id"));
    return id ? (
        await prisma.product.delete({ where: { id, userId: user.id } }),
        revalidatePath('/inventory')
    ) : Promise.reject(new Error("Not getted id"))
}

export const addInventory = async (formData: FormData) => {
    const user = await getUser();

    const parsed = ProductShema.safeParse({
        name: formData.get("name"),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
        sku: formData.get("sku") || undefined,
        lowStockAt: formData.get("lowStockAt") || undefined,
    });

    if (!parsed.success) {
        throw new Error("Validation failed");
    }

    try {
        if (user.id) {
            await prisma.product.create({
                data: { ...parsed.data, userId: user.id }
            });
        }
    } catch (error) {
        console.log('error :>> ', error);
        throw new Error("Failed to  create product")
    } finally {
        redirect("/inventory")
    }
}