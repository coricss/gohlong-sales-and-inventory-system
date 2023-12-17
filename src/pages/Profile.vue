<template>
    <div class="content-wrapper">
        <HeaderComponent/>
        <SidebarComponent 
            :username="name"
            :picture="picture"
        />
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-dark"><i class="nav-icon fas fa-user"></i> Profile</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="card card-orange card-outline p-5">
                                <div class="row justify-content-center">
                                    <div class="text-center position-relative" >
                                        <img v-if="has_picture" class="img-fluid img-circle profile-pic" :src="BASE_URL+'storage/images/'+userDetail.picture" alt="User profile picture" style="width: 200px; height:200px;">
                                        <img v-else class="img-fluid img-circle profile-pic" src="@/assets/imgs/users/default-150x150.png" alt="User profile picture" style="width: 200px; height:200px;">
                                        <input 
                                            type="file" 
                                            class="form-control-file" 
                                            style="display: none;" 
                                            id="file_image"
                                            accept="image/*"
                                        >
                                        <button 
                                            class="btn btn-primary bg-orange btn-sm mt-2 border-0 rounded-circle p-2 btn-edit-pic"
                                            @click="pictureEditing"
                                            v-if="!isPictureEditing"
                                        >
                                            <i class="fas fa-camera text-white" style="font-size: 1rem;"></i>
                                        </button>
                                        <div class="confirmation" v-else>
                                            <button 
                                                class="btn btn-success btn-sm mt-2 border-0 rounded-circle p-2 btn-update-pic"
                                                @click="updatePicture"
                                            >
                                                <i class="fas fa-check text-white" style="font-size: 1rem;"></i>
                                            </button>
                                            <button 
                                                class="btn btn-danger btn-sm mt-2 border-0 rounded-circle p-2 btn-cancel-pic"
                                                @click="cancelPictureEditing"
                                            >
                                            <i class="fas fa-times text-white" style="font-size: 1rem;"></i>
                                        </button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-4" v-if="!isNameEditing">
                                    <div 
                                        class="user-name d-flex align-items-center justify-content-center" @mouseenter="isNameHovered=true"
                                        @mouseleave="isNameHovered=false"
                                    >
                                        <h3 v-if="userDetail" class="font-weight-bold text-center text-orange text-uppercase m-0 mr-2">{{ userDetail.name }}</h3>
                                        <i 
                                            class="fas fa-pencil-alt text-orange" 
                                            style="cursor: pointer;" 
                                            v-if="isNameHovered"
                                            @click="isNameEditing=true"
                                        />
                                    </div>
                                </div>
                                <div class="row justify-content-center mt-4" v-else>
                                    <div class="edit-name d-flex align-items-center justify-content-center">
                                        <input 
                                            type="text" 
                                            class="form-control text-center edit-name-input" 
                                            v-if="isNameEditing" 
                                            v-model="userDetail.name"
                                            @keyup.enter="updateName"
                                        >
                                        <div class="mx-1 mt-1">
                                            <i 
                                                class="fas fa-check text-success mr-2 fa-md" 
                                                style="cursor: pointer;" 
                                                v-if="isNameEditing"
                                                @click="updateName"
                                            />
                                            <i 
                                                class="fas fa-times text-danger fa-md" 
                                                style="cursor: pointer;" 
                                                v-if="isNameEditing"
                                                @click="cancelEditName"
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="row justify-content-center" v-if="!isEmailEditing">
                                    <div 
                                        class="user-email d-flex align-items-center justify-content-center"
                                        @mouseenter="isEmailHovered=true"
                                        @mouseleave="isEmailHovered=false"
                                    >
                                        <p class="m-0 mr-2 text-center text-muted">{{ userDetail.email }}</p>
                                        <i 
                                            class="fas fa-pencil-alt text-orange" 
                                            style="cursor: pointer;" 
                                            v-if="isEmailHovered"
                                            @click="isEmailEditing=true"
                                        />
                                    </div>  
                                </div>
                                <div class="row justify-content-center" v-else>
                                    <div class="edit-email d-flex align-items-center justify-content-center">
                                        <input 
                                            type="email" 
                                            class="form-control text-center edit-email-input" 
                                            v-if="isEmailEditing" 
                                            v-model="userDetail.email"
                                            @keyup.enter="updateEmail"
                                            required
                                        >
                                        <div class=" mt-1 w-25">
                                            <i 
                                                class="fas fa-check text-success mr-2 fa-md" 
                                                style="cursor: pointer;" 
                                                v-if="isEmailEditing"
                                                @click="updateEmail"
                                            />
                                            <i 
                                                class="fas fa-times text-danger fa-md" 
                                                style="cursor: pointer;" 
                                                v-if="isEmailEditing"
                                                @click="cancelEditEmail"
                                            />
                                        </div>
                                    </div>
                                </div>                            
                                <hr>
                                <form id="change-password-form" @submit.prevent="submitChangePassword">
                                    <div class="change-password mt-2">
                                        <h5 class="text-center text-dark">Change Password</h5>
                                        <div class="row mt-4">
                                            <div class="col-md-4 mt-2">
                                                <input 
                                                    :type="showPassword ? 'text' : 'password'"
                                                    class="form-control" 
                                                    v-model="changePasswordForm.old_password"
                                                    placeholder="Old Password"
                                                    required
                                                >
                                            </div>
                                            <div class="col-md-4 mt-2">
                                               <!--  <input 
                                                    :type="showPassword ? 'text' : 'password'" class="form-control" 
                                                    v-model="changePasswordForm.new_password"
                                                    placeholder="New Password"
                                                    required
                                                > -->
                                               
                                                <Password 
                                                    v-model="changePasswordForm.new_password"
                                                    class="w-100"
                                                    inputId="profile_change_password"
                                                    :change="getStrengthPassword"
                                                    :pt="{
                                                        input: {
                                                            type: showPassword ? 'text' : 'password',
                                                            placeholder: 'New Password',
                                                            class: 'form-control',
                                                            required: true
                                                        },
                                                        info: {
                                                            class: 'text-muted',
                                                            style: 'font-size: 0.8rem'
                                                        }
                                                    }"
                                                >
                                                    <template #header>
                                                        <h6>Pick a password</h6>
                                                    </template>
                                                    <template #footer>
                                                        <Divider />
                                                        <p class="mt-2">Suggestions</p>
                                                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                                            <li>At least one lowercase</li>
                                                            <li>At least one uppercase</li>
                                                            <li>At least one numeric</li>
                                                            <li>Minimum 8 characters</li>
                                                        </ul>
                                                    </template>
                                                </Password>
                                                <!-- <passwordMeter 
                                                    :password="changePasswordForm.new_password" :show="true" 
                                                    class="d-none"
                                                    @score="onScore"
                                                /> -->
                                            </div>
                                            <div class="col-md-4 mt-2">
                                                <input 
                                                    :type="showPassword ? 'text' : 'password'"
                                                    class="form-control"
                                                    v-model="changePasswordForm.confirm_password" 
                                                    placeholder="Confirm Password"
                                                    required
                                                >
                                            <div class="custom-control custom-checkbox float-right">
                                                    <input class="custom-control-input" type="checkbox" id="customCheckbox1" value="option1" @click="showPassword=!showPassword" style="cursor: pointer">
                                                    <label for="customCheckbox1" class="custom-control-label text-muted">Show Password</label>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="row">                                      
                                            <div class="col-md-12 mt-3">
                                                <div class="text-center">
                                                    <button class="btn btn-primary">Change Password</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
        <FooterComponent/>
    </div>
