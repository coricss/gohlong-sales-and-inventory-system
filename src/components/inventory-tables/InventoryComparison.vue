<template>
    <div class="content-wrapper" style="min-height: 1599.06px;">
        <HeaderComponent/>
            <SidebarComponent/>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="text-dark"><i class="fas fa-exchange-alt"></i> Inventory Comparison</h1>
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
                                        <InputText
                                            class="w-100 mb-3"
                                            style="opacity: 0; position: absolute;"
                                            id="product_name_barcode"
                                            type="text"
                                            v-model="product_name_barcode"
                                            placeholder="Enter product name or barcode"
                                            @change="scan_product_barcode"
                                        />
                                        <DataTable
                                            class="table table-hover table-bordered table-sm text-dark display nowrap w-100"
                                            id="discrepancy-management-table"
                                            @click="get_actual_stocks($event)"
                                            :data="discrepancy_items"
                                            :columns="discrepancy_columns"
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
                                                buttons:        discrepancy_buttons,
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
                                                },
                                                /* {
                                                    targets: 9,
                                                    className: 'text-center',
                                                    orderable: false,
                                                } */
                                                {
                                                    targets: 8,
                                                    className: 'text-center',
                                                    orderable: false,
                                                }
                                                ],
                                                order: [[ 0, 'asc' ]]
                                            }"
                                        >
                                            <thead class="bg-dark text-white">
                                                <tr style="font-size: 12px;">
                                                    <th>#</th>
                                                    <th>Product ID</th>
                                                    <th>Model/Size</th>
                                                    <th>Brand</th>
                                                    <th>Category</th>
                                                <!--  <th>Total Recorded Stocks</th> -->
                                                    <th>Actual Stocks</th>
                                                    <th>Discrepancy</th>
                                                    <th>Created At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </DataTable>
                                        <Dialog
                                            v-model:visible="edit_actual_stocks_modal"
                                            :modal="true" 
                                            :closable="true" 
                                            :dismissable-mask="false" 
                                            :draggable="false" 
                                            :resizable="true"  
                                            @hide="clear_actual_stocks_modal"
                                            :style="{ width: '25rem', }"
                                        >
                                            <template #header>
                                                <div class="text-start">
                                                    <span class="m-0 font-weight-bold">Update <span style="text-decoration: underline; font-weight: bold;">{{ product_name ? product_name : 'product' }}'s</span> actual stocks</span>
                                                </div>
                                            </template>
                                            <form @submit.prevent="update_actual_stocks" id="update-actual-stocks-form">
                                                <div class="row">
                                                    <div class="col-sm-12 mt-2">
                                                        <InputNumber
                                                            class="w-100"
                                                            inputId="actual-stocks"
                                                            v-model="edit_actual_stocks"
                                                            placeholder="Enter actual stocks"
                                                            :min="0"
                                                            suffix=" pc(s)"
                                                            showButtons
                                                            required
                                                            decrementButtonClass="p-button-secondary" 
                                                            incrementButtonClass="p-button-secondary" 
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
                                                        form="update-actual-stocks-form"
                                                    >
                                                        <i class="fas fa-save mr-1"></i> Save
                                                    </Button>
                                                    <Button 
                                                        icon="pi pi-check"
                                                        class=" mt-2 mx-1 rounded p-button-danger"
                                                        size="small"
                                                        outlined 
                                                        @click="edit_actual_stocks_modal = false"
                                                    >
                                                        <i class="fas fa-times mr-1"></i>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </template>
                                        </Dialog>
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

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "vue-toastification";
import { useProductStore } from "@/store/products.js";

const productStore = useProductStore();

DataTable.use(DataTablesCore);
DataTable.use(Buttons);

const confirm = useConfirm();
const toast = useToast();
const swal = inject("$swal");
const product_items = ref(null);
const discrepancy_items = ref(null);

