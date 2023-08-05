<template>
    <div id="services"></div>
        <div class="container">
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
                                <img :src="item.image" :alt="item.title" />
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
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptatibus cumque eos optio suscipit blanditiis inventore iusto aspernatur voluptates, soluta dolores rerum dolore iste in, odio nulla tenetur sequi eius.",
            image: "/src/assets/imgs/services/service1.jpg",
        },
        {
            id: 2,
            title: "Car Air Conditioning",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus nostrum fugiat sequi nisi veritatis veniam fuga voluptates. Quibusdam delectus perspiciatis, id voluptas totam qui exercitationem eaque rem odio, quia, non accusamus ipsum repellendus commodi quo! Sint enim ipsam, tempora debitis molestias iste perspiciatis itaque quisquam, omnis rem, illum ducimus.",
            image: "/src/assets/imgs/services/service2.jpg",
        },
        {
            id: 3,
            title: "Change Oil",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sequi odit sint. Et, eum hic dolorem eius voluptatum aliquam magni temporibus sequi repellendus quaerat ducimus, iusto blanditiis, possimus tempora consequatur repudiandae ipsam consequuntur accusantium omnis iure? Magni quaerat eaque dolorum!",
            image: "/src/assets/imgs/services/service3.jpg",
        }
    ]);

</script>

<style scoped>

    /* .container {
        margin-top: 120px;
        min-height: 100vh !important;
    } */
    .services {
        padding: 100px 0;
    }
    .service {
        padding: 20px;   
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease-in-out;
        height: 100%;
    }
    .service-image {
        height: 200px;
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