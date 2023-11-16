<template>
  <div class="content-wrapper" style="min-height: 1599.06px;">
    <HeaderComponent/>
    <SidebarComponent/>
      <div class="user-management">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="text-dark"><i class="nav-icon fas fa-users"></i> User Management</h1>
              </div>
            </div>
          </div>
        </section>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card card-orange card-outline">
                  <div class="card-body" style="display: block;">
                    <DataTable 
                      class="table table-hover table-bordered table-sm text-dark display nowrap w-100"
                      id="user-management-table"
                      ref="user_table"
                      :data="employees"
                      :columns="columns"
                      :options="{
                          dom:            'Bftip',
                          scrollY:        '60vh',
                          scrollX:        true,
                          scrollCollapse: true,
                          destroy:        true,
                          responsive:     true,
                          autoWidth:      true,
                          serverSide:     false,  
                          processing:     true,
                          language:       {search: 'Search'},
                          buttons:        buttons,
                          lengthMenu:     lengthMenu,
                          deferRender:    true,
                          lengthChange:   false,
                          columnDefs: [
                            { responsivePriority: 1, targets: 0 },
                            { responsivePriority: 2, targets: -1 },
                            {
                                targets: 0,
                                className: 'text-center',
                            },
                            {
                                targets: [2, 3, 4, 5],
                                className: 'text-center align-middle',
                            },
                            {
                                targets: [1, 6],
                                className: 'text-center align-middle',
                                orderable: false,
                                searchable: false,
                            },
                          ],
                          order: [[ 0, 'asc' ]]
                      }"
                    >
                      <thead class="bg-dark text-white">
                        <tr>
                          <th>#</th>
                          <th>Picture</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      </tbody>
                    </DataTable>
                  </div>
                  <!-- <div class="card-footer" style="display: block;">
                    Footer
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- modal new user -->
      <div class="modal fade" data-backdrop="static" id="new-user-modal">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-orange">
              <h4 class="modal-title text-white">
                <i class="fas fa-user-plus"></i>
                New User
              </h4>
              <button type="button" class="btn-close btn-close-modal" @click="clearAddForm" data-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <form id="new-user-form" @submit.prevent="addUser" enctype="multipart/form-data">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <div class="d-flex justify-content-center">
                        <img class="img-circle img-fluid elevation-1" id="add-display-picture" @click="addImage" src="@/assets/imgs/users/default-150x150.png" alt="" style="cursor: pointer; width: 150px; height: 150px" />
                      </div>
                      <input id="add-picture" name="picture" v-on:change="addPhotoChange" type="file" autocomplete="picture" class="d-none" />
                    </div>
                    <div class="mb-3">
                      <label for="name" class="form-label">Name</label>
                      <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" required v-model="addUserForm.name">
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" required v-model="addUserForm.email">
                    </div>
                  </div>
                </div>
              </div>  
              <div class="modal-footer justify-content-center">
                <button type="submit" class="btn btn-sm btn-success">
                  <i class="fas fa-save"></i>
                  Save
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger btn-close-modal" data-dismiss="modal" @click="clearAddForm">
                  <i class="fas fa-times"></i>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <!-- edit user -->
      <div class="modal fade" data-backdrop="static" id="edit-user-modal">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-orange">
              <h4 class="modal-title text-white">
                <i class="fas fa-user-edit"></i>
                Edit User
              </h4>
              <button type="button" class="btn-close btn-close-edit-modal" @click="clearEditForm" data-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <form id="edit-user-form" @submit.prevent="editUser" enctype="multipart/form-data">
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <div class="d-flex justify-content-center">
                        <img class="img-circle img-fluid elevation-1" id="edit-display-picture" @click="editImage" src="@/assets/imgs/users/default-150x150.png" alt="" style="cursor: pointer; width: 150px; height: 150px" />
                      </div>
                      <input id="edit-picture" name="picture" v-on:change="editPhotoChange" type="file" autocomplete="picture" class="d-none" />
                    </div>
                    <input type="hidden" name="id" v-model="editUserForm.id">
                    <div class="mb-3">
                      <label for="name" class="form-label">Name</label>
                      <input type="text" class="form-control" id="name" name="name" placeholder="Enter name" required v-model="editUserForm.name">
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" required v-model="editUserForm.email">
                    </div>
                  </div>
                </div>
              </div>  
              <div class="modal-footer justify-content-center">
                <button type="submit" class="btn btn-sm btn-success">
                  <i class="fas fa-save"></i>
                  Save
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger btn-close-edit-modal" data-dismiss="modal" @click="clearEditForm">
                  <i class="fas fa-times"></i>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <FooterComponent/>
  </div>
</template>
    
