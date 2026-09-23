import { ref, onMounted, watch } from "vue";

export function useUsers() {

const users = ref([]);
const loading = ref(false);
const errorMessage = ref("");




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


const deleteUser = (id) => {
    console.log("delete id:", id);
    console.log("users:", users.value);
    users.value = users.value.filter((user) => user.id !== id)
}

const addUser = (name, email) => {
    const newUser = {
    id: Date.now(),
    name: name,
    email: email
};
    users.value = [
        ...users.value,
        newUser
    ]
}

const updateUser = (name, email, editingUserId) => {
    users.value = users.value.map((user) => 
        user.id === editingUserId.value
        ? {
            ...user,
            name,
            email
        }
        : user
    )
}

const getUserById = (id) => {
    const user = users.value.find(
        (user) => user.id === id
    );
    return user;

}


    return {
        users,
        loading,
        errorMessage,
        fetchUsers,
        deleteUser,
        addUser,
        updateUser,
        getUserById
    };
}