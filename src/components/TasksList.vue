<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title" v-model="searchTitle" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="page = 1; retrieveTasks();">
                        Search
                    </button>
                </div>
            </div>
        </div>

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
            <h4>Tasks List</h4>
            <ul class="list-group" id="tasks-list">
                <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(task, index) in tasks"
                    :key="index" @click="setActiveTask(task, index)">
                    {{ task.title }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" @click="addTask">
                Add Task
            </button>
        </div>

        <div class="col-md-6">
            <div v-if="currentTask">
                <h4>Task</h4>
                <div>
                    <label><strong>Title:</strong></label> {{ currentTask.title }}
                </div>
                <div>
                    <label><strong>Description:</strong></label>
                    {{ currentTask.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label>
                    {{ status[currentTask.status] }}
                </div>
                <div>
                    <label><strong>End Date:</strong></label>
                    {{ currentTask.end_date }}
                </div>

                <a class="badge badge-warning" @click="editTask(currentTask.id)">
                    Edit
                </a>

                <a class="badge badge-danger mr-2" @click="deleteTask(currentTask.id)">
                    Delete
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Task...</p>
            </div>
        </div>
    </div>
</template>
  
<script>
import TaskDataService from "../services/TaskDataService";

export default {
    name: "tasks-list",
    data() {
        return {
            tasks: [],
            currentTask: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 5,

            pageSizes: [5, 10, 20],
            status: ['Inactive', 'In Progression', 'Finished']
        };
    },
    methods: {
        getRequestParams(searchTitle, page, pageSize) {
            let params = {};

            if (searchTitle) {
                params["search"] = searchTitle;
            }

            if (page) {
                params["page"] = page;
            }

            if (pageSize) {
                params["perPage"] = pageSize;
            }

            return params;
        },

        retrieveTasks() {
            const params = this.getRequestParams(
                this.searchTitle,
                this.page,
                this.pageSize
            );

            TaskDataService.getAll(params)
                .then((response) => {
                    const { data, total } = response.data;
                    this.tasks = data;
                    this.count = total;

                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        handlePageChange(value) {
            this.page = value;
            this.retrieveTasks();
        },

        handlePageSizeChange(event) {
            this.pageSize = event.target.value;
            this.page = 1;
            this.retrieveTasks();
        },

        refreshList() {
            this.retrieveTasks();
            this.currentTask = null;
            this.currentIndex = -1;
        },

        setActiveTask(task, index) {
            this.currentTask = task;
            this.currentIndex = index;
        },

        addTask() {
            this.$router.push("/add-task");
        },

        editTask() {
            this.$router.push(`/tasks/${this.currentTask.id}`);
        },

        deleteTask() {
            TaskDataService.delete(this.currentTask.id)
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
        this.retrieveTasks();
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