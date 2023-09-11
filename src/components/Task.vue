<template>
    <div v-if="currentTask" class="edit-form">
        <h4>Task</h4>
        <form>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required v-model="currentTask.title" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description" required v-model="currentTask.description" />
            </div>
            <div class="form-group">
                <label for="status">Status:</label>

                <select v-model="currentTask.status" name="status" id="status">
                    <option value="0">Inactive</option>
                    <option value="1">In Progression</option>
                    <option value="2">Finished</option>
                </select>
            </div>

            <div class="form-group">
                <label for="date">End Date</label>
                <input v-model="currentTask.end_date" id="date" type="date" />
            </div>

        </form>

        <button class="badge badge-danger mr-2" @click="deleteTask">
            Delete
        </button>

        <button type="submit" class="badge badge-success" @click="updateTask">
            Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Task...</p>
    </div>
</template>
  
<script>
import TaskDataService from "../services/TaskDataService";

export default {
    name: "task",
    data() {
        return {
            currentTask: null,
            message: ''
        };
    },
    methods: {
        getTask(id) {
            TaskDataService.get(id)
                .then(response => {
                    this.currentTask = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateTask() {
            TaskDataService.update(this.currentTask.id, this.currentTask)
                .then(response => {
                    console.log(response.data);
                    this.message = 'The task was updated successfully!';
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteTask() {
            TaskDataService.delete(this.currentTask.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "tasks" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.message = '';
        this.getTask(this.$route.params.id);
    }
};
</script>
  
<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>