<script setup>
import {ref, computed} from "vue";
import UserCard from "./UserCard.vue";
import UserForm from "./UserForm.vue";
import { useUsers } from "../composables/useUsers.js";
import { useUserForm } from "../composables/useUserForm.js";


const searchText = ref("");
const newAge = ref("");


const {users, loading, errorMessage, 
    fetchUsers, deleteUser, addUser, updateUser, getUserById} = useUsers();

const {newName,
        newEmail,
        nameError,
        emailError,
        saveUser,
        startEdit} = useUserForm(addUser, updateUser, getUserById);



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

<input v-model="searchText" type="text" placeholder="Search Users">  



<UserForm 
:name-error="nameError"
:email-error="emailError"
v-model:name="newName"
v-model:email="newEmail"
v-model:age="newAge"
@submit="saveUser"
@clear-name-error="nameError=''"
@clear-email-error="emailError=''"/>

</template>