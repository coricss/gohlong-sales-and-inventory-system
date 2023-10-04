<template>
  <div class="wrapper">
    <footer class="main-footer">
      <div class="float-right d-none d-sm-block">
        <b>{{ timeAndDate }}</b>
      </div>
      <strong>Copyright &copy; {{ year }} <router-link to="">Gohlong Tire and Service Center</router-link>.</strong> All rights reserved.
    </footer>
  </div>
</template>
  
<script setup>
  import { ref } from "vue";
  const year = ref(new Date().getFullYear());
  const timeAndDate = ref(new Date().toLocaleString());

  setInterval(() => {
    timeAndDate.value = new Date().toLocaleString();
  }, 1000);
</script>