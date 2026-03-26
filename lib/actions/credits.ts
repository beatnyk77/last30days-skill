import { createClient } from "@/lib/supabase/server";

export async function getCredits(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("credits, tier, max_pipelines")
        .eq("id", userId)
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function consumeCredit(userId: string, amount: number = 1) {
    const supabase = createClient();

    // Rpc call to decrement credits atomically to prevent race conditions
    const { data, error } = await supabase.rpc("decrement_credits", {
        user_id: userId,
        amount: amount
    });

    if (error) throw new Error(error.message);

    if (data === false) {
        throw new Error("Insufficient tactical credits.");
    }

    return true;
}
