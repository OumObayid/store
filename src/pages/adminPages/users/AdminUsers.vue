<template>
    <div class="container-fluid py-4 user-management-page">

        <!-- 🧮 Cartes de statistiques -->
        <div class="row mb-4 g-3 d-flex justify-content-center">
            <div class="col-md-3" v-for="card in userStats" :key="card.title">
                <div class="card stat-card shadow-sm border-0">
                    <div class="card-body text-center">
                        <div class="icon-circle mb-3">
                            <i :class="card.icon"></i>
                        </div>
                        <h6 class="fw-bold text-secondary">{{ card.title }}</h6>
                        <span class="h4 fw-bold text-gold">{{ card.value }}</span>
                    </div>
                </div>
            </div>
        </div>


        <div class="row mb-3 d-md-flex justify-content-center">
            <!-- Recherche par prénom / nom -->
            <div class="col-md-6 mb-2">
                <input type="text" v-model="userSearch" class="form-control border-gold rounded-4"
                    :placeholder="$t('searchByFirstOrLastName')" />
            </div>

            <!-- Filtre par rôle -->
            <div class="col-md-3 mb-2">
                <select v-model="userFilterAdmin" class="form-select border-gold rounded-4">
                    <option value="">{{$t('allUsers')}}</option>
                    <option value="admin">{{$t('admin')}}</option>
                    <option value="user">{{$t('user')}}</option>
                </select>
            </div>
        </div>


        <div class="tab-content" id="userTabsContent">
            <!-- 🧍‍♀️ Utilisateurs -->
            <div class="tab-pane fade show active" id="users" role="tabpanel">
                <div class=" border-0 shadow-sm mb-4">

                    <div class="table-responsive">
                        <table style="font-size: 14px; text-align: left;" class="table align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>#</th>
                                    <th style="width: 10%;">{{ $t('firstname') }}</th>
                                    <th style="width: 10%;">{{ $t('lastname') }}</th>
                                    <th>{{ $t('email') }}</th>
                                    <th>{{ $t('tel') }}</th>
                                    <th>{{ $t('address') }}</th>
                                    <th style="width: 12%;">{{ $t('role') }}</th>
                                    <th>{{ $t('actions') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in filteredUsers" :key="user.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ user.firstname }}</td>
                                    <td>{{ user.lastname }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.tel }}</td>
                                    <td>{{ user.address }}</td>
                                    <td>
                                        <select v-model="user.role" @change="handleChangeRole(user.id, user.role)"
                                            class="form-select form-select-sm border-gold rounded-2">
                                            <option value="admin">{{ $t('admin') }}</option>
                                            <option value="user">{{ $t('user') }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="filteredUsers.length === 0">
                                    <td colspan="6" class="text-center text-muted py-4">
                                        {{ $t('noUsersFound') }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useUsers } from "../../../composables/useUsers";
import { useUserStore } from "../../../stores/userStore";
import { useI18n } from "vue-i18n";


const {t} = useI18n();
const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const { error: error_changeRole, error: error_removeUser, changeRoleInUser, removeUser } = useUsers()

/* 🧮 Statistiques globales */
const userStats = computed(() => [
    { title: t('totalUsers'), value: users.value?.filter(u => u.role !== 'admin')?.length || 0, icon: "bi bi-people-fill" },
    { title: t('totalAdmins'), value: users.value?.filter(u => u.role === 'admin')?.length || 0, icon: "bi bi-person-badge-fill" },
]);

/* 🔍 Recherche + filtres */
const userSearch = ref("");
const userFilterAdmin = ref(""); // "" = tous, "admin" = admins, "user" = utilisateurs normaux

/* 🧮 Filtres dynamiques */
const filteredUsers = computed(() => {
    return users.value.filter((user) => {
        // Recherche par firstname ou lastname
        const matchesSearch =
            user.firstname?.toLowerCase().includes(userSearch.value?.toLowerCase()) ||
            user.lastname?.toLowerCase().includes(userSearch.value?.toLowerCase()) ||
            user.email?.toLowerCase().includes(userSearch.value?.toLowerCase())
            ;

        // Filtre par rôle
        const matchesRole =
            userFilterAdmin.value === "" ||
            (userFilterAdmin.value === "admin" && user.role === "admin") ||
            (userFilterAdmin.value === "user" && user.role !== "admin");

        return matchesSearch && matchesRole;
    });
});


const handleChangeRole = async (id, role) => {
    await changeRoleInUser({ id, role })
    if (!error_changeRole.value)
        alert(t('roleChangedSuccessfully'))
    else alert(t('userRoleChangeError'))
}

const deleteUser = async (id) => {
    if (confirm(t('areYouSureDeleteUser'))) {
        await removeUser(id);
        if (!error_removeUser.value)
            alert(t('userDeletedSuccessfully'))
        else alert(t('userDeleteError'))
    }
}


</script>

<style scoped>
.user-management-page {
    background-color: #f8f9fa;
}

/* Couleur dorée */
.text-gold {
    color: #b78b1e;
}

.btn-gold {
    background: linear-gradient(to right, #d4af37, #b78b1e);
    color: white;
    border: none;
    transition: all 0.3s ease;
}

.btn-gold:hover {
    transform: translateY(-2px);
    background: linear-gradient(to right, #b78b1e, #d4af37);
}

/* .btn-outline-gold {
    border: 1px solid #b78b1e;
    color: #b78b1e;
    transition: all 0.3s ease;
}

.btn-outline-gold:hover {
    background-color: #b78b1e;
    color: white;
} */

.stat-card {
    border-radius: 12px;
    transition: transform 0.2s ease;
}

.stat-card:hover {
    transform: scale(1.03);
}

.icon-circle {
    width: 55px;
    height: 55px;
    background: linear-gradient(145deg, #f1d27a, #e8c45c);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.icon-circle i {
    font-size: 1.5rem;
    color: #fff;
}

.bg-gold {
    background-color: #f1d27a !important;
    color: #3b2e07 !important;
}

.table th {
    font-weight: 600;
    color: #6c757d;
}

.card {
    border-radius: 12px;
}

.nav-tabs .nav-link {
    font-weight: 600;
    color: #6c757d;
}

.nav-tabs .nav-link.active {
    color: #b78b1e;
    border-color: #b78b1e #b78b1e transparent;
}
</style>
