<template>
    <div>
        <HeaderComponent />
        <SidebarComponent />
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-dark"><i class="nav-icon fas fa-clock"></i> Logs</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card card-orange card-outline">
                                <div class="card-body" style="display: block;">
                                    <DataTable 
                                        class="table table-hover table-bordered table-sm text-dark display nowrap w-100"
                                        id="logs-table"
                                        ref="logs_table"
                                        :data="logs"
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
                                                    targets: [1, 2, 3, 4, 5, 6, 7, 8],
                                                    className: 'text-center align-middle',
                                                }
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
                                                <th>Action</th>
                                                <th>Module</th>
                                                <th>IP Address</th>
                                                <th>Browser</th>
                                                <th>Date & Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent />
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

    import { 
        ref,
        onMounted
    } from "vue";

    import { useToast } from "vue-toastification";
    import { useLogStore } from "@/store/logs.js";

    const toast = useToast();
    const logStore = useLogStore();

    DataTable.use(DataTablesCore);
    DataTable.use(Buttons);

    const logs = ref([]);
    const loadData = () => {
        logStore.getLogsData().then((response) => {
            logs.value = response;
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }

    const getImageURL = (image) => {
        if (image == null) {
            return new URL(`/src/assets/imgs/users/default-150x150.png`, import.meta.url).href;
        } else {
            return new URL(import.meta.env.VITE_LARAVEL_API_URL+'storage/images/'+image, import.meta.url).href;
        }
    };

    const columns = ref([
        {
            data: null,
            render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: 'picture',
            render: function (data, type, row, meta) {
                const src = getImageURL(data);
                
                return '<img src="'+src+'" class="img-circle img-fluid elevation-1" style="width: 35px; height: 35px" />';
            }
        },
        {
            data: 'name',
            render: function (data, type, row, meta) {
                return data;
            }
        },
        {
            data: 'email',
            render: function (data, type, row, meta) {
                return '<small><a href="mailto:'+data+'">'+data+'</a></small>';
            }
        },
        {
            data: 'action',
            render: function (data, type, row, meta) {
                return data;
            }
        },
        {
            data: 'module',
            render: function (data, type, row, meta) {
                return data;
            }
        },
        {
            data: 'ip_address',
            render: function (data, type, row, meta) {
                return data;
            }
        },
        {
            data: 'browser',
            render: function (data, type, row, meta) {
                return data;
            }
        },
        {
            data: 'created_at',
            render: function (data, type, row) {
                return '<small>'+new Date(data).toLocaleString()+'</small>';
            }
        },
    ]);

    const buttons = ref([
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
        title: "Gohlong Tire and Service Logs",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
          id: 'btn-csv'
        },
        init: function (api, node, config) {
          node.removeClass('dt-button');
        },
        exportOptions: {
          columns: [ 0, 2, 3, 4, 5, 6, 7, 8]
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
        loadData();
        windowResize();
    });
    
</script>

<style>
  @import 'datatables.net-bs5';
  @import 'datatables.net-buttons-dt';
  @import 'datatables.net-responsive-dt';
  @import 'datatables.net-select-dt';

</style>