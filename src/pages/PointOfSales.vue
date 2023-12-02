<template>
    <div class="content-wrapper">
        <HeaderComponent />
        <SidebarComponent />
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="text-dark"><i class="fas fa-shopping-cart"></i> Point of Sales</h1>
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
                        <div class="col-md-4">
                            <!-- BARCODE -->
                            <div class="card card-orange card-outline">
                                <div class="card-header">
                                    <h4 class="text-dark" style="font-weight: 600">Search a Product Item</h4>
                                    <!-- 
                                        **THIS IS FOR SEARCH OR SCAN**
                                        <SelectButton 
                                        v-model="search_value" 
                                        :options="search_option" 
                                        aria-labelledby="basic" 
                                        :unselectable="true"
                                        @change="onSwtichToScan(search_value)"
                                    /> -->
                                </div>
                                <div class="card-body">
                                    <div class="row mb-4" v-if="search_value == 'Search'">
                                        <div class="col-md-12">
                                            <div class="p-inputgroup flex-1">
                                                <InputText 
                                                    id="search_item"
                                                    placeholder="Scan Barcode or Enter Product ID" 
                                                    v-model.trim="search"
                                                    @keyup.enter="search_item"
                                                    @keyup.delete="clear_item"
                                                    autofocus
                                                />
                                                <Button 
                                                    icon="fas fa-barcode" 
                                                    severity="secondary"
                                                    style="width: 50px; border-radius: 0 5px 5px 0"
                                                    @click="search_item"
                                                    :loading="search_loading"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-4" v-else>
                                        <div class="col-md-12">
                                            <div class="p-inputgroup flex-1">
                                                <div 
                                                    id="qr-reader"
                                                    style="width: 100%"
                                                    ref="qrReader"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="loading-item" v-if="search_loading">
                                        <div class="row mb-3" v-for="index in 7" :key="index">
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <Skeleton width="100%" class="mb-2" style="cursor: wait;"></Skeleton>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="model_size text-dark">
                                                    <Skeleton width="100%" class="mb-2" style="cursor: wait;"></Skeleton>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col-lg-8">
                                                <Skeleton width="100%" height="3rem" style="cursor: wait;"></Skeleton>
                                            </div>
                                            <div class="col-lg-4">
                                                <Skeleton width="100%" height="3rem" style="cursor: wait;"></Skeleton>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="loaded-item" v-else>
                                        <div class="item_detail" v-if="item_found">
                                            <div class="row mb-3">
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 class="font-weight-bold">Product ID:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 
                                                            class=""
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-html="product.product_id"
                                                        >
                                                            
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 class="font-weight-bold">Model/Size:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 
                                                            class=""
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-html="product.model_size"
                                                        >
                                                        
                                                        </h6>
                                                        <!-- 175/65 R14 -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3 mt-3">
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 class="font-weight-bold">Brand:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 
                                                            class=""
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-html="product.brand"
                                                        >
                                                        
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3 mt-3">
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 class="font-weight-bold">Category:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 
                                                            class=""
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-html="product.category"
                                                        >
                                                        
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3 mt-3">
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 class="font-weight-bold">Price:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="model_size text-dark d-flex align-items-center">
                                                        <span class="mr-1">&#8369;</span>
                                                        <h6 
                                                            class="m-0"
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-html="product.price"
                                                        >
                                                        
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3 mt-3">
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 class="font-weight-bold">Discounted Price:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="model_size text-dark d-flex align-items-center">
                                                        <span class="mr-1">&#8369;</span>
                                                        <h6 
                                                            class="m-0"
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-html="product.discounted_price"
                                                        >
                                                        
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-3 mt-3">
                                                <div class="col-6">
                                                    <div class="model_size text-dark">
                                                        <h6 class="font-weight-bold">Stocks:</h6>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="model_size text-dark d-flex align-items-center">
                                                        <h6 
                                                            class="m-0"
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-html="product.stocks"
                                                            v-if="product.stocks > 0"
                                                        >
                                                        
                                                        </h6>
                                                        <h6 
                                                            class="m-0 text-danger"
                                                            style="word-break: break-all; white-space: normal;"
                                                            v-else
                                                        >
                                                            Out of Stock
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-8 mt-3 quantity_wrapper">
                                                    <div class="p-inputgroup flex-1">
                                                        <InputNumber 
                                                            inputId="item_quantity"
                                                            v-model="item_quantity" 
                                                            buttonLayout="horizontal"
                                                            showButtons 
                                                            :min="1"
                                                           
                                                            decrementButtonClass="p-button-danger" 
                                                            incrementButtonClass="p-button-success" 
                                                            incrementButtonIcon="pi pi-plus" 
                                                            decrementButtonIcon="pi pi-minus"
                                                            suffix=" piece(s)"
                                                            style="width: 100%; height: 40px; font-size: 15px; word-break: break-all; white-space: normal;"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 mt-3 quantity_wrapper">
                                                    <div class="p-inputgroup flex-1 d-flex align-items-center">
                                                        <ToggleButton 
                                                            v-model="is_discounted" 
                                                            class="rounded"
                                                            onIcon="pi pi-check"
                                                            offIcon="pi pi-times"
                                                            onLabel="Discounted"
                                                            offLabel="No Discount"
                                                            onIconPos="left"
                                                            offIconPos="right"
                                                            onClass="p-button-success"
                                                            offClass="p-button-danger"
                                                            style="width: 100%; height: 40px; font-size: 15px; word-break: break-all; white-space: normal;"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="empty_item" v-else>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="d-flex justify-content-center align-items-center flex-column">
                                                        <img src="@/assets/imgs/empty_item.png" alt="Empty" class="img-fluid" style="width: 230px; height: 230px">
                                                        <h4 class="text-dark m-0">No Item Found</h4>
                                                        <p class="text-dark m-0">Please scan barcode or enter a valid product ID</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <Button 
                                                icon="fas fa-plus"
                                                class="w-100 mt-3 rounded" 
                                                size="large"
                                                :disabled="!item_found || product.stocks == 0"
                                                @click="add_item"
                                            >
                                                <i class="pi pi-plus mr-2"></i>
                                                Add Item
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                           <!--  ITEMS -->
                            <div class="card card-orange card-outline">
                                <div class="card-header">
                                    <h4 class="text-dark" style="font-weight: 600">List of Items</h4>
                                </div>
                                <div class="card-body">
                                    <ConfirmPopup id="confirm_remove_all"></ConfirmPopup>
                                    <DataTable
                                            class="table table-hover table-bordered table-sm text-dark display nowrap w-100"
                                            id="list-of-items"
                                            ref="list_of_items"
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
                                                info:           false,
                                                columnDefs: [
                                                    { responsivePriority: 1, targets: 0 },
                                                    { responsivePriority: 2, targets: -1 },
                                                    {
                                                        targets: 0,
                                                        className: 'text-center',
                                                    },
                                                    {
                                                        targets: [1, 2, 3, 4, 5, 6, 7],
                                                        className: 'text-center align-middle',
                                                    },
                                                    {
                                                        targets: 8,
                                                        className: 'text-center align-middle data_total_price',
                                                    },
                                                    {
                                                        targets: 10,
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
                                                    <th>Product ID</th>
                                                    <th>Model/Size</th>
                                                    <th>Brand</th>
                                                    <th>Category</th>
                                                    <th>Price</th>
                                                    <th>Discounted Price</th>
                                                    <th>Is Discounted</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </DataTable>
                                </div>
                                <div class="p-5">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="d-flex justify-content-start align-items-center">
                                                <h5 class="text-dark m-0">Total Items:</h5>
                                                <h5 class="text-dark m-0 mx-2">
                                                    {{total_quantity}}
                                                </h5>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="d-flex justify-content-end align-items-center">
                                                <h5 class="text-dark m-0">Total Price:</h5>
                                                <h5 class="text-dark m-0 mx-2">
                                                    <strong>
                                                        <span>&#8369;</span>
                                                        {{ total_price.toFixed(2) }}
                                                    </strong>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-12">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <Button 
                                                    icon="pi pi-cart-plus"
                                                    class="w-50 mt-3 rounded" 
                                                    size="large"
                                                    :disabled="total_quantity == 0"
                                                    @click="checkout_dialog"
                                                >
                                                    <i class="pi pi-cart-plus mr-2" style="font-size: 18px"></i>
                                                    Checkout
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Dialog v-model:visible="check_out_dialog" :modal="true" :closable="true" :dismissable-mask="true" :draggable="true" :resizable="true"  @hide="clear_payment">
                <template #header>
                    <div class="text-center">
                        <h4 class="m-0 font-weight-bold">Checkout Items</h4>
                    </div>
                </template>
                <div class="row">
                    <strong>Transaction ID:&nbsp;</strong> {{ transaction_id }}
                </div>
                <div class="row">
                    <div class="col-sm-12 mt-2">
                        <div class="d-flex justify-content-center align-items-center flex-column">
                            <!-- payment icon -->
                            <img src="@/assets/imgs/credit_card.png" alt="Empty" class="img-fluid mr-3" style="width: 200px; height: 200px">
                            <h1 class="text-orange m-0 mt-2 font-weight-bold" @click="payment=total_price" style="cursor: pointer">
                                <span>&#8369;</span>
                                {{ total_price.toFixed(2) }}
                            </h1>

                            <h6 class="text-dark m-0 mt-3">
                                <span>Total Items:</span>
                                {{ total_quantity }}
                            </h6>
                            <div class="flex-auto mt-3 w-100">
                                <label for="cashier_name" class="font-bold block"> Cashier Name: </label>
                                <InputText
                                    placeholder="Enter cashier name"
                                    id="cashier_name"
                                    v-model.trim="cashier_name"
                                    style="width: 100%; height: 40px; font-size: 15px; word-break: break-all; white-space: normal;"
                                    readonly
                                />
                            </div>
                            <div class="flex-auto mt-3 w-100">
                                <label for="customer_name" class="font-bold block"> Customer Name: </label>
                                <InputText
                                    placeholder="Enter customer name"
                                    ref="input_customer_name"
                                    id="customer_name"
                                    v-model.trim="customer_name" 
                                    style="width: 100%; height: 40px; font-size: 15px; word-break: break-all; white-space: normal;"
                                    autofocus
                                />
                            </div>
                            <div class="flex-auto mt-3 w-100">
                                <label for="payment" class="font-bold block"> Payment: </label>
                                <InputNumber
                                    @click="mark_value"
                                    mode="currency"
                                    currency="PHP"
                                    label="Payment"
                                    inputId="payment"
                                    v-model="payment" 
                                    style="width: 100%; height: 40px; font-size: 15px; word-break: break-all; white-space: normal;"
                                />
                            </div>
                            <h5 class="text-dark m-0 mt-3" v-if="payment >= total_price">
                                <span>Change: </span>
                                <span>&#8369;</span>
                                {{ (payment - total_price).toFixed(2) }}
                            </h5>
                            <h5 class="text-dark m-0 mt-3" v-else>
                                <span>Balance Due: </span>
                                <span>&#8369;</span>
                                {{ (total_price - payment).toFixed(2) }}
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 mt-4">
                        <div class="d-flex justify-content-center align-items-center">
                            <ConfirmPopup id="confirm_checkout"></ConfirmPopup>
                            <Button 
                               
                                icon="pi pi-check"
                                class="w-100 mt-2 mx-1 rounded" 
                                size="large"
                                :disabled="total_quantity == 0"
                                @click="confirm_checkout($event)"
                            >
                                <span><i class="pi pi-check mr-2" style="font-size: 15px"></i></span>
                                <span>Checkout</span>
                            </Button>
                            <Button
                                icon="pi pi-check"
                                class="w-100 mt-2 mx-1 rounded p-button-danger d-flex justify-content-center align-items-center"
                                size="large"
                                :disabled="total_quantity == 0"
                                @click="check_out_dialog = false"
                            >
                                <span><i class="pi pi-times mr-2" style="font-size: 15px"></i></span>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
            <Dialog class="invoice-dialog" v-model:visible="invoice_visible" :modal="true" :closable="true" :style="{ width: '800px' }" :dismissable-mask="false" :draggable="true" :resizable="true" wi  @hide="close_invoice">
                <template #header>
                    <div class="text-center invoice_header">
                        <h4 class="m-0 font-weight-bold">Invoice</h4>
                    </div>
                </template>
                <div class="body p-4" id="invoice-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="company-logo text-center">
                                <img src="@/assets/imgs/logos/gohlong-logo.png" alt="Company Logo" class="img-fluid" style="width: 300px; height: 100px; pointer-events: none;">
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3 mb-5">
                        <div class="col-sm-12">
                            <p style="font-size: 15px" class="text-center store-address m-0">National Highway, Parian Calamba City, Laguna 4027</p>
                        </div>
                    </div>
                    <div class="content px-5">
                        <div class="row mt-2">
                            <div class="col-sm-8 mt-2">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="flex-auto">
                                        <h6 class="text-dark m-0">
                                            <span>Trasaction ID: </span>
                                            <strong>{{ transaction_id }}</strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 mt-2">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="flex-auto">
                                        <h6 class="text-dark m-0">
                                            <span>Date of Issue: </span>
                                            <strong>{{ new Date().toLocaleDateString() }}</strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                                <div class="col-sm-12 mt-1">
                                    <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="flex-auto" >
                                        <h6 class="text-dark m-0">
                                            <span>Cashier: </span>
                                            <strong class="text-uppercase">{{ cashier_name }}</strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-sm-12 mt-1">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="flex-auto">
                                        <h6 class="text-dark m-0">
                                            <span>Customer: </span>
                                            <strong class="text-uppercase">{{ customer_name }}</strong>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="mt-4 mb-1" style="border-top: 3px solid #ff7300">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-sm text-dark display nowrap w-100" id="table-invoice">
                                        <thead class="text-orange" id="table-invoice-thead" style="width: 100%; font-size: small;">
                                            <tr>
                                                <th>#</th>
                                                <th>Quantity</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody id="table-invoice-tbody">
                                            <tr v-for="(item, index) in items" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.quantity }}</td>
                                                <td style="word-break: break-all; white-space: normal;">
                                                    {{ item.product_id }}
                                                </td>
                                                <td>
                                                    <span>&#8369;</span>
                                                    {{ item.price }}
                                                </td>
                                                <td>
                                                    <span>&#8369;</span>
                                                    {{ item.subtotal.toFixed(2) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <div class="d-flex justify-content-end align-items-center py-2">
                                    <table class="p-5">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Subtotal: 
                                                    <span>&#8369;</span>
                                                    {{ subtotal.toFixed(2) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Discount: 
                                                    <span>&#8369;</span>
                                                    {{ (subtotal - total_price).toFixed(2) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Payment: 
                                                    <span>&#8369;</span>
                                                    {{ payment.toFixed(2) }}
                                                </td>
                                            </tr>
                                            <tr v-if="payment >= total_price">
                                                <td>
                                                    Change: 
                                                    <span>&#8369;</span>
                                                    {{ (payment - total_price).toFixed(2) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>Total Amount:
                                                    <span>&#8369;</span>
                                                    {{ total_price.toFixed(2) }}
                                                    </strong> 
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <hr class="mt-4 mb-1" style="border-top: 3px solid #ff7300">
                        <div class="row mt-3 mb-5">
                            <div class="col-sm-12">
                                <p style="font-size: 15px" class="text-center store-address m-0">If you have any question please contact: gohlong.tire@yahoo.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <ConfirmDialog></ConfirmDialog>
                    <div class="text-center invoice_footer d-flex align-items-center justify-content-center">
                        <Button 
                            icon="pi pi-print"
                            class="w-25 mt-2 mx-1 rounded p-button-success d-flex justify-content-center align-items-center"
                            size="sm"
                            @click="print_invoice"
                        >
                            <span><i class="pi pi-print mr-2" style="font-size: 15px"></i></span>
                            <span>Print</span>
                        </Button>
                        <Button 
                            icon="pi pi-undo"
                            class="w-25 mt-2 mx-1 rounded p-button-primary d-flex justify-content-center align-items-center"
                            size="sm"
                            @click="revert_transcation()"
                        >
                            <span><i class="pi pi-undo mr-2" style="font-size: 15px"></i></span>
                            <span>Revert</span>
                        </Button>
                        <Button
                            icon="pi pi-check"
                            class="w-25 mt-2 mx-1 rounded p-button-danger d-flex justify-content-center align-items-center"
                            size="sm"
                            @click="invoice_visible = false"
                        >
                            <span><i class="pi pi-times mr-2" style="font-size: 15px"></i></span>
                            <span>Close</span>
                        </Button>  
                    </div>
                </template>
            </Dialog>
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

/* const invoice_body = ref(null); */
const print_invoice = () => {
    var invoice_body = document.getElementById('invoice-body').innerHTML;

    var invoice_window = window.open('', '', 'height=1080,width=1920');

    invoice_window.document.write('<html><head><title></title>');
    invoice_window.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css">');
    invoice_window.document.write('</head><style>.store-address {font-size: 15px}</style><body >');
    invoice_window.document.write(invoice_body);
    invoice_window.document.write('</body></html>');
    invoice_window.document.close();
    invoice_window.focus();
    invoice_window.print();
    invoice_window.close();
}

DataTable.use(DataTablesCore);
DataTable.use(Buttons);

import { 
    ref,
    onMounted,
    watch
} from "vue";

import { Html5QrcodeScanner, Html5Qrcode, Html5QrcodeScanType  } from 'html5-qrcode';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "vue-toastification";
import { useProductStore } from "@/store/products.js";
import { useSaleStore } from "@/store/sales.js";
import { useLogStore } from "@/store/logs.js";

const productStore = useProductStore();
const saleStore = useSaleStore();
const logStore = useLogStore();
const confirm = useConfirm();
const toast = useToast();

const search_value = ref('Search');
const search_option = ref(['Search', 'Scan']);

const search = ref(null);
const product = ref([
    product_id => null,
    model_size => null,
    brand => null,
    category => null,
    price => 0,
    discounted_price => 0,
    quantity => null,
    is_discounted => false,
    stocks => null,
]);

const items = ref([]);
const item_found = ref(false);
const item_quantity = ref(1);
const is_discounted = ref(false);
const total_quantity = ref(0);
const total_price = ref(0);
const subtotal = ref(0);
const check_out_dialog = ref(false);
const transaction_id = ref(null);
const input_customer_name = ref();
const cashier_name = ref(null);
const customer_name = ref(null);
const payment = ref(0);
const invoice_visible = ref(false);

const confirm_checkout = (event) => {
    if(customer_name.value == '' || customer_name.value == null) {
        loadToast('Please enter customer name', 'error');
        document.getElementById('customer_name').focus();
    }
    else if(payment.value < total_price.value) {
        loadToast('Insufficient payment', 'error');
        document.getElementById('payment').click();
    } else {
        confirm.require({
            target: event.currentTarget,
            message: 'Are you sure you want to checkout?',
            icon: 'pi pi-question-circle',
            position: 'topleft',
            acceptLabel: 'Yes, checkout!',
            rejectLabel: 'No',
            acceptClass: 'p-button-success p-button-sm rounded mx-1',
            rejectClass: 'p-button-danger p-button-sm rounded mx-1',
            accept: () => {
                invoice_visible.value = true;
                check_out();
                logStore.addNewLog('Confirmed Checkout','Point of Sales');
            },
            reject: () => {
                /* loadToast('test', 'error'); */
            },
        });
    }
    
}

const startScan = () => {
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const cameraId = devices[devices.length - 1].id;
            const config = { 
            fps: 1, 
            qrbox: {width: 300, height: 100},
            aspectRatio: {min: 1, max: 100},
            rememberLastUsedCamera: true,
            /* formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128], */
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            useBarCodeDetectorIfSupported: true,
            };
            const html5QrCode = new Html5Qrcode("qr-reader");
            html5QrCode.start(
                cameraId, 
                config, 
                (decodedText) => {
                    search.value = decodedText;
                    search_item();
                    html5QrCode.stop();
                }
            )
        }
    }).catch(err => {
        loadToast(`Error scanning Barcode: ${err}`, 'error');
    });
}

const onSwtichToScan = (value) => {
   if(value === 'Scan') {
    startScan();
   } else {
    search.value = null;
    item_found.value = false; 
   }
}

const search_loading = ref(false);
const search_item = () => {
    search_loading.value = true;
    setTimeout(() => {
        if(search.value == null || search.value == '') {
            item_found.value = false;
            search_loading.value = false;
        } else {
           
            /* search function */

            productStore.getProductByProductCode(search.value).then(response => {
                if(response.product == null ) {
                    clear_item();
                    loadToast('No product found', 'error');
                } else {
                    if(response.status == 200 ) {
                        product.value.product_id = response.product.product_id;
                        product.value.model_size = response.product.model_size;
                        product.value.brand = response.product.brand_name;
                        product.value.category = response.product.category_name;
                        product.value.price = response.product.price;
                        product.value.discounted_price = response.product.discount;
                        is_discounted.value = false;
                        product.value.stocks = response.product.stocks + response.product.old_stocks;
                        product.value.is_discounted = is_discounted.value;

                        items.value.forEach(item => {
                            if(item.product_id == product.value.product_id) {
                                item_found.value = true;
                                product.value.stocks = product.value.stocks - item.quantity;
                            }
                        });

                        item_found.value = true; 
                        search_loading.value = false;
                        
                    } else {
                        loadToast('Item not found', 'error');
                        item_found.value = false;
                        search_loading.value = false;
                    }
                }
                
                
            }).catch(error => {
                loadToast(`Error searching product: ${error}`, 'error');
                search_loading.value = false;
                clear_item();
            });

        } 

        
    }, 1000);
}

const clear_item = () => {
    product.value.product_id = null;
    product.value.model_size = null;
    product.value.brand = null;
    product.value.category = null;
    product.value.price = 0;
    product.value.discounted_price = 0;
    product.value.stocks = null;
    product.value.is_discounted = false;
    is_discounted.value = false;
    search_loading.value = false;
    search.value = null;
}

const add_item = () => {

    /*
    * If stocks = 0 then return out of stock
    * else if stocks < item_quantity then item_quantity = stocks
    * then stocks -= item_quantity
    */
   
    if(product.value.stocks == 0) {
        loadToast('Item is out of stock', 'error');
    } else if (product.value.stocks < item_quantity.value) {
        loadToast('Insufficient stocks', 'error');

    } else {
        
       /*  if(product.value.stocks < item_quantity.value) {
            item_quantity.value = product.value.stocks;
        }

        product.value.stocks -= item_quantity.value; */

        /* find product.value.product_id in items */
        const item_index = items.value.findIndex(item => item.product_id == product.value.product_id);
        
        if(item_index != -1) {
            const is_disc = is_discounted.value ? 'Yes' : 'No';
            if(items.value[item_index].is_discounted != is_disc) {
                items.value.unshift({
                    id: items.value.length + 1,
                    product_id: product.value.product_id,
                    model_size: product.value.model_size,
                    brand: product.value.brand,
                    category: product.value.category,
                    price: product.value.price,
                    discounted_price: product.value.discounted_price,
                    is_discounted: is_discounted.value ? 'Yes' : 'No',
                    quantity: item_quantity.value,
                    subtotal: is_discounted.value ? product.value.discounted_price * item_quantity.value : product.value.price * item_quantity.value,
                });
            } else {
                items.value[item_index].quantity += item_quantity.value;
                items.value[item_index].subtotal = is_discounted.value ? product.value.discounted_price * items.value[item_index].quantity : product.value.price * items.value[item_index].quantity;
            }
        } else {
            items.value.unshift({
                id: items.value.length + 1,
                product_id: product.value.product_id,
                model_size: product.value.model_size,
                brand: product.value.brand,
                category: product.value.category,
                price: product.value.price,
                discounted_price: product.value.discounted_price,
                is_discounted: is_discounted.value ? 'Yes' : 'No',
                quantity: item_quantity.value,
                subtotal: is_discounted.value ? product.value.discounted_price * item_quantity.value : product.value.price * item_quantity.value,
            });
        }
        
        const total_price_of_column = items.value.reduce((accumulator, item) => {
            return accumulator + item.subtotal;
        }, 0);

        const total_quantity_column = items.value.reduce((accumulator, item) => {
            return accumulator + item.quantity;
        }, 0);

        item_quantity.value = 1;
        total_quantity.value = total_quantity_column;
        total_price.value = total_price_of_column;
        search.value = null;
        item_found.value = false;
        search_value === 'Scan' && startScan();
    }

    document.getElementById('search_item').focus();
}

const remove_item = () => {
    const items_table = document.getElementById('list-of-items');

    items_table.addEventListener('click', function(e) {
        if(e.target.classList.contains('btn-remove-item') || e.target.classList.contains('fa-trash')) {
            const item_id = e.target.getAttribute('data-id');
            const item_index = items.value.findIndex(item => item.id == item_id);
            items.value.splice(item_index, 1);
            total_price.value = items.value.reduce((accumulator, item) => {
                return accumulator + item.subtotal;
            }, 0);

            total_quantity.value = items.value.reduce((accumulator, item) => {
                return accumulator + item.quantity;
            }, 0);

            item_found.value = false;
            search.value = null;
        }
    });

}

const mark_value = () => {
    const payment_input = document.getElementById('payment');
    payment_input.select();
}

const clear_payment = () => {
    cashier_name.value = null;
    customer_name.value = null;
    payment.value = 0;
}

const close_invoice = () => {
    check_out_dialog.value = false;
    items.value = [];
    total_price.value = 0;
    total_quantity.value = 0;
    item_found.value = false;
    search.value = null;
}

const check_out = () => {
    const sale = {
        cashier_name: cashier_name.value,
        transaction_id: transaction_id.value,
        customer_name: customer_name.value,
        total_price: total_price.value,
        payment: payment.value,
        change: payment.value - total_price.value,
        items: items.value,
    };

    var item_total = [];

    items.value.forEach(item => {
        item_total.push(item.quantity * parseFloat(item.price));
    });

    subtotal.value = item_total.reduce((accumulator, item) => {
        return accumulator + item;
    }, 0);

    saleStore.addSale(sale).then(response => {
        if(response.status == 200) {
            loadToast('Checkout successful', 'success');
        } else {
            loadToast('Checkout failed', 'error');
        }
    }).catch(error => {
        loadToast(`Error checking out: ${error}`, 'error');
    });
}

const columns = ref([
    {
        /* count */
        data: null,
        render: function (data, type, row, meta) {
            return meta.row + 1;
        }
    },  
    {
        data: "product_id",
    },
    {
        data: "model_size",
    },
    {
        data: "brand",
    },
    {
        data: "category",
    },
    {
        data: "price",
        render: function (data, type, row) {
            return '<center><small>'+new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data)+'</small></center>';
        }
    },
    {
        data: "discounted_price",
        render: function (data, type, row) {
            return '<center><small>'+new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data)+'</small></center>';
        }
    },
    {data: "is_discounted"},
    {
        data: "quantity",
    },
    {
        data: "subtotal",
        render: function (data, type, row) {
            return '<center><small><strong>'+new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(data)+'</strong></small></center>';
        }
    },
    {
        data: "id",
        render: function (data, type, row) {
            var btn_remove_item = document.createElement("button");
            btn_remove_item.setAttribute("class", "btn btn-sm btn-danger btn-remove-item");
            btn_remove_item.setAttribute("data-id", data);
            btn_remove_item.innerHTML = `<i class=\"fas fa-trash\" data-id="${data}"></i>`;

            return '<center>'+btn_remove_item.outerHTML+'</center>';

        }
    },

]);

const confirm_remove_all = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to remove all items?',
        icon: 'pi pi-question-circle',
        position: 'topleft',
        acceptLabel: 'Yes, remove all items!',
        rejectLabel: 'No',
        acceptClass: 'p-button-success p-button-sm rounded mx-1',
        rejectClass: 'p-button-danger p-button-sm rounded mx-1',
        accept: () => {
           loadToast('Removed all items', 'success');
            items.value = [];
            total_price.value = 0;
            total_quantity.value = 0;
            item_found.value = false;
            search.value = null;
        },
        reject: () => {
           /*  loadToast('Cancelled', 'error'); */
        }
    });
}

