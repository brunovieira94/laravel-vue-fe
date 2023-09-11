<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" required v-model="user.name" name="name" />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input class="form-control" id="email" required v-model="user.email" name="email" />
            </div>

            <div class="form-group">
                <label for="pass">Password (8 characters minimum):</label>
                <input type="password" class="form-control" id="pass" required v-model="user.password" name="password"
                    minlength="8" />
            </div>

            <button @click="saveUser" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>
    </div>
</template>
  
<script>
import UserDataService from "../services/UserDataService";

export default {
    name: "add-user",
    data() {
        return {
            user: {
                id: null,
                name: "",
                email: "",
                password: ""
            },
            submitted: false
        };
    },
    methods: {
        saveUser() {
            var data = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password
            };

            UserDataService.create(data)
                .then(response => {
                    this.user.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newUser() {
            this.submitted = false;
            this.user = {};
        }
    }
};
</script>
  
<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>