import { ref } from "vue";

export function useToken() {
  const token = ref("");

  // Génère un token aléatoire
  function generateToken(length = 32) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    token.value = result;
    return token.value;
  }



  return {
    token,
    generateToken,
  };
}
