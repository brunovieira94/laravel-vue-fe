<template>
    <div class="list row">

        <div class="col-md-12">
            <div class="mb-3">
                Items per Page:
                <select v-model="pageSize" @change="handlePageSizeChange($event)">
                    <option v-for="size in pageSizes" :key="size" :value="size">
                        {{ size }}
                    </option>
                </select>
            </div>

            <vue-awesome-paginate :total-items="count" :items-per-page="pageSize" :max-pages-shown="5" v-model="page"
                :on-click="handlePageChange" />
        </div>

        <div class="col-md-6">
            <h4>Users List</h4>
            <ul class="list-group" id="users-list">
                <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(user, index) in users"
                    :key="index" @click="setActiveUser(user, index)">
                    {{ user.name }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" @click="addUser">
                Add User
            </button>
        </div>

        <div class="col-md-6">
            <div v-if="currentUser">
                <h4>User</h4>
                <div>
                    <label><strong>Name:</strong></label> {{ currentUser.name }}
                </div>
                <div>
                    <label><strong>Email:</strong></label>
                    {{ currentUser.email }}
                </div>

                <a class="badge badge-warning" @click="editUser(currentUser.id)">
                    Edit
                </a>

                <a class="badge badge-danger mr-2" @click="deleteUser(currentUser.id)">
                    Delete
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a User...</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import UserDataService from "../services/UserDataService";

export default {
    name: "users-list",
    data() {
        return {
            users: [],
            currentUser: null,
            currentIndex: -1,

            page: 1,
            count: 0,
            pageSize: 5,

            pageSizes: [5, 10, 20],
        };
    },
    methods: {
        getRequestParams(page, pageSize) {
            let params = {};

            if (page) {
                params["page"] = page;
            }

            if (pageSize) {
                params["perPage"] = pageSize;
            }

            return params;
        },

        retrieveUsers() {
            const params = this.getRequestParams(
                this.page,
                this.pageSize
            );

            UserDataService.getAll(params)
                .then((response) => {
                    const { data, total } = response.data;
                    this.users = data;
                    this.count = total;

                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        handlePageChange(value) {
            this.page = value;
            this.retrieveUsers();
        },

        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retrieveUsers();
        },

        refreshList() {
            this.retrieveUsers();
            this.currentUser = null;
            this.currentIndex = -1;
        },

        setActiveUser(user, index) {
            this.currentUser = user;
            this.currentIndex = index;
        },

        addUser() {
            this.$router.push("/add-user");
        },

        editUser() {
            this.$router.push(`/users/${this.currentUser.id}`);
        },

        deleteUser() {
            UserDataService.delete(this.currentUser.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList()
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveUsers();
    },
};
</script>
  
<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>