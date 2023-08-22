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
                      class="table table-hover table-bordered table-sm text-dark display w-100"
                      id="user-management-table"
                      ref="table"
                      :data="employees"
                      :columns="columns"
                      :options="{
                          responsive: true,
                          autoWidth: true,
                          dom: 'Bfrtip',
                          processing: true,
                          language: {search: 'Search'},
                          buttons: buttons,
                      }"
                    >
                      <thead class="bg-dark text-white">
                        <tr>
                          <th>#</th>
                          <th>Full name</th>
                          <th>Position</th>
                          <th>Section</th>
                          <th>Status</th>
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
    <FooterComponent/>
  </div>
</template>
    
<script setup>
    import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
    import SidebarComponent from "@/components/layouts/SidebarComponent.vue";
    import FooterComponent from "@/components/layouts/FooterComponent.vue";

    import DataTable from 'datatables.net-vue3';
    import DataTableLib from 'datatables.net-bs5';
    import Resposive from 'datatables.net-responsive';
    import Buttons from 'datatables.net-buttons';
    import AutoFilll from 'datatables.net-autofill';
    import DTable from 'datatables.net-dt';
    import 'datatables.net-select';
    
    import { useToast } from "vue-toastification";

    import axios from 'axios';

    import { ref, onMounted } from "vue";
  
    DataTable.use(
        DataTableLib,
        Resposive,
        Buttons,
        AutoFilll,
        DTable
    );
  
    const toast = useToast();

    const employees = ref(null);
    
    const columns = ref([
      {data: 'id'},
      {data: 'fullname'},
      {data: 'position'},
      {data: 'section'},
      {data: 'status'},
      {data: 'id',
        render: function (data, type, row) {
          return `<center><button class="btn btn-sm btn-primary" data-id=${data}><i class="fas fa-edit"></i></button> <button class="btn btn-sm btn-danger" data-id=${data} v-for='del' @click='deleteUser()'><i class="fas fa-trash"></i></button></center>`;
        }
      }
    ]);

    const buttons = ref([
      {
        text: '<i class="fas fa-sync fa-sm"></i> Refresh',
        titleAttr: 'Show entries',
        className: 'btn btn-sm btn-dark',
        attr:  {
          id: 'btn-refresh'
        },
        action: function ( e, dt, node, config ) {
         var sync = node.find('i');
         sync.addClass('fa-spin');

         setTimeout(function() {
           sync.removeClass('fa-spin');
         }, 1000);
        }
      },
      {
        text: '<i class="fas fa-xs fa-plus"></i> New',
        titleAttr: 'Add new accident solution',
        className: 'btn btn-sm btn-dark'
      }
    ]);

    const clickRefresh = () => {
      document.querySelector('#btn-refresh').addEventListener('click', () => {
        setTimeout(() => {
          loadData();
        }, 1000);
      });
    };

    const loadData = () => {
      /* axios.get('https://5fdb12ee91f19e00173339f5.mockapi.io/employee')
      .then(response => {
        employees.value = response.data;
        loadToast("Data successfully loaded!", "success");
      }) */
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

    const deleteUser = () => {
      alert();
    };

    onMounted(() => {
      loadData();
      clickRefresh();
    });

</script>
    
<style>
  @import 'datatables.net-bs5';
  
  .dataTables_filter {
    float: right;
    color: #000;
  }
  
  .dataTables_info {
    float: left;
    color: #000;
  }
  
  .dt-buttons {
    float: left;
  }
  
</style>