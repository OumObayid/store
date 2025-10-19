import { ref } from "vue";
import { changeRole, deleteUser, getUsers } from "../services/userService"; // adapte le chemin si besoin
import { useUserStore } from "../stores/userStore";

export function useUsers() {
  const userStore = useUserStore();
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const message = ref(null);

  // 🟢 Charger tous les utilisateurs
  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    message.value = null;

    try {
      const response = await getUsers();
      if (response.data.success) {
        const listUsers = response.data.dataUsers || [];
        users.value = listUsers;
        userStore.setUsers(listUsers);
      } else message.value = response.data.message;
    } catch (err) {
      error.value =
        err.message || "Erreur réseau lors du chargement des utilisateurs.";
    } finally {
      loading.value = false;
    }
  };

  //Supprimer un utilisateur
  const removeUser = async (id) => {
    loading.value = true;
    error.value = null;
    message.value = null;

    try {
      const response = await deleteUser({ id });
      if (response.data.success) {
        userStore.deleteUser(id);
      }
      message.value = response.data.message;
    } catch (err) {
      error.value = err.message || "Erreur réseau lors de la suppression.";
    } finally {
      loading.value = false;
    }
  };
  // attribution des roles
  const changeRoleInUser = async (data) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await changeRole(data);
      console.log('response :', response);
      if (response.data.success) {
        userStore.updateRoleUser(data);
      } else error.value = response.data.message;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  return {
    // state
    users,
    loading,
    error,
    message,

    // actions
    fetchUsers,
    removeUser,
    changeRoleInUser,
  };
}
