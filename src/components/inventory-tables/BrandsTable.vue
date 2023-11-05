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
                                            id="brand-management-table"
                                            ref="brands_table"
                                            :data="brands"
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
                                        <ConfirmDialog
                                            :dismissable-mask="true"
                                            :closable="true"
                                            :draggable="false"
                                            :resizable="false"
                                        ></ConfirmDialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- ADD NEW BRAND -->
                <Dialog 
                    v-model:visible="new_brand_modal"
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_brand_modal"
                    :style="{ width: '30rem' }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Add new brand</h4>
                        </div>
                    </template>
                    <form @submit.prevent="add_new_brand" id="new-brand-form">
                        <div class="row">
                            <div class="col-sm-12 mt-2">
                                <InputText 
                                    v-model.trim="new_brand"
                                    class="w-100"
                                    placeholder="Enter brand name"
                                    :maxlength="50"
                                    required
                                    autofocus
                                />
                            </div>
                            <div class="col-sm-12 mt-3">
                                <Dropdown 
                                    v-model="category"
                                    id="edit_category_dropdown"
                                    class="w-100"
                                    :options="category_items"
                                    optionLabel="category_name"
                                    optionValue="id"
                                    placeholder="Select category"
                                    filter
                                    showClear
                                    required
                                    @click="getCategoryData"
                                />
                            </div>
                        </div>
                    </form>
                    <template #footer>
                        <div class="text-center">
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-success"
                                size="small"
                                type="submit"
                                form="new-brand-form"
                            >
                                <i class="fas fa-save mr-1"></i> Save
                            </Button>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-danger"
                                size="small"
                                outlined 
                                @click="new_brand_modal = false"
                            >
                                <i class="fas fa-times mr-1"></i>
                                Cancel
                            </Button>
                        </div>
                    </template>
                </Dialog>

                <!-- UPDATE BRAND -->
                <Dialog 
                    v-model:visible="edit_brand_modal" 
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_brand_modal"
                    :style="{ width: '30rem' }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Update brand</h4>
                        </div>
                    </template>
                    <form @submit.prevent="update_brand" id="edit-brand-form">
                        <div class="row">
                            <div class="col-sm-12 mt-2">
                                <Skeleton v-if="edit_brand_loading" width="100%" height="50px" style="cursor: wait;" />
                                <InputText 
                                    v-else
                                    v-model.trim="edit_brand"
                                    class="w-100"
                                    placeholder="Enter brand name"
                                    :maxlength="50"
                                    required
                                />
                            </div>
                            <div class="col-sm-12 mt-3">
                                <Skeleton v-if="edit_brand_loading" width="100%" height="50px" style="cursor: wait;" />
                                <Dropdown 
                                    v-else
                                    v-model="edit_category_id"
                                    id="edit_category_dropdown"
                                    class="w-100"
                                    :options="category_items"
                                    optionLabel="category_name"
                                    optionValue="id"
                                    placeholder="Select category"
                                    filter
                                    showClear
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <template #footer>
                        <div v-if="edit_brand_loading" class="text-center d-flex align-items-center justify-content-center">
                            <Skeleton width="80px" height="40px" class="mt-2 mx-1" style="cursor: wait;" />
                            <Skeleton width="80px" height="40px" class="mt-2 mx-1" style="cursor: wait;" />
                        </div>
                        <div class="text-center" v-else>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-success"
                                size="small"
                                type="submit"
                                form="edit-brand-form"
                            >
                                <i class="fas fa-save mr-1"></i> Save
                            </Button>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-danger"
                                size="small"
                                outlined 
                                @click="edit_brand_modal = false"
                            >
                                <i class="fas fa-times mr-1"></i>
                                Cancel
                            </Button>
                        </div>
                    </template>
                </Dialog>
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
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "vue-toastification";

import { useCategoryStore } from "@/store/category.js";
import { useBrandStore } from "@/store/brands.js";

const categoryStore = useCategoryStore();
const brandStore = useBrandStore();

