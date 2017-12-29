<template>
    <div id="page-login">
        <p>
            <input type="text" v-model="username" placeholder="Username">
        </p>

        <p>
            <input type="password" v-model="password" placeholder="Password">
        </p>

        <p>
            <button @click="login">Login</button>
        </p>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    data() {
        return {
            username: 'yolo@xmpl.com',
            password: 'option123'
        }
    },

    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword('yolo@xmpl.com', 'option123').then(() => {
                this.$router.push('/');
            }).catch(console.log);
        }
    }
}
</script>

