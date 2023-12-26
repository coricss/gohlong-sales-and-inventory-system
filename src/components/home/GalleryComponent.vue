<template>
    <div id="gallery"></div>
        <div class="container-fluid">
            <div class="gallery">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="text-center font-weight-bold">Business Gallery</h1>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="image-gallery-wraper">
                    <ul class="image-gallery p-0">
                        <li v-for="item in items" :key="item.id">
                            <img :src="getImageURL(item.image)" />
                            <div class="overlay"><span></span></div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
    import { ref } from "vue";

    const items = ref([
        {
            id: 14,
            image: "14.jpg",
        },
        {
            id: 13,
            image: "13.jpg",
        },
        {
            id: 12,
            image: "12.jpg",
        },
        {
            id: 11,
            image: "11.jpg",
        },
        {
            id: 1,
            image: "1.jfif",
        },
        {
            id: 2,
            image: "2.jpg",
        },
        {
            id: 3,
            image: "3.jfif",
        },
        {
            id: 4,
            image: "4.jpg",
        },
        {
            id: 5,
            image: "5.jpg",
        },
        {
            id: 6,
            image: "6.jpg",
        },
        {
            id: 7,
            image: "7.jpg",
        },
        {
            id: 8,
            image: "8.jpg",
        },
        {
            id: 9,
            image: "9.jfif",
        },
        {
            id: 10,
            image: "10.jfif",
        },
    
    ]);

    const getImageURL = (image) => {
        return new URL(`/src/assets/imgs/gallery/${image}`, import.meta.url).href;
    };
</script>

<style scoped>
    .container-fluid{
        margin-top: 200px;
    }

    .image-gallery-wraper {
        padding: 40px 5%;
    }

    .image-gallery {
        height: 800px;
        overflow-y: scroll;
    }

    .heading-text {
        margin-bottom: 2rem;
        font-size: 2rem;
    }

    .heading-text span {
        font-weight: 100;
    }

    ul {
        list-style: none;
    }

    /* Responsive image gallery rules begin*/

    .image-gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .image-gallery > li {
        flex: 1 1 auto; /* or flex: auto; */
        height: 300px;
        cursor: pointer;
        position: relative;
    }

    .image-gallery::after {
        content: "";
        flex-grow: 999;
    }

    .image-gallery li img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        border-radius: 5px;
        transition: all 0.2s 0.1s ease-in-out;
    }

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 145, 0, 0.267);
        top: 0;
        left: 0;
        transform: scale(0);
        transition: all 0.2s 0.1s ease-in-out;
        color: #fff;
        border-radius: 5px;
        /* center overlay content */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* hover */
    .image-gallery li:hover .overlay {
        transform: scale(1);
    }

</style>