<template>
    <div id="services"></div>
        <div class="container-fluid">
            <div class="services">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center font-weight-bold">Our Services</h1>
                    </div>
                </div>
                <div class="row mt-3">
                    <!-- d-flex-lg -->
                    <div class="col-md-4 p-2" v-for="item in items" :key="item.id">
                        <div class="service">
                            <div class="service-image">
                                <img :src="getImageURL(item.image)" :alt="item.title" />
                            </div>
                            <div class="service-info text-lg-center">
                                <h3>{{ item.title }}</h3>
                                <p>{{ item.description }}</p>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
</template>

<script setup>
    import { ref } from "vue";

    const items = ref([
        {
            id: 1,
            title: "Tire Repair",
            description: "We take pride in providing top-notch tire repair services to keep your vehicle safe and running smoothly. Our team of experienced technicians is dedicated to ensuring that your tires are in the best possible condition, and we offer a range of services to meet your specific needs.",
            image: "service1.jpg",
        },
        {
            id: 2,
            title: "Car Air Conditioning",
            description: "We understand the importance of a properly functioning car air conditioning system, especially during hot summer months. Our dedicated team of automotive technicians is here to provide a comprehensive range of car air conditioning services to keep you comfortable while on the road.",
            image: "service2.jpg",
        },
        {
            id: 3,
            title: "Change Oil",
            description: "We are dedicated to preserving the performance and longevity of your vehicle by providing expert car oil change services. Regular oil changes are a fundamental aspect of car maintenance, and our team is committed to making the process easy and convenient for you. Contact us today to schedule your next oil change or to inquire about our services. Your vehicle's well-being is our priority, and we're here to ensure it runs at its best.",
            image: "service3.jpg",
        }
    ]);

    const getImageURL = (image) => {
        return new URL(`/src/assets/imgs/services/${image}`, import.meta.url).href;
    };
</script>

<style scoped>

    .container-fluid {
        margin-top: 150px;
       /*  min-height: 100vh !important; */
    }
    .services {
        padding: 100px;
    }
    .service {
        padding: 20px;   
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
        height: 100%;
    }
    .service-image {
        height: 300px;
        overflow: hidden;
    }
    .service-image img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: all 0.3s ease-in-out;
    }
    
    .service:hover img {
        transform: scale(1.05);
    }
    .service-info {
        padding: 20px 0;
    }
    .service-info h3 {
        font-size: 1.5rem;
    }
    .service-info p {
        font-size: 1rem;
        margin: 0;
    }

</style>