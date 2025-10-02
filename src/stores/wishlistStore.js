import { defineStore } from "pinia";

export const useWishlistStore = defineStore("wishlistStore", {
  state: () => ({
    // On initialise la wishlist à partir du localStorage si elle existe,
    // sinon on met un tableau vide.
    // JSON.parse transforme la chaîne stockée en tableau JS.
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [], 
  }),

  actions: {
    addToWishlist(product) {
      // éviter les doublons
      const exists = this.wishlist.find((p) => p.id === product.id);
      if (!exists) {
        this.wishlist.push(product);
         // Sauvegarde la wishlist dans le localStorage
        // JSON.stringify transforme le tableau JS en chaîne pour stockage
        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
      }
    },

    removeFromWishlist(productId) {
      this.wishlist = this.wishlist.filter((p) => p.id !== productId);
      // Met à jour le localStorage
       localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },

    clearWishlist() {
      this.wishlist = [];
       // Supprime la clé du localStorage
      localStorage.removeItem("wishlist");
    },
  },
});
