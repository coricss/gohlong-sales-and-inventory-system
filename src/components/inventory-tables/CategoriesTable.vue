<template>
    <div class="content-wrapper" style="min-height: 1599.06px;">
        <HeaderComponent/>
            <SidebarComponent/>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="text-dark"><i class="fas fa-shapes"></i> Manage Categories</h1>
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
                                            id="category-management-table"
                                            ref="category_table"
                                            :data="categories"
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
                                                    targets: [1, 2, 3],
                                                    className: 'text-center align-middle',
                                                },
                                                {
                                                    targets: 4,
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
                <Dialog 
                    v-model:visible="new_category_modal" 
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_category_modal"
                    :style="{ width: '30rem' }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Add new category</h4>
                        </div>
                    </template>
                    <form @submit.prevent="add_new_category" id="new-category-form">
                        <div class="row">
                            <div class="col-sm-12 mt-2">
                                <InputText 
                                    v-model.trim="new_category"
                                    class="w-100"
                                    placeholder="Enter category name"
                                    :maxlength="50"
                                    required
                                    autofocus
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
                                form="new-category-form"
                            >
                                <i class="fas fa-save mr-1"></i> Save
                            </Button>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-danger"
                                size="small"
                                outlined 
                                @click="new_category_modal = false"
                            >
                                <i class="fas fa-times mr-1"></i>
                                Cancel
                            </Button>
                        </div>
                    </template>
                </Dialog>

                <Dialog 
                    v-model:visible="edit_category_modal" 
                    :modal="true" 
                    :closable="true" 
                    :dismissable-mask="false" 
                    :draggable="false" 
                    :resizable="true"  
                    @hide="clear_category_modal"
                    :style="{ width: '30rem' }"
                >
                    <template #header>
                        <div class="text-center">
                            <h4 class="m-0 font-weight-bold">Update category</h4>
                        </div>
                    </template>
                    <form @submit.prevent="update_category" id="new-category-form">
                        <div class="row">
                            <div class="col-sm-12 mt-2">
                                <Skeleton v-if="edit_category_loading" width="100%" height="50px" style="cursor: wait;" />
                                <InputText 
                                    v-else
                                    v-model.trim="edit_category"
                                    class="w-100"
                                    placeholder="Enter category name"
                                    :maxlength="50"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                    <template #footer>
                        <div v-if="edit_category_loading" class="text-center d-flex align-items-center justify-content-center">
                            <Skeleton width="80px" height="40px" class="mt-2 mx-1" style="cursor: wait;" />
                            <Skeleton width="80px" height="40px" class="mt-2 mx-1" style="cursor: wait;" />
                        </div>
                        <div class="text-center" v-else>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-success"
                                size="small"
                                type="submit"
                                form="new-category-form"
                            >
                                <i class="fas fa-save mr-1"></i> Save
                            </Button>
                            <Button 
                                icon="pi pi-check"
                                class=" mt-2 mx-1 rounded p-button-danger"
                                size="small"
                                outlined 
                                @click="edit_category_modal = false"
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

const categoryStore = useCategoryStore();

DataTable.use(DataTablesCore);
DataTable.use(Buttons);

const confirm = useConfirm();
const toast = useToast();
const swal = inject("$swal");
const counter = ref(0);
const categories = ref(null);
/* loadData */
const loadData = () => {
    categoryStore.getCategoryData().then((response) => {
        categories.value = response;
    }).catch((error) => {
        loadToast(error.response.data.message, 'error');
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
            new_category_modal.value = true;
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
        title: "Gohlong Tire and Service Inventory Categories",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-csv'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        exportOptions: {
            columns: [ 0, 1, 2, 3]
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

/* Adding New Category */

const new_category_modal = ref(false);
const new_category = ref('');

const add_new_category = () => {
    categoryStore.addCategory(new_category.value).then((response) => {
        if (response.status == 200) {
            new_category_modal.value = false;
            new_category.value = '';
            loadToast(response.message, 'success');
            loadData();
        }
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
};

const edit_category_modal = ref(false);
const edit_category = ref('');
const category_id = ref('');
const edit_category_loading = ref(true);

const update_category = () => {
    categoryStore.updateCategory(edit_category.value, category_id.value).then((response) => {
        if (response.status == 200) {
            edit_category_modal.value = false;
            edit_category.value = '';
            category_id.value = '';
            loadToast(response.message, 'success');
            loadData();
        }
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
};

/* Edit and Delete Category */
const action = () => {
    const categoryTable = document.querySelector('#category-management-table');

    categoryTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-edit-category') || e.target.classList.contains('fa-edit')) {
            const id = e.target.getAttribute('data-id');
            edit_category_modal.value = true;

            categoryStore.getCategory(id).then((response) => {
                edit_category_loading.value = false;
                edit_category.value = response.category_name;
                category_id.value = response.id;
            }).catch((error) => {
                loadToast(error.message, 'error');
            });
        } else if (e.target.classList.contains('btn-delete-category') || e.target.classList.contains('fa-trash')) {
            const id = e.target.getAttribute('data-id');
            confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Delete this category?',
                icon: 'pi pi-question-circle',
                acceptLabel: 'Yes, delete it!',
                rejectLabel: 'No',
                acceptClass: 'p-button-success p-button-sm rounded mx-1',
                rejectClass: 'p-button-danger p-button-sm rounded mx-1',
                accept: () => {
                    categoryStore.deleteCategory(id).then((response) => {
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
}

const clear_category_modal = () => {
    new_category_modal.value = false;
    new_category.value = '';
    edit_category_modal.value = false;
    edit_category.value = '';
    category_id.value = '';
    edit_category_loading.value = true;
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