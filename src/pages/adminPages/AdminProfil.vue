<template>
  <div class="container-fluid-md pt-3 ">
        <!-- Informations personnelles -->
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <div class="d-flex justify-content-end mb-3">
                    <MyButton class="outline py-1" @click="toggleEdit">
                        <i :class="isEditing ? 'bi bi-check-circle me-1' : 'bi bi-pencil me-1'"></i>
                        {{ isEditing ? $t('save') : $t('edit') }}
                    </MyButton>
                </div>

                <form @submit.prevent="handleUpdateProfile">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">{{ $t('firstname') }}</label>
                            <input v-model="form.firstname" type="text" class="form-control" :disabled="!isEditing" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">{{ $t('lastname') }}</label>
                            <input v-model="form.lastname" type="text" class="form-control" :disabled="!isEditing" />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">{{ $t('email') }}</label>
                            <input v-model="form.email" type="email" class="form-control" disabled />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">{{ $t('tel') }}</label>
                            <input v-model="form.tel" type="text" class="form-control" :disabled="!isEditing" />
                        </div>

                        <div class="col-12">
                            <label class="form-label">{{ $t('address') }}</label>
                            <textarea v-model="form.address" class="form-control" rows="2"
                                :disabled="!isEditing"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modifier le mot de passe -->
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="fw-semibold mb-3">
                    <i class="bi bi-lock me-2"></i> Modifier le mot de passe
                </h5>

                <form @submit.prevent="handleChangePassword">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Ancien mot de passe</label>
                            <input v-model="passwordForm.oldPassword" type="password" class="form-control" required />
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Nouveau mot de passe</label>
                            <input v-model="passwordForm.newPassword" type="password" class="form-control" required />
                        </div>
                    </div>

                    <div class="mt-4 text-end">
                        <MyButton typeNm="submit" class="outline py-1">
                            <i class="bi bi-save me-2"></i> Modifier le mot de passe
                        </MyButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import MyButton from "../../components/MyButton.vue";
import { useI18n } from "vue-i18n";
import { useAuth } from "../../composables/useAuth";
import { Toast } from "../../utils/Toast";

const { t } = useI18n();
const authStore = useAuthStore();
const { userInfos } = storeToRefs(authStore);
const { updateUserInfos, updatePasswordUser, error: updateError, error: updateErrorPw } = useAuth();
const isEditing = ref(false);

// Formulaire profil
const form = ref({
    firstname: userInfos.value?.firstname || "",
    lastname: userInfos.value?.lastname || "",
    email: userInfos.value?.email || "",
    tel: userInfos.value?.tel || "",
    address: userInfos.value?.address || "",
});

// Formulaire mot de passe
const passwordForm = ref({
    oldPassword: "",
    newPassword: "",
});

// ✏️ Activer/Désactiver le mode édition
const toggleEdit = () => {
    if (isEditing.value) {
        handleUpdateProfile();
    }
    isEditing.value = !isEditing.value;
};

// Handler pour MAJ du profil (vide pour l’instant)
const handleUpdateProfile = async () => {
    const data = { ...form.value, id: userInfos.value.id };
    await updateUserInfos(data);
    if (!updateError.value) {
        Toast(t("infoUpdatedSuccess"), "success");
    } else {
        Toast(t("infoUpdatedError"), "error");
    }
};



//  Handler pour changement de mot de passe (vide pour l’instant)
const handleChangePassword = async () => {
    const data = { ...passwordForm.value, id: userInfos.value.id }
    await updatePasswordUser(data);

    if (updateErrorPw.value === 'oldPwInvalid') {
        Toast("Ancien mot de passe incorrect.", 'error')
    }
    else if (updateErrorPw.value) Toast("Erreur de la mise à jour de votre mot de passe", 'error')
    else {
        Toast("Votre mot de passe a été mis à jour avec succes", 'success')
        passwordForm.value.oldPassword = ""
        passwordForm.value.newPassword = ""
    }
};
</script>

<style scoped>
.card {
    border-radius: 16px;
}

.form-label {
    font-weight: 500;
}

textarea[disabled],
input[disabled] {
    background-color: #f8f9fa;
    cursor: not-allowed;
}
</style>