</template>

<script setup>
    import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
    import SidebarComponent from "@/components/layouts/SidebarComponent.vue";
    import FooterComponent from "@/components/layouts/FooterComponent.vue";

    import { ref, onMounted } from "vue";
    import { useToast } from "vue-toastification";
    import { useProfileManagementStore } from "@/store/profile-management.js";
    import { useLogStore } from "@/store/logs.js";

    import passwordMeter from "vue-simple-password-meter";

    const toast = useToast();
    const profileStore = useProfileManagementStore();
    const logStore = useLogStore();

    const userDetail = ref([]);

    const loadToast = (message, type) => {
      toast(message, {
          timeout: 2000,
          type: type,
          position: 'top-right',
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          newestOnTop: true,
          draggable: true,
          draggablePercent: 0.6,
          dangerouslyHTMLString: true,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
          theme: 'colored',
          transition: 'bounce'
      });
    };

    const loadProfileData = () => {
        profileStore.getProfileData();
        userDetail.value = JSON.parse(sessionStorage.getItem("user"));
    }

    /* edit name */
    const isNameHovered = ref(false);
    const isNameEditing = ref(false);
    const name = ref(JSON.parse(sessionStorage.getItem("user")).name);

    const updateName = () => {
        if(userDetail.value.name !== '') {
            isNameEditing.value = false;
            sessionStorage.setItem("user", JSON.stringify(userDetail.value));
            profileStore.updateUserName(userDetail.value.name).then((response) => {
                name.value = userDetail.value.name;
                loadToast(response.message, "success");
                logStore.addNewLog('Updated name to '+userDetail.value.name, 'Profile');
            }).catch((error) => {
                loadToast(error.message, "error");
            })
        } else {
            toast.error("Name cannot be empty!");
        }
    }

    const cancelEditName = () => {
        isNameEditing.value = false;
        isNameHovered.value = false;
        userDetail.value.name = JSON.parse(sessionStorage.getItem("user")).name;
    }

    /* edit email */
    const isEmailHovered = ref(false);
    const isEmailEditing = ref(false);

    const updateEmail = () => {
        if(userDetail.value.email !== '') {
            isEmailEditing.value = false;
            sessionStorage.setItem("user", JSON.stringify(userDetail.value));
            profileStore.updateUserEmail(userDetail.value.email).then((response) => {
                loadToast(response.message, "success");
                logStore.addNewLog('Updated email to '+userDetail.value.email, 'Profile');
            }).catch((error) => {
                loadToast(error.message, "error");
            })
        } else {
            toast.error("Email cannot be empty!");
        }
    }

    const cancelEditEmail = () => {
        isEmailEditing.value = false;
        isEmailHovered.value = false;
        userDetail.value.email = JSON.parse(sessionStorage.getItem("user")).email;
    }

    /* edit picture */
    const has_picture = ref(false);
    const BASE_URL = import.meta.env.VITE_LARAVEL_API_URL;
    const isPictureEditing = ref(false);
    const picture = ref(JSON.parse(sessionStorage.getItem("user")).picture);

    const pictureEditing = () => {
        
        document.getElementById("file_image").click();

        document.getElementById("file_image").addEventListener("change", function() {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = document.querySelector(".profile-pic");
                img.src = reader.result;

                isPictureEditing.value = true;
            }
            reader.readAsDataURL(file);
        });
    }

    const updatePicture = () => {
        const file = document.getElementById("file_image").files[0];
        const formData = new FormData();
        formData.append("file", file);
        /* profileStore.updateUserPicture(formData); */
        profileStore.updateUserPicture(formData).then((response) => {
            loadToast(response.message, "success");
            isPictureEditing.value = false;
            userDetail.value.picture = response.picture;
            picture.value = response.picture;
            sessionStorage.setItem("user", JSON.stringify(userDetail.value));
            logStore.addNewLog('Updated profile picture', 'Profile');
        }).catch((error) => {
            loadToast(error.message, "error");
        })
    }

    const cancelPictureEditing = () => {
        isPictureEditing.value = false;
        const img = document.querySelector(".profile-pic");
        document.getElementById("file_image").value = "";

        if (userDetail.value.picture === null) {
            has_picture.value = false;
            img.src = "src/assets/imgs/users/default-150x150.png";
        } else {
            has_picture.value = true;
            img.src = BASE_URL+'storage/images/'+userDetail.value.picture;
        }

    }

    /* change password */
    const changePasswordForm = ref({
        old_password: "",
        new_password: "",
        confirm_password: ""
    });

    const showPassword = ref(false);
    const strength = ref(null);

    const onScore = (score) => {
        /* strength.value = score.strength; */
    }

    const getStrengthPassword = () => {
        const password = document.querySelector('#profile_change_password');
    
        
        password.addEventListener('keyup', () => {
            const passwordLabel = document.querySelector('.p-password-info').innerHTML;
            strength.value = passwordLabel;
        });
    }

    onScore(strength.value);
    const submitChangePassword = (e) => {
        if(changePasswordForm.value.new_password !== changePasswordForm.value.confirm_password) {
            loadToast("New password and confirm password does not match!", "error");
        } else {
            /* if((strength.value !== 'risky') && (strength.value !== 'guessable') && (strength.value !== 'weak')) { */
            if((strength.value !== 'Weak') && (strength.value !== 'Medium')) {
                profileStore.changePassword(changePasswordForm.value).then((response) => {
                    if(response.status == 200){
                        loadToast(response.message, "success");
                        changePasswordForm.value = {
                            old_password: "",
                            new_password: "",
                            confirm_password: ""
                        };
                        logStore.addNewLog('Changed password', 'Profile');
                    } else {
                        loadToast(response.message, "error");
                    }
                
                }).catch((error) => {
                    loadToast(error.message, "error");
                })
            } else {
                loadToast("Password is not strong enough!", "error");
            }
           
        }
    }


    onMounted(() => {
        getStrengthPassword();
        loadProfileData();
        userDetail.value.picture === null ? has_picture.value = false : has_picture.value = true;
    })

</script>

<style scoped>
 .edit-name-input{
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    text-align: center;
    width: 50%;
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    background: transparent;
    outline: none;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
 }

 .edit-email-input {
    border: none;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    text-align: center;
    width: 100%;
    font-size: 1rem;
    color: #000;
    background: transparent;
    outline: none;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
 }

 .btn-edit-pic {
    position: absolute; 
    right: 40%; 
    bottom: -5%;
    width:35px; 
    height: 35px
 }

 .btn-update-pic {
    position: absolute; 
    right: 50%; 
    bottom: -5%;
    width:35px; 
    height: 35px
 }

 .btn-cancel-pic {
    position: absolute; 
    right: 30%; 
    bottom: -5%;
    width:35px; 
    height: 35px
 }

</style>