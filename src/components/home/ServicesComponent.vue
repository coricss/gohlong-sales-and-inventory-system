<template>
    <div id="services"></div>
        <div class="container">
            <div class="services">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center">Our Services</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="service">
                            <div class="service-img">
                                <img src="https://picsum.photos/500" alt="service" />
                            </div>
                            <div class="service-content">
                                <h3 class="text-center">Tire Repair</h3>
                                <p class="text-center">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="service">
                            <div class="service-img">
                                <img src="https://picsum.photos/500" alt="service" />
                            </div>
                            <div class="service-content">
                                <h3 class="text-center">Tire Repair</h3>
                                <p class="text-center">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="service">
                            <div class="service-img">
                                <img src="https://picsum.photos/500" alt="service" />
                            </div>
                            <div class="service-content">
                                <h3 class="text-center">Tire Repair</h3>
                                <p class="text-center">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
</script>

<style scoped>
    .services {
        padding: 100px 0;
    }
    .services .service {
        margin-bottom: 30px;
    }
    .services .service .service-img {
        height: 100%;
        overflow: hidden;
    }
    .services .service .service-img img {
        height: 100%;
        object-fit: cover;
    }
    .services .service .service-content {
        padding: 20px;
    }
    .services .service .service-content h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .services .service .service-content p {
        font-size: 14px;
        font-weight: 400;
    }

    @media (max-width: 768px) {
        .services .service .service-img {
            height: 150px;
        }

        .services .service .service-content h3 {
            font-size: 16px;
        }
    }
</style>