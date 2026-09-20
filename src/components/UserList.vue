<script setup>
import {ref, onMounted, computed, watch} from "vue";
import UserCard from "./UserCard.vue";

const users = ref([]);
const loading = ref(false);
const errorMessage = ref("");
const newName = ref("");
const newEmail = ref("");
const editingUserId = ref(null);
const searchText = ref("");
const nameError = ref("");
const emailError = ref("");


const fetchUsers = async () => {
    loading.value = true;
    errorMessage.value = "";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        users.value = data;
    
    } catch(error) {
        errorMessage.value = error.message;
    } finally {
        loading.value = false;

    }
}

const addUser = () => {
    if (newName.value.trim() === "" || newEmail.value.trim() === "") return;
    const newUser = {
        id: Date.now(),
        name: newName.value.trim(),
        email: newEmail.value.trim()
    };

    // newUserを追加
    users.value = [
        ...users.value,
        newUser
    ];

    newName.value = "";
    newEmail.value = "";

};



onMounted(() => {
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
        users.value = JSON.parse(savedUsers);
    } else {
        fetchUsers();
    }

});

watch(users, 
    (newUsers) => {
        localStorage.setItem("users", JSON.stringify(newUsers));
    },
    {
        deep: true
    }
);


const deleteUser = (id) => {
    console.log("delete id:", id);
    console.log("users:", users.value);
    users.value = users.value.filter((user) => user.id !== id)
}


const startEdit = (id) => {
    editingUserId.value = id;
    const user = users.value.find(
        (user) => 
        user.id === editingUserId.value
    );
    newName.value = user.name;
    newEmail.value = user.email;
}


const saveUser = () => {
    if (!validateForm()) return;
    if (editingUserId.value === null) {
        addUser();
    } else {
        updateUser();
    }

}

const updateUser = () => {
    users.value = users.value.map((user) => 
        user.id === editingUserId.value
        ? {
            ...user,
            name: newName.value,
            email: newEmail.value
        }
        : user
    )
    editingUserId.value = null;
    newName.value = "";
    newEmail.value = "";
}


const filteredUsers = computed(() => {
    const search = searchText.value.trim().toLowerCase();

    if (search === "") {
        return users.value;
    } else {
        return users.value.filter((user) => 
        user.name.toLowerCase().includes(search) || 
        user.email.toLowerCase().includes(search
))};
});


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


</script>


<template>
    <button @click="fetchUsers">Load users</button>
    <UserCard v-for="user in filteredUsers"
    :key="user.id"
    :id="user.id"
    :name="user.name"
    :email="user.email"
    @delete="deleteUser"
    @edit="startEdit" />
<p v-if="loading">Loading...</p>
<p v-if="errorMessage">{{errorMessage}}</p>

<form @submit.prevent="saveUser">
    <input 
        v-model="newName" 
        @input="nameError=''" 
        type="text"
        placeholder="name">
    <p v-if="nameError">{{ nameError }}</p>
    <input 
        v-model="newEmail" 
        @input="emailError=''"
        type="email" 
        placeholder="email">
    <p v-if="emailError">{{ emailError }}</p>
    <button type="submit">
        {{ editingUserId === null
        ? "Add User"
        : "Update User" }}
    </button>
</form>

<input v-model="searchText" type="text" placeholder="Search Users">  

</template>