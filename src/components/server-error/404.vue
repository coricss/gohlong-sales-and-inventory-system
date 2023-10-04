<template>
    <div class="not-found">
        <h1>Oops!</h1>
        <img src="@/assets/imgs/logos/404.png" alt="404" style="width: 400px" />
        <span>PAGE NOT FOUND</span>
        <button class="btn btn-primary" @click="goBack">
            <i class="fa fa-arrow-left"></i>
            Go back
        </button>
    </div>
</template>
<script setup>

    import { useRouter } from 'vue-router'

    const router = useRouter()

    const goBack = () => {
        router.go(-1)
    }

</script>
<style scoped>
    .not-found {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #ff8800e3;
        flex-direction: column;
        color: white;
    }

    .not-found h1 {
        font-size: 80px;
        font-weight: 900;
        pointer-events: none;
    }

    .not-found span {
        font-size: 25px;
        font-weight: 800;
        margin-bottom: 50px;
        pointer-events: none;
    }

    .not-found img {
        margin-top: 50px;
        pointer-events: none;
    }
</style>