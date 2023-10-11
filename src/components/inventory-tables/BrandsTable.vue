<template>
    <div class="content-wrapper" style="min-height: 1599.06px;">
        <HeaderComponent/>
            <SidebarComponent/>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="text-dark"><i class="fas fa-tags"></i> Manage Brands</h1>
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
                                            id="brands-management-table"
                                            ref="brands_table"
                                            :data="items"
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
                                                    targets: [1, 2, 3, 4],
                                                    className: 'text-center align-middle',
                                                },
                                                {
                                                    targets: 5,
                                                    className: 'text-center',
                                                    orderable: false,
                                                }
                                                ],
                                                order: [[ 0, 'asc' ]]
                                            }"
                                        >
                                            <thead class="bg-dark text-white">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Brand</th>
                                                    <th>Category</th>
                                                    <th>Created At</th>
                                                    <th>Updated At</th>
                                                    <th>Action</th>
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

import { ref, onMounted, inject } from "vue";

import { useToast } from "vue-toastification";

DataTable.use(DataTablesCore);
DataTable.use(Buttons);

const toast = useToast();
const swal = inject("$swal");
const counter = ref(0);

/* loadData */
/* const loadData = () => {
      users.getUsersData().then((response) => {
        employees.value = response;
      }).catch((error) => {
        loadToast(error.response.data.message, 'error');
      });
}; */
const items = ref([
    {
        id:1,
        model_size:"32",
        brand:"hkhj",
        category:"eqweq",
        quantity:"2",
        price:"Php 2",
        discounted_price:"Php 23",
        total_stock_price:"Php 4",
        total_stock_discounted_price:"Php 46",
        created_at:"12\/09\/2023 02:14 PM",
        updated_at:"07\/09\/2023 10:12 PM"
    },
    {
        id:2,
        model_size:"32",
        brand:"hkhj",
        category:"eqweq",
        quantity:"2",
        price:"Php 2",
        discounted_price:"Php 23",
        total_stock_price:"Php 4",
        total_stock_discounted_price:"Php 46",
        created_at:"12\/09\/2023 02:14 PM",
        updated_at:"07\/09\/2023 10:12 PM"
    }
]);

/* Columns */
const columns = ref([
    {
        /* count */
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
        }
    },
    {
        data: "brand",
    },
    {
        data: "category",
    },
    {
        data: "created_at",
    },
    {
        data: "updated_at",
    },
    {
        data: "id",
        render: function (data, type, row) {

            var btn_edit_category = document.createElement("button");
            btn_edit_category.setAttribute("class", "btn btn-sm btn-primary btn-edit-category");
            btn_edit_category.setAttribute("data-id", data);
            btn_edit_category.innerHTML = `<i class=\"fas fa-edit\" data-id="${data}"></i>`;


            var btn_delete_category = document.createElement("button");
            btn_delete_category.setAttribute("class", "btn btn-sm btn-danger btn-delete-category");
            btn_delete_category.setAttribute("data-id", data);
            btn_delete_category.innerHTML = `<i class=\"fas fa-trash\" data-id="${data}"></i>`;

            return '<center>'+btn_edit_category.outerHTML+' '+btn_delete_category.outerHTML+'</center>';

        }
    },

])

/* Buttons */
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
           /*  loadData(); */
            dt.order([0, 'asc']).draw();
            dt.columns.adjust().responsive.recalc();
            /* getDT(dt); */
        }
    },
    {
        extend: 'csv',
        text: '<i class="fas fa-download fa-sm"></i> Export',
        title: "Gohlong Tire and Service Products",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-csv'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        exportOptions: {
            columns: [ 0, 1, 2, 3, 4, 5]
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
/* lengthmenu */
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
        /* loadData(); */
    });
};


onMounted(() => {
    windowResize();
});

</script>

<style>
@import 'datatables.net-bs5';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';

</style>