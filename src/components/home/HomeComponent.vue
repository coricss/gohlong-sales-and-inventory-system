<template>
    <div class="home" id="home">
        <!-- Carousel Slider -->
      <!--   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item" v-for="item in items" ref="carousel">
                    <img class="d-block w-100" :src="item.image"/>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <i class="fa fa-chevron-left fa-lg"></i>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <i class="fa fa-chevron-right fa-lg"></i>
            </a>
        </div> -->
        <Splide :options="splideOptions">
            <SplideSlide v-for="item in items" :key="item.id">
                <div class="carousel__item">
                    <img :src="item.image" :alt="item.name" />
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { Splide, SplideSlide } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';

    const splideOptions = {
        type: 'loop',
        rewind : true,
        width: '100%',
        perPage: 1,
        perMove: 1,
        gap: '1px',
        drag   : false,
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        arrows: true,
        pagination: true,
        breakpoints: {
            640: {
                perPage: 1,
                perMove: 1,
            },
            768: {
                perPage: 1,
                perMove: 1,
            },
            1024: {
                perPage: 1,
                perMove: 1,
            },
        },
    };

    const items = ref([
        {
            id: 1,
            name: "Calling Card",
            image: "/src/assets/imgs/slideshow/calling-card.jpg",
        },
        {
            id: 2,
            name: "Goh Long Slideshow 1",
            image: "/src/assets/imgs/slideshow/gohlong-slideshow1.jpg",
        },
        {
            id: 3,
            name: "Goh Long Slideshow 2",
            image: "/src/assets/imgs/slideshow/gohlong-slideshow2.jpg",
        },
        {
            id: 4,
            name: "Tires",
            image: "/src/assets/imgs/slideshow/tires.jpg",
        },
    ]);

    


</script>

<style scoped>
    .carousel__item {
        height: 90vh;
    }
    .splide__slide img {
        width: 100%;
        height: 100%;
        object-fit: stretch !important;
    }

    @media screen and (max-width: 1024px) {
        .carousel__item {
            height: 50vh;
        }
        .carousel__item img {
            height: 50vh;
        }
    }

    @media screen and (max-width: 768px) {
        .carousel__item {
            height: 50vh;
        }
        .carousel__item img {
            height: 50vh;
        }
    }
</style>