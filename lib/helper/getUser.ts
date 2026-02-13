import { neonAuth } from "@neondatabase/auth/next/server"
import { redirect } from "next/navigation";

export const getUser = async () => {
    const { user } = await neonAuth();
    !user && redirect("/auth/sign-in");
    return {
        ...user
    };
}