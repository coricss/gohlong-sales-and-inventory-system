<template>
    <TopHeaderComponent/>
    <NavbarComponent/>
    <HomeComponent/>
    <ServicesComponent/>
    <BrandsComponent/>
    <GalleryComponent/>
    <ContactComponent/>
    <FooterComponent/>
</template>

<script setup>
    import { defineAsyncComponent } from "vue";
    const TopHeaderComponent = defineAsyncComponent(() =>
        import("@/components/home/TopHeaderComponent.vue")
    );
    const NavbarComponent = defineAsyncComponent(() =>
        import("@/components/home/NavbarComponent.vue")
    );
    const HomeComponent = defineAsyncComponent(() =>
        import("@/components/home/HomeComponent.vue")
    );
    const ServicesComponent = defineAsyncComponent(() =>
        import("@/components/home/ServicesComponent.vue")
    );
    const BrandsComponent = defineAsyncComponent(() =>
        import("@/components/home/BrandsComponent.vue")
    );
    const GalleryComponent = defineAsyncComponent(() =>
        import("@//components/home/GalleryComponent.vue")
    );
    const ContactComponent = defineAsyncComponent(() =>
        import("@//components/home/ContactComponent.vue")
    );
    const FooterComponent = defineAsyncComponent(() =>
        import("@/components/home/FooterComponent.vue")
    );
</script>