<script setup>
const props = defineProps({
    id: Number,
    name: String,
    email: String
});

const emit = defineEmits(["delete", "edit"]);

</script>

<template>
    <h2>{{name}}</h2>
    <p>{{ email }}</p>
    <button @click="emit('delete',id)">Delete</button>
    <button @click="emit('edit', id)">Edit</button>
</template>