const buttons = ref([
    {
        text: '<i class="fas fa-trash fa-sm"></i> Remove All',
        titleAttr: 'Remove all items',
        className: 'btn btn-sm btn-danger',
        attr:  {
            id: 'btn-remove'
        },
        init: function (api, node, config) {
            node.removeClass('dt-button');
        },
        action: function ( e, dt, node, config ) {
            var count = dt.rows().count();
            if(count == 0) {
                loadToast('No items to remove', 'error');
            } else {
                confirm_remove_all(e);
               
            }
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
    [ 10, 25, 50, -1, ],
    [ 
        '10 rows', 
        '25 rows', 
        '50 rows',
        'Show all',
    ]
]);

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

const windowResize = () => {
    window.addEventListener('resize', function() {
        /* loadData(); */
        document.getElementById('btn-refresh').click();
    });
};

/* const initComplete = (settings, json) => {
    
}; */

const checkout_dialog = () => {
    count_sales();
    check_out_dialog.value = true;
    cashier_name.value = JSON.parse(sessionStorage.getItem('user')).name;
}

const count_sales = () => {
    saleStore.countSales().then(response => {
        var count = response + 1;
        transaction_id.value = (new Date().getMonth() + 1) + '-' + new Date().getDate() + '-' + new Date().getFullYear() + '-ST-' + count.toString().padStart(4, '0');
    }).catch(error => {
        loadToast(`Error getting transaction ID: ${error}`, 'error');
    });
}

const revert_transcation = () => {
    confirm.require({
        header: 'Revert this transaction: ' + transaction_id.value,
        message: 'Are you sure you want to revert this transaction?',
        icon: 'pi pi-question-circle',
        acceptLabel: 'Yes, revert!',
        rejectLabel: 'No',
        acceptClass: 'p-button-success p-button-sm rounded mx-1',
        rejectClass: 'p-button-danger p-button-sm rounded mx-1',
        accept: () => {
            saleStore.revertTransaction(transaction_id.value).then(response => {
                if(response.status == 200) {
                    loadToast('Transaction reverted', 'success');
                    invoice_visible.value = false;
                    items.value = [];
                    total_price.value = 0;
                    item_found.value = false;
                    search.value = null;
                    logStore.addNewLog('Reverted Transaction','Point of Sales');
                } else {
                    loadToast('Transaction not reverted', 'error');
                }
            }).catch(error => {
                loadToast(`Error reverting transaction: ${error}`, 'error');
            });
        },
        reject: () => {
            /* loadToast('Cancelled', 'error'); */
        }
    });

}

onMounted(() => {
    windowResize();
    remove_item();
});

</script>

<style>
@import 'datatables.net-bs5';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';

.p-inputnumber-button-up {
    border-radius: 0 5px 5px 0 !important;
    border-left: 0 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-color: #ced4da !important;
}

.p-inputnumber-button-down {
    border-radius: 5px 0 0 5px !important;
    border-left: 0 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-color: #ced4da !important;
}

input#item_quantity {
    border-radius: 0px !important;
}

.table-invoice th {
    border: 1px solid #dee2e6 !important;
}


tbody#table-invoice-tbody {
    display:block;
    height:200px;
    overflow:auto;
}
thead#table-invoice-thead, tbody#table-invoice-tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}
thead#table-invoice-thead {
    width: calc( 100% - 1em )
}
table#table-invoice {
    width:900px;
}

#qr-reader {
    /* responsive */
    width: 100% !important;
}

#qr-reader video {
    width: 100% !important;
}

#qr-shaded-region {
    width: 100% !important;
}

</style>