const loadData = () => {
    /* productStore.getProductData().then((response) => {
        product_items.value = response;
    }).catch((error) => {
        loadToast(error.message, 'error');
    }); */

    productStore.getProductData().then((response) => {
        discrepancy_items.value = response;
        adminStaffComparisonModal.value = true;
        get_actual_stocks();
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
};

const edit_product_modal = ref(false);
const edit_product_id = ref(null);
const edit_stocks = ref(null);
const edit_expiration_date = ref();

const action = () => {
    /* const productTable = document.querySelector('#stocks-management-table');
    productTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-edit-product') || e.target.classList.contains('fa-edit')) {
            const id = e.target.getAttribute('data-id');
            edit_product_id.value = id;
            edit_product_modal.value = true;
            productStore.getProductById(id).then((response) => {
                edit_stocks.value = response.stocks;
                edit_expiration_date.value = response.expiration_date === null ? 'Please set an expiration date' : new Date(response.expiration_date);
            }).catch((error) => {
                loadToast(error.message, 'error');
            });
        }
    }); */
}


const update_product = () => {
    if ((edit_stocks.value === null || edit_stocks.value === 0 || edit_stocks.value === '') || (edit_expiration_date.value === 'Please set an expiration date' || edit_expiration_date.value === '' || edit_expiration_date.value === null)) {
        loadToast('Please enter details properly', 'error');
        return false;
    } else {
        const data = {
            stocks: edit_stocks.value,
            expiration_date: new Date(edit_expiration_date.value).toLocaleDateString('en-PH', { year: 'numeric', month: 'numeric', day: 'numeric' }),
        };
        productStore.updateInventoryStocks(data, edit_product_id.value).then((response) => {
            loadToast(response.message, 'success');
            edit_product_modal.value = false;
            clear_product_modal();
            loadData();
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }
}


const adminStaffComparisonModal = ref(false);

const discrepancy_buttons = ref([
{
        text: '<i class="fas fa-expand fa-sm"></i>  Scan Toggle',
        title: "Gohlong Tire and Service Inventory Products",
        titleAttr: 'Scan Barcode',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-scan-barcode',
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        action: function ( e, dt, node, config ) {
            /* active this button */
            if(document.querySelector('#btn-scan-barcode').classList.contains('active')) {
                document.querySelector('#btn-scan-barcode').classList.remove('active');
                document.querySelector('#btn-scan-barcode').classList.remove('btn-warning');
                document.querySelector('#btn-scan-barcode').classList.add('btn-dark');
                document.querySelector('#btn-scan-barcode').innerHTML = '<i class="fas fa-expand fa-sm"></i> Scan Toggle';
               /*  document.querySelector('#product_name_barcode').focus(); */
            } else {
                document.querySelector('#btn-scan-barcode').classList.add('active');
                document.querySelector('#btn-scan-barcode').classList.remove('btn-dark');
                document.querySelector('#btn-scan-barcode').classList.add('btn-warning');
                document.querySelector('#btn-scan-barcode').innerHTML = '<i class="fas fa-expand fa-sm"></i> Scanning...';
                document.querySelector('#product_name_barcode').focus();
            }
        }
    },
    {
        /* print */
        extend: 'csv',
        text: '<i class="fas fa-download fa-sm"></i> Export',
        title: "Admin-Staff Inventory Comparison",
        titleAttr: 'Export',
        className: 'btn btn-sm btn-dark',
        attr:  {
            id: 'btn-csv'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        exportOptions: {
           /*  columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8] */
            columns: [ 0, 1, 2, 3, 4, 5, 6, 7]
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


const discrepancy_columns = ref([
    {
        /* count */
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
        }
    },
    {
        data: "product_id"
    },
    {
        data: "model_size"
    },
    {
        data: "brand_name"
    },
    {
        data: "category_name"
    },
    // {
    //     /* add two columns */
    //     data: null,
    //     render: function (data, type, row) {
    //         return row.old_stocks + row.stocks;
    //     }
    // },
    {
        data: "actual_stocks",
        render: function (data, type, row) {
            return data == null ? '<center><span class="badge badge-danger">No items checked</span></center>' : data;
        }
    },
    {
        data: null,
        render: function (data, type, row) {
            var total_stocks = row.old_stocks + row.stocks;
            var actual_stocks = row.actual_stocks;

            if(actual_stocks !== null) {
                if(actual_stocks > total_stocks) {
                    return '<center><span class="badge badge-info">+'+(actual_stocks - total_stocks)+'</span></center>'
                } else if(actual_stocks < total_stocks) {
                        return '<center><span class="badge badge-danger">-'+(total_stocks - actual_stocks)+'</span></center>'
                } else {
                        return '<center><span class="badge badge-success">No discrepancy</span></center>'
                }
            } else {
                return '<center><span class="badge badge-warning">Update actual stocks</span></center>'
           }  
        }
    },
    {
        data: "created_at",
        render: function (data, type, row) {
          return '<small>'+new Date(data).toLocaleString()+'</small>';
        }
    },
    {
        data: "id",
        render: function (data, type, row) {
            var product_id = row.product_id;
            var actual_stocks = row.actual_stocks;

            var btn_update_actual_stocks = document.createElement("button");
            btn_update_actual_stocks.setAttribute("class", "btn btn-md btn-primary btn-update-actual-stocks");
            btn_update_actual_stocks.setAttribute("title", "Update actual stocks");
            btn_update_actual_stocks.setAttribute("data-id", data);
            btn_update_actual_stocks.setAttribute("data-product", product_id);
            btn_update_actual_stocks.setAttribute("data-actual-stocks", actual_stocks);
            btn_update_actual_stocks.innerHTML = `<i class=\"fas fa-cubes\" data-id="${data}" data-product="${product_id}" data-actual-stocks="${actual_stocks}"></i>`;

            return '<center>'+btn_update_actual_stocks.outerHTML+'</center>';
        }
    }  
]);

const edit_actual_stocks_modal = ref(false);
const actual_stocks_id = ref(null);
const product_name = ref(null);
const product_name_barcode = ref(null);
const edit_actual_stocks = ref(null);

const get_actual_stocks = (e) => {
    if(e !== undefined) {
        if(e.target.classList.contains('btn-update-actual-stocks') || e.target.classList.contains('fa-cubes')) {
            edit_actual_stocks_modal.value = true;

            const id = e.target.getAttribute('data-id');
            const product_id = e.target.getAttribute('data-product');
            const actual_stocks = e.target.getAttribute('data-actual-stocks');
 
            actual_stocks_id.value = id;
            product_name.value = product_id;
            edit_actual_stocks.value = !parseInt(actual_stocks) ? 0 : parseInt(actual_stocks);
        }
    }
}

const scan_product_barcode = () => {
    productStore.getProductByBarcode(product_name_barcode.value).then((response) => {
        if(response.status == 200) {
            edit_actual_stocks.value = !parseInt(edit_actual_stocks.value) ? 0 : parseInt(edit_actual_stocks.value);
            edit_actual_stocks.value += 1;

            /* update actual stocks in db */
            const data = {
                actual_stocks: edit_actual_stocks.value,
            };

            productStore.addActualStocks(data, response.product.id).then((response) => {
                if(response.status == 200) {
                    productStore.getProductData().then((response) => {
                        discrepancy_items.value = response;
                        clear_actual_stocks_modal();
                        product_name_barcode.value = null;
                    }).catch((error) => {
                        loadToast(error.message, 'error');
                    });
                    loadToast(response.message, 'success');
                } else {
                    loadToast(response.message, 'error');
                }
            }).catch((error) => {
                loadToast(error.message, 'error');
            });
        } else {
            loadToast(response.message, 'error');
            product_name_barcode.value = null;
        }
    }).catch((error) => {
        loadToast(error.message, 'error');
    });
}

const update_actual_stocks = () => {
    if(edit_actual_stocks.value === null) {
        loadToast('Please enter details properly', 'error');
        return false;
    } else {
        const data = {
            actual_stocks: edit_actual_stocks.value,
        };
        productStore.updateActualStocks(data, actual_stocks_id.value).then((response) => {
            if(response.status == 200) {
                productStore.getProductData().then((response) => {
                    discrepancy_items.value = response;
                    clear_actual_stocks_modal();
                }).catch((error) => {
                    loadToast(error.message, 'error');
                });
                loadToast(response.message, 'success');
            } else {
                loadToast(response.message, 'error');
            }
            document.querySelector('#product_name_barcode').focus();
        }).catch((error) => {
            loadToast(error.message, 'error');
        });
    }
}

const clear_actual_stocks_modal = () => {
    product_name.value = null;
    edit_actual_stocks.value = null;
    edit_actual_stocks_modal.value = false;
    product_name_barcode.value = null;
}

const clear_product_modal = () => {



    edit_stocks.value = null;
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

#btn-scan-barcode.active {
    background-color: #ff771d !important;
    color: #000 !important;
}

#btn-scan-barcode:hover {
    background-color: #ff822f !important;
    color: #000 !important;
}

</style>