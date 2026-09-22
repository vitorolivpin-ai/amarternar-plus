import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Lê o endereço antes do Supabase limpar a URL.
const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

// A usuária chegou pelo link de "Esqueci minha senha".
export const isPasswordRecovery = currentHash.includes('type=recovery');

// O link usado já expirou ou é inválido.
export const isExpiredAuthLink =
  currentHash.includes('otp_expired') || currentHash.includes('access_denied');

// Evita que o app quebre se as variáveis não estiverem configuradas.
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
