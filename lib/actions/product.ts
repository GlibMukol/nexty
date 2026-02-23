"use server"

import { revalidatePath } from "next/cache";
import { getUser } from "../helper/getUser";
import { prisma } from "../prisma"

export const deleteInventory = async (formData: FormData) => {
    const user = await getUser();
    const id = String(formData.get("id"));
    return id ? (
        await prisma.product.delete({ where: { id, userId: user.id } }),
        revalidatePath('/inventory')
    ) : Promise.reject(new Error("Not getted id"))
} 