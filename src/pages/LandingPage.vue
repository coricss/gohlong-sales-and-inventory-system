<template>
    <TopHeaderComponent/>
    <NavbarComponent/>
    <HomeComponent/>
    <ServicesComponent/>
    <BrandsComponent/>
</template>

<script setup>
    import TopHeaderComponent from "@/components/home/TopHeaderComponent.vue";
    import NavbarComponent from "@/components/home/NavbarComponent.vue";
    import HomeComponent from "@/components/home/HomeComponent.vue";
    import ServicesComponent from "@/components/home/ServicesComponent.vue";
    import BrandsComponent from "@/components/home/BrandsComponent.vue";

    import { useRouter } from "vue-router";

    const router = useRouter();

    const login = () => {
        router.push("/login");
    };
</script>