<template>
    <div class="home" id="home">
        <!-- Carousel Slider -->
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <!-- First Slide -->
                <div class="carousel-item active">
                    <img class="d-block w-100" src="@/assets/imgs/slideshow/gohlong-slideshow1.jpg" alt="First slide" />
                </div>
                <!-- Second Slide -->
                <div class="carousel-item">
                    <img class="d-block w-100" src="@/assets/imgs/slideshow/gohlong-slideshow2.jpg" alt="Second slide" />
                </div>
                <!-- Third Slide -->
                <!-- <div class="carousel-item">
                    <img class="d-block w-100" src="https://picsum.photos/4000" alt="Third slide" />
                </div> -->
            </div>
            <!-- Carousel Controls -->
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <i class="fa fa-chevron-left fa-lg"></i>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <i class="fa fa-chevron-right fa-lg"></i>
            </a>

            <!-- Carousel Indicators -->
        </div>
        <!-- End of Carousel Slider -->
    </div>
</template>

<script setup>
</script>

<style scoped>
    .carousel-item {
        height: 90vh;
    }
    .carousel-item img {
        height: 90vh;
        object-fit: cover;
    }
    .carousel-control-prev,
    .carousel-control-next {
        width: 5%;
    }
    .carousel-control-prev i,
    .carousel-control-next i {
        color: #000;
    }
    .carousel-control-prev:hover i,
    .carousel-control-next:hover i {
        color: #fff;
    }
    .carousel-control-prev {
        left: 0;
    }
    .carousel-control-next {
        right: 0;
    }

    @media screen and (max-width: 1024px) {
        .carousel-item {
            height: 50vh;
        }
        .carousel-item img {
            height: 50vh;
        }
    }

    @media screen and (max-width: 768px) {
        .carousel-item {
            height: 50vh;
        }
        .carousel-item img {
            height: 50vh;
        }
    }
</style>