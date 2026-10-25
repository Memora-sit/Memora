
const SUPABASE_URL = "https://sdwmsmjfqqorycaivipl.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Nlvthf8tCu0hwTMT7Bdgiw_omG42PlM";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("Memora : Supabase est chargé !");

