import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        alias: "/tasks",
        name: "tasks",
        component: () => import("./components/TasksList")
    },
    {
        path: "/tasks/:id",
        name: "task-details",
        component: () => import("./components/Task")
    },
    {
        path: "/add-task",
        name: "add-task",
        component: () => import("./components/AddTask")
    },
    {
        path: "/",
        alias: "/users",
        name: "users",
        component: () => import("./components/UsersList")
    },
    {
        path: "/users/:id",
        name: "user-details",
        component: () => import("./components/User")
    },
    {
        path: "/add-user",
        name: "add-user",
        component: () => import("./components/AddUser")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;