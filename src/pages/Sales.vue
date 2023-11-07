<template>
    <div class="content-wrapper" style="min-height: 1599.06px;">
      <!--   <Toast /> -->
        <HeaderComponent/>
        <SidebarComponent/>
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-dark"><i class="nav-icon fas fa-cash-register"></i> Sales</h1>
                        </div>
                        <!-- <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Layout</a></li>
                        <li class="breadcrumb-item active">Fixed Footer Layout</li>
                        </ol>
                        </div> -->
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
                                        :data="sales"
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
                                                    targets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                                                    className: 'text-center align-middle',
                                                }
                                            ],
                                            order: [[ 0, 'asc' ]]
                                        }"
                                        >
                                        <thead class="bg-dark text-white">
                                            <tr>
                                                <th>#</th>
                                                <th>Customer Name</th>
                                                <th>Product ID</th>
                                                <th>Model/Size</th>
                                                <th>Brand</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Discounted Price</th>
                                                <th>Is Discounted</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                                <th>Payment</th>
                                                <th>Change</th>
                                                <th>Created At</th>
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
            </section>
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

    import { 
        ref,
        onMounted
    } from "vue";

    DataTable.use(DataTablesCore);
    DataTable.use(Buttons);

    const sales = ref([
        {
            'customer_name': 'test',
            'product_id': '21qwe',
            'model_size': '123x12',
            'brand': 'adsqwe',
            'category': 'asd',
            'price': '100',
            'discounted_price': '123',
            'is_discounted': 'Yes',
            'quantity': '5',
            'subtotal': '500',
            'payment': '500',
            'change': '0',
            'created_at': '2023-11-07'
        },
    ]);

    const columns = ref([
        {
            /* count */
            data: null,
            render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        {
            data: 'customer_name'
        },
        {data: 'product_id'},
        {data: 'model_size'},
        {data: 'brand'},
        {data: 'category'},
        {data: 'price'},
        {data: 'discounted_price'},
        {data: 'is_discounted'},
        {data: 'quantity'},
        {data: 'subtotal'},
        {data: 'payment'},
        {data: 'change'},
        {data: 'created_at'},
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
          /* loadData(); */
          dt.order([0, 'asc']).draw();
          dt.columns.adjust().responsive.recalc();
          /* getDT(dt); */
        }
      },
      {
        extend: 'csv',
        text: '<i class="fas fa-download fa-sm"></i> Export',
        title: "Gohlong Tire and Service Sales",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
          id: 'btn-csv'
        },
        init: function (api, node, config) {
          node.removeClass('dt-button');
        },
        exportOptions: {
          columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
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

</script>

<style>
  @import 'datatables.net-bs5';
  @import 'datatables.net-buttons-dt';
  @import 'datatables.net-responsive-dt';
  @import 'datatables.net-select-dt';

</style>