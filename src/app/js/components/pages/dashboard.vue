<template>
    <div id="page-dashboard">
        <navigation></navigation>
        
        <p>
            Welcome, {{ user.email }}
        </p>
    </div>
</template>

<script>
import firebase from 'firebase';
import Navigation from 'components/ui/navigation';

export default {
    data() {
        return {
            user: firebase.auth().currentUser
        }
    },

    components: {
        Navigation
    }
}
</script>

