<template>
    <div class="home" id="home">
        <Splide :options="splideOptions">
            <SplideSlide v-for="item in items" :key="item.id">
                <div class="carousel__item">
                    <img v-bind:src="getImageURL(item.image)" :alt="item.name" />
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
        classes: {
            pagination: 'splide__pagination',
            page: 'brand__pagination__page',
        },
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
            image: "calling-card.jpg",
        },
        {
            id: 2,
            name: "GohLong Renew Tires",
            image: "gohlong-slideshow3.png",
        },
        {
            id: 3,
            name: "GohLong Renew Tires",
            image: "gohlong-slideshow4.jpg",
        },
        {
            id: 4,
            name: "GohLong Renew Tires",
            image: "gohlong-slideshow5.jpg",
        },
        {
            id: 5,
            name: "GohLong Renew Tires",
            image: "gohlong-slideshow6.jpg",
        },
        {
            id: 6,
            name: "Goh Long Slideshow 1",
            image: "gohlong-slideshow1.jpg",
        },
        {
            id: 7,
            name: "Goh Long Slideshow 2",
            image: "gohlong-slideshow2.jpg",
        },
        {
            id: 8,
            name: "Tires",
            image: "tires.jpg",
        },
    ]);

    const getImageURL = (image) => {
        return new URL(`/src/assets/imgs/slideshow/${image}`, import.meta.url).href;
    };


</script>

<style scoped>
    .carousel__item {
        height: 80vh;
        padding-right: 0.9rem;
        padding-left: 0.9rem;
    }
    .splide__slide img {
        width: 100%;
        height: 100%;
        object-fit: fill !important;
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