<script setup>
    import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
    import SidebarComponent from "@/components/layouts/SidebarComponent.vue";
    import FooterComponent from "@/components/layouts/FooterComponent.vue";
    import DataTable from 'datatables.net-vue3';
    import DataTablesCore from 'datatables.net-bs5';
    import Buttons from 'datatables.net-buttons';
    import 'datatables.net-buttons/js/buttons.html5';
    import 'datatables.net-responsive';
    import 'datatables.net-select';
    
    
    import { useToast } from "vue-toastification";

    import { ref, onMounted, inject } from "vue";

    import { useUserManagementStore } from "@/store/user-management.js";
    import { useLogStore } from "@/store/logs.js";

    const users = useUserManagementStore();
    const logStore = useLogStore();
  
    DataTable.use(DataTablesCore);
    DataTable.use(Buttons);
  
    const toast = useToast();
    const swal = inject("$swal");

    const employees = ref(null);
    
    const columns = ref([
      {
        /* count */
        data: null,
        render: function (data, type, row, meta) {
          return meta.row + meta.settings._iDisplayStart + 1;
        }
      },
      {
        data: 'picture',
        render: function (data, type, row) {
          const api_url = import.meta.env.VITE_LARAVEL_API_URL+'images/'+data;

          const src = data != null ? api_url : 'src/assets/imgs/users/default-150x150.png';
          
          return '<img src="'+src+'" class="img-circle img-fluid elevation-1" style="width: 50px; height: 50px" />';
        }
      },
      {data: 'name'},
      {
        data: 'email',
        render: function (data, type, row) {
          return '<a href="mailto:'+data+'">'+data+'</a>';
        }
      },
      {data: 'created_at',
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
      },
      {data: 'updated_at',
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
      },
      {data: 'id',
        render: function (data, type, row) {

          var btn_edit = document.createElement('button');
          btn_edit.setAttribute('class', 'btn btn-sm btn-primary btn-edit-user');
          btn_edit.setAttribute('data-id', data);
          btn_edit.setAttribute('data-toggle','modal');
          btn_edit.setAttribute('data-target','#edit-user-modal');
          btn_edit.innerHTML = `<i class="fas fa-edit" data-id="${data}"></i>`;

          var btn_reset_pass = document.createElement('button');
          btn_reset_pass.setAttribute('class', 'btn btn-sm btn-warning btn-reset-pass');
          btn_reset_pass.setAttribute('data-id', data);
          btn_reset_pass.innerHTML = `<i class="fas fa-sync" data-id="${data}"></i>`;
          
          var btn_del = document.createElement('button');
          btn_del.setAttribute('class', 'btn btn-sm btn-danger btn-del-user');
          btn_del.setAttribute('data-id', data);
          btn_del.innerHTML = `<i class="fas fa-trash" data-id="${data}"></i>`;

          return '<center>'+btn_edit.outerHTML+' '+btn_reset_pass.outerHTML+' '+btn_del.outerHTML+'</center>';
        }
      }
    ]);

    const buttons = ref([
      {
        text: '<i class="fas fa-xs fa-plus"></i> New',
        titleAttr: 'Add new accident solution',
        className: 'btn btn-sm btn-dark',
        attr:  {
          id: 'btn-new',
          'data-toggle': 'modal',
          'data-target': '#new-user-modal'
        },
        init: function (api, node, config) {
          node.removeClass('dt-button');
        },
        action: function ( e, dt, node, config ) {
        
        }
      },
      {
        text: '<i class="fas fa-sync fa-sm"></i> Refresh',
        titleAttr: 'Show entries',
        className: 'btn btn-sm btn-dark',
        attr:  {
          id: 'btn-refresh'
        },
        init: function (api, node, config) {
          node.removeClass('dt-button');
        },
        action: function ( e, dt, node, config ) {
          loadData();
          dt.order([0, 'asc']).draw();
          dt.columns.adjust().responsive.recalc();
          /* getDT(dt); */
        }
      },
      {
        extend: 'csv',
        text: '<i class="fas fa-download fa-sm"></i> Export',
        title: "Gohlong Tire and Service Users",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
          id: 'btn-csv'
        },
        init: function (api, node, config) {
          node.removeClass('dt-button');
        },
        exportOptions: {
          columns: [ 0, 2, 3, 4, 5 ]
        },
      },
      {
        text: '<i class="fas fa-eye fa-sm"></i> Show entries',
        extend: "pageLength",
        titleAttr: 'Show entries',
        className: "btn btn-sm btn-dark",
        init: function (api, node, config) {
          node.removeClass('dt-button');
        },
      },
    ]);

     const lengthMenu = ref([
      [  -1, 10, 25, 50 ],
      [ 
        'Show all',
        '10 rows', 
        '25 rows', 
        '50 rows'
      ]
    ]);

    const windowResize = () => {
      window.addEventListener('resize', function() {
        loadData();
      });
    };

    const addImage = () => {
        document.getElementById('add-picture').click();

        /* display photo in image when #picture was changed */
        document.getElementById('add-picture').onchange = (e) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                document.getElementById('add-display-picture').src = e.target.result;
            };
        };
    };

    const editImage = () => {
        document.getElementById('edit-picture').click();

        /* display photo in image when #picture was changed */
        document.getElementById('edit-picture').onchange = (e) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                document.getElementById('edit-display-picture').src = e.target.result;
            };
        };
    };


    const loadData = () => {
      users.getUsersData().then((response) => {
        employees.value = response;
      }).catch((error) => {
        loadToast(error.response.data.message, 'error');
      });
    };

    const addUserForm = ref({
        name: '',
        email: '',
        password: 'GTSC@'+new Date().getFullYear(),
        password_confirmation: 'GTSC@'+new Date().getFullYear()
    });

    const addPhoto = ref(null);
    
    const addPhotoChange = (e) => {
      addPhoto.value = e.target.files[0];
    };

    const addUser = () => {

      const formData = new FormData();

      formData.append('picture',addPhoto.value);
      formData.append('name', addUserForm.value.name);
      formData.append('email', addUserForm.value.email);
      formData.append('password', addUserForm.value.password);
      formData.append('password_confirmation', addUserForm.value.password_confirmation);
 
      users.registerUser(formData).then((response) => {
        if (response.status == 200) {
          loadData();
          clearAddForm();
          const closeModal = document.querySelector('.btn-close-modal');
          closeModal.click();
          loadToast(response.message, 'success');
          logStore.addNewLog('Added new user: '+addUserForm.value.name, 'User Management');
        } else {
          loadToast(response.message, 'error');
        }
      }).catch((error) => {
        loadToast('Please check email if already exists & password if match', 'error');
       /* console.log(error.response.data.message.errors); */
      });
    };

    const editUserForm = ref({
        id: '',
        name: '',
        email: ''
    });

    const editPhoto = ref(null);

    const editPhotoChange = (e) => {
      editPhoto.value = e.target.files[0];
    };

    const editUser = () => {

      const formData = new FormData();

      formData.append('picture', editPhoto.value);
      formData.append('id', editUserForm.value.id);
      formData.append('name', editUserForm.value.name);
      formData.append('email', editUserForm.value.email);
      
      users.updateUser(formData).then((response) => {
        if (response.status == 200) {
          loadData();
          clearEditForm();
          const closeModal = document.querySelector('.btn-close-edit-modal');
          closeModal.click();
          loadToast(response.message, 'success');
          logStore.addNewLog('Updated details of '+editUserForm.value.name, 'User Management');
        } else {
          loadToast(response.message, 'error');
        }
      }).catch((error) => {
        loadToast(error.response.data.message, 'error');
      });
    };

    const action = () => {
      const userTable = document.querySelector('#user-management-table');

      userTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-edit-user') || e.target.classList.contains('fa-edit')) {
          const id = e.target.getAttribute('data-id');
          users.getUser(id).then((response) => {

            if(response.picture != null) {
              document.getElementById('edit-display-picture').src = import.meta.env.VITE_LARAVEL_API_URL+'images/'+response.picture;
            }

            editUserForm.value = response;
          }).catch((error) => {
            loadToast(error.response.data.message, 'error');
          });
        }
      });

      userTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-reset-pass') || e.target.classList.contains('fa-sync')) {
          const id = e.target.getAttribute('data-id');
          swal({
            icon: "question",
            title: "Are you sure to reset the password of this user?",
            text: "Please make sure before to proceed!",
            showCancelButton: true,
            confirmButtonColor: "#007bff",
            cancelButtonColor: "gray",
            confirmButtonText: "Yes, reset it",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              users.resetPassword(id).then((response) => {
                if (response.status == 200) {
                  loadData();
                  loadToast(response.message, 'success');
                  logStore.addNewLog('Reset password of '+response.name, 'User Management');
                } else {
                  loadToast(response.message, 'error');
                }
              }).catch((error) => {
                loadToast(error.response.data.message, 'error');
              });
            }
          });
        }
      });
      
      userTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-del-user') || e.target.classList.contains('fa-trash')) {
          const id = e.target.getAttribute('data-id');
          swal({
            icon: "question",
            title: "Are you sure to delete this user?",
            text: "Please make sure before to proceed!",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "gray",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              users.removeUser(id).then((response) => {
                if (response.status == 200) {
                  loadData();
                  loadToast(response.message, 'success');
                  logStore.addNewLog('Removed a user', 'User Management');
                } else {
                  loadToast(response.message, 'error');
                }
              }).catch((error) => {
                loadToast(error.response.data.message, 'error');
              });
            }
          });
        }
      });
    };

    const clearAddForm = () => {
      document.querySelector('#add-display-picture').src = 'http://localhost:3000/src/assets/imgs/users/default-150x150.png';
      document.querySelector('#new-user-form').reset();
      addPhoto.value = null
    };

    const clearEditForm = () => {
      document.querySelector('#edit-display-picture').src = 'http://localhost:3000/src/assets/imgs/users/default-150x150.png';
      document.querySelector('#edit-user-form').reset();
      editPhoto.value = null
    };

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

    onMounted(() => {
      action();
      windowResize();
      loadData();
    });

</script>
    
<style>
  @import 'datatables.net-bs5';
  @import 'datatables.net-buttons-dt';
  @import 'datatables.net-responsive-dt';
  @import 'datatables.net-select-dt';

</style>