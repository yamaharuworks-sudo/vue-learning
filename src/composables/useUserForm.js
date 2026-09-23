import {ref} from "vue";

export function useUserForm(addUser, updateUser, getUserById) {

    const newName = ref("");
    const newEmail = ref("");
    const nameError = ref("");
    const emailError = ref("");
    const editingUserId = ref(null);



const validateForm = () => {
    if (newName.value.trim() === "") {
        nameError.value = "Name is required";
    } else if (newName.value.trim().length < 2){
        nameError.value = "Name must be at least 2 characters";
    } else {
        nameError.value = "";
    } 

    if (newEmail.value.trim() === "") {
        emailError.value = "Email is required";
    } else if (!newEmail.value.trim().includes("@")){
        emailError.value = "Please enter a valid email";
    } else {
        emailError.value = "";
    }

    return nameError.value === "" && emailError.value === "";
}

const saveUser = () => {

    if (!validateForm()) return;
    if (editingUserId.value === null) {
        addUser(newName.value, newEmail.value);
    } else {
        updateUser(newName.value, newEmail.value, editingUserId.value);
    }
    newName.value = "";
    newEmail.value = "";
    editingUserId.value = null;

}

const startEdit = (id) => {
    editingUserId.value = id;
    const user = getUserById(id);
    newName.value = user.name;
    newEmail.value = user.email;
}


    return {
        newName,
        newEmail,
        nameError,
        emailError,
        saveUser,
        startEdit
    }

}