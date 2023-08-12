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
                    <ul class="image-gallery">
                        <li>
                        <img src="https://source.unsplash.com/VWcPlbHglYc" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/e6FMMambeO4" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/klCiPmzUw0Y" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/IdNOTjPeHrE" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/O0N9MF--hK4" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/FV3GConVSss" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/0ESjL-Nw22Y" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/KTVn62x6fFw" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>

                        <li>
                        <img src="https://source.unsplash.com/VSeVhmW4_JQ" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/07aFaTf24Kg" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                        <li>
                        <img src="https://source.unsplash.com/DqyYTM7pR2o" alt="" />
                        <div class="overlay"><span>Image title</span></div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
    
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
    }

    .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(57, 57, 57, 0.502);
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