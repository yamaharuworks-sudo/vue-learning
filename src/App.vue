<script setup > 
import ProjectCard from "./components/ProjectCard.vue";
import UserList from "./components/userList.vue";
import {ref, computed, watch} from "vue";
const message = ref("Hello Vue");
const count = ref(0);
const newProject = ref("");



const increment = () => {
  count.value++;
}

const isLoggedIn = ref(false);
const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value;
}

const users = [
  { id: 1, name: "Haruna" },
  { id: 2, name: "Taro" },
  { id: 3, name: "Yuki" }
];

const projects = ref([
  { id: 1, title: "Hotel Website", completed: true },
  { id: 2, title: "Hair Salon", completed: false },
  { id: 3, title: "Portfolio", completed: false }
]);

const deleteProject = (id) => {
  projects.value = projects.value.filter(
    (project) => project.id !== id
  );
};


const toggleCompleted = (id) => {
  projects.value = projects.value.map((project) =>
    project.id === id
    ? {
      ...project,
      completed: !project.completed
    }
    : project
  );
};

const completedCount = computed(() => {
  return projects.value.filter(
    (project) => project.completed
  ).length;
});

const incompleteProjects = computed(() => {
  return projects.value.filter(
    (project) => !project.completed
  );
})

const addProject = () => {
  const project = {
    id: Date.now(),
    title: newProject.value,
    completed: false
  };
  projects.value = [
    ...projects.value,
    project
  ];
  newProject.value = "";  
};



</script>

<template>

<h1>{{message}}</h1>
<p>Count: {{count}}</p>
<button @click="increment">+1</button>

<p v-if="isLoggedIn">Welcome!</p>
<p v-else>Please log in</p>
<button @click="toggleLogin">Login / Logout</button>
<li v-for="user in users">
  {{user.name}}
</li>
<ul>
  <li v-for="project in projects"
  :key="project.id">
  {{ project.title }}
  <span v-if="project.completed"> {{ project.title + " - " + project.completed }}</span>
<button @click="toggleCompleted(project.id)">
    {{ project.completed ? "Undo" : "Complete" }}
  </button>
</li>
</ul>

<input v-model="newProject" />
<p>{{ newProject }}</p>
<button @click="addProject">
  Add Project
</button>

<ProjectCard 
  v-for="project in projects"
  :key="project.id"
  :title="project.title"
  :completed="project.completed"
  :id="project.id"
  @delete="deleteProject"
  @toggle="toggleCompleted"
  />


  <UserList />
</template>