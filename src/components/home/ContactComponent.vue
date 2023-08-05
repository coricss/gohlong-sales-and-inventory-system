<template>
    <div id="contact"></div>
        <div class="container-fluid">
            <div class="contact-wrapper">
                <div class="row">
                    <div class="col-md-12">
                        <div class="contact-info">
                            <h1 class="text-center font-weight-bold">Contact Us</h1>
                            <div class="container">
                               <div class="row">
                                    <div class="col-md-4 py-5">
                                        <div class="contact-details">
                                            <div class="contact-logo">
                                                <i class="fa fa-phone"></i>
                                            </div>
                                            <div class="contact-details">
                                                <h5 class="contact-title">Phone</h5>
                                                <small class="contact-description">(Monday to Sunday, 7:30am - 5:00pm PST)</small>
                                                <p>
                                                    <a type="button" class="btn btn-primary text-white" href="tel:+639270211061" target="_blank">
                                                        <i class="fa fa-volume-up"></i>
                                                        <span class="font-weight-bold">
                                                            Call
                                                        </span>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 py-5">
                                        <div class="contact-details">
                                            <div class="contact-logo">
                                                <i class="fa fa-envelope"></i>
                                            </div>
                                            <div class="contact-details">
                                                <h5 class="contact-title">Email</h5>
                                                <small class="contact-description">
                                                    We will respond to your email within 24 hours.
                                                </small>
                                                <p>
                                                    <a type="button" class="btn btn-primary text-white" href="mailto:gohlong.tire@yahoo.com" target="_blank">
                                                        <i class="fa fa-paper-plane"></i>
                                                        <span class="font-weight-bold">
                                                            Send
                                                        </span>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4 py-5">
                                        <div class="contact-details">
                                            <div class="contact-logo">
                                               <i class="fab fa-facebook-messenger"></i>
                                            </div>
                                            <div class="contact-details">
                                                <h5 class="contact-title">Chat</h5>
                                                <small class="contact-description">
                                                    Chat with us on Facebook Messenger.
                                                </small>
                                                <p>
                                                    <a type="button" class="btn btn-primary text-white" href="https://www.facebook.com/gohlongtireandservices" target="_blank">
                                                        <i class="fab fa-facebook-messenger"></i>
                                                        <span class="font-weight-bold">
                                                            Chat
                                                        </span>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18397.56473537215!2d121.13969608101588!3d14.217508284025735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd624add761825%3A0xf47cc7a6801710cb!2sGOHLONG%20TIRE%20AND%20SERVICE%20CENTER!5e0!3m2!1sen!2sph!4v1691233976072!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div> 
        </div>
</template>

<script setup>
</script>

<style scoped>

    .container-fluid {
        min-height: 100vh;
    }
    .contact-wrapper {
        padding: 100px 0px 0px 0px;
    }

    .contact-info {
        padding: 50px 0px 50px 0px;
        width: 100%;
        background-color: #f7f7f7;
    }
    .map {
        width: 100%;
        height: 500px;
        position: relative;
    }

    .map iframe {
        width: 100%;
        height: 100%;
    }

    .contact-details {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .contact-logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #ffffff;
        border: 3px solid #ff5e14;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    .contact-logo i{
        font-size: 2rem;
        color: #ff5e14;
    }

    .contact-details h5 {
        font-size: 1.5rem;
        font-weight: 700;
        padding-bottom: 10px;
    }

    .contact-details p {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0;
    }

    small.contact-description {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .contact-details a {
        color: #000000;
        font-weight: 600;
    }


</style>