DataTable.use(DataTablesCore);
DataTable.use(Buttons);

const confirm = useConfirm();
const toast = useToast();
const swal = inject("$swal");
const counter = ref(0);
const brands = ref(null);
/* loadData */
const loadData = () => {
    brandStore.getBrandData().then((response) => {
        brands.value = response;
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
};

const category_items = ref(null);

const getCategoryData = () => {
    categoryStore.getCategoryData().then((response) => {
        category_items.value = response;
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
};

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
        data: "brand_name",
    },
    {
        data: "category_name",
    },
    {
        data: "created_at",
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
    },
    {
        data: "updated_at",
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
    },
    {
        data: "id",
        render: function (data, type, row) {

            var btn_edit_category = document.createElement("button");
            btn_edit_category.setAttribute("class", "btn btn-sm btn-primary btn-edit-brand");
            btn_edit_category.setAttribute("data-id", data);
            btn_edit_category.innerHTML = `<i class=\"fas fa-edit\" data-id="${data}"></i>`;


            var btn_delete_category = document.createElement("button");
            btn_delete_category.setAttribute("class", "btn btn-sm btn-danger btn-delete-brand");
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
            new_brand_modal.value = true;
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
        loadData();
    });
};

/* Add new brand */

const new_brand_modal = ref(false);
const new_brand = ref(null);
const category = ref(null);

const add_new_brand = () => {
    if(category.value == null) {
        loadToast('Please select category', 'error');
        return;
    } else {
        brandStore.addBrand(new_brand.value, category.value).then((response) => {
            if (response.status == 200) {
                new_brand_modal.value = false;
                new_brand.value = null;
                category.value = null;
                loadToast(response.message, 'success');
                loadData();
            }
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }
};

const edit_brand_modal = ref(false);
const edit_brand = ref(null);
const edit_brand_id = ref(null);
const edit_category_id = ref(null);
const edit_brand_loading = ref(true);

const update_brand = () => {
    if(edit_category_id.value == null) {
        loadToast('Please select category', 'error');
        return;
    } else {
        brandStore.updateBrand(edit_brand.value, edit_category_id.value, edit_brand_id.value).then((response) => {
            if (response.status == 200) {
                edit_brand_modal.value = false;
                clear_brand_modal();
                loadToast(response.message, 'success');
                loadData();
            }
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }
};

/* Edit and Delete brand */
const action = () => {
    const brandTable = document.querySelector('#brand-management-table');

    brandTable.addEventListener('click', function(e) {
        if(e.target.classList.contains('btn-edit-brand') || e.target.classList.contains('fa-edit')) {
            const id = e.target.getAttribute('data-id');
            edit_brand_modal.value = true;
            getCategoryData();
            brandStore.getBrandById(id).then((response) => {
                edit_brand_loading.value = false;
                edit_brand.value = response.brand_name;
                edit_brand_id.value = response.id;
                edit_category_id.value = response.category_id;
            }).catch((error) => {
                loadToast(error.message, 'error');
            });
        } else if (e.target.classList.contains('btn-delete-brand') || e.target.classList.contains('fa-trash')) {
            const id = e.target.getAttribute('data-id');
            confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Delete this brand?',
                icon: 'pi pi-question-circle',
                acceptLabel: 'Yes, delete it!',
                rejectLabel: 'No',
                acceptClass: 'p-button-success p-button-sm rounded mx-1',
                rejectClass: 'p-button-danger p-button-sm rounded mx-1',
                accept: () => {
                    brandStore.deleteBrand(id).then((response) => {
                        if (response.status == 200) {
                            loadToast(response.message, 'success');
                            loadData();
                        }
                    }).catch((error) => {
                        loadToast(error.message, 'error');
                    });
                },
                reject: () => {
                   
                }
            });
        }
    });
};


const clear_brand_modal = () => {
    new_brand.value = null;
    category.value = null;
    edit_brand.value = null;
    edit_category_id.value = null;
    edit_brand_loading.value = true;
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