<template>
    <div id="brands"></div>
        <div class="container-fluid">
            <div class="brands mb-3">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center font-weight-bold">Brands We Offer</h1>
                    </div>
                </div>
            </div>
            <Splide :options="splideOptions" aria-label="Brands">
                <SplideSlide v-for="item in items" :key="item.id">
                    <div class="carousel__item">
                        <img :src="getImageURL(item.image)" :alt="item.name" />
                    </div>
                </SplideSlide>
            </Splide>
        </div>
</template>

<script setup>
    import { ref } from "vue";
    import { Splide, SplideSlide } from '@splidejs/vue-splide';
    import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
    import '@splidejs/vue-splide/css';

    const splideOptions = {
        type: 'loop',
        rewind : true,
        perPage: 5,
        perMove: 5,
        gap: '1px',
        drag: 'free',
        autoplay: true,
        waitForTransition: true,
        wheelMinThreshold: 10,
        wheel: true,
        pauseOnHover: true,
        resetProgress: false,
        arrows: false,
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
                perPage: 2,
                perMove: 2,
            },
            1024: {
                perPage: 3,
                perMove: 3,
            },
        },
    };

    const items = ref([
        {
            id: 1,
            name: "Good Year",
            image: "goodyear.png",
        },
        {
            id: 2,
            name: "GAJAHTUNGGAL",
            image: "GAJAHTUNGGAL.png",
        },
        {
            id: 3,
            name: "Dunlop",
            image: "dunlop.png",
        },
        {
            id: 4,
            name: "Yokohama",
            image: "yokohama.png",
        },
        {
            id: 5,
            name: "MRF",
            image: "mrf.png",
        },
        {
            id: 6,
            name: "Birla",
            image: "birla.png",
        },
        {
            id: 7,
            name: "Achilles",
            image: "achilles.png",
        },
        {
            id: 8,
            name: "Accelera",
            image: "accelera.png",
        },
        {
            id: 9,
            name: "Delium",
            image: "delium.png",
        },
        {
            id: 10,
            name: "Sailun Tires",
            image: "sailun.png",
        },
        {
            id: 11,
            name: "Aeolus",
            image: "aeolus.png",
        },
        {
            id: 12,
            name: "Nankang",
            image: "nankang.png",
        },
        {
            id: 12,
            name: "Skyfire",
            image: "skyfire.png",
        },
        {
            id: 13,
            name: "Thunderer",
            image: "thunderer.png",
        },
        {
            id: 14,
            name: "CEAT",
            image: "CEAT.png",
        },
        {
            id: 15,
            name: "Michelin",
            image: "michelin.png",
        },
        {
            id: 16,
            name: "Nexen",
            image: "nexen.png",
        },
        {
            id: 17,
            name: "Apollo",
            image: "apollo.png",
        },
        {
            id: 17,
            name: "Laufenn",
            image: "laufenn.png",
        },
        {
            id: 18,
            name: "Yeada Tire",
            image: "yeada-tire.png",
        },
        {
            id: 19,
            name: "Firestone",
            image: "firestone.png",
        },
        {
            id: 20,
            name: "Alliance",
            image: "alliance.png",
        },
    ]);

    const getImageURL = (image) => {
        return new URL(`/src/assets/imgs/brands/${image}`, import.meta.url).href;
    };

</script>

<style scoped>

    .container-fluid {
        background-color: #f7f7f7;
        margin-top: 120px;
        min-height: 50vh !important;
    }
    .brands {
        padding: 50px 0;
    }
    .carousel__item {
        height: 200px;
        width: 200px;
       /*  background-color: #fff; */
        padding: 10px;
        cursor: grab;
    }

    .carousel__item img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .splide__slide {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
    }

</style>