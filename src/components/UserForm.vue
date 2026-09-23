<script setup>

const props = defineProps({
    nameError: String,
    emailError: String
});

const emit = defineEmits([
    "submit",
    "clear-name-error",
    "clear-email-error"]);

const name = defineModel("name");
const email = defineModel("email");
const age = defineModel("age");

</script>

<template>

    <h2>User Form</h2>

    <form @submit.prevent="emit('submit')" >
        <input v-model="name"
        @input="emit('clear-name-error')"
        type="text">
        <p v-if="nameError">{{ nameError }}</p>
        <input 
            v-model="email"
            @input="emit('clear-email-error')"
            type="email">
        <p v-if="emailError">{{ emailError }}</p>
        <input 
            v-model="age"
            type="number">

        <button type="submit">Save User</button>
    </form>
    
</template>