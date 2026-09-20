    <script setup>
    const props = defineProps({
    title: String,
    completed: Boolean,
    id: Number
    });

    const emit = defineEmits(["delete", "toggle"]);
    </script>

    <template>
    <div>
        <h2>{{title}}</h2>
        <p>{{ 
        completed
        ? "Completed" 
        : "Not Completed" }}        </p>
    </div>

    <button @click="emit('delete', id)">Delete</button>
    <button @click="emit('toggle', id)">
        {{ completed ? "Undo" : "Complete"  }}
    </button>
    </template>