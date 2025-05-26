<script setup>
import { ref } from 'vue';
import { productCategories, productInventoryData } from '../data/DummyData.js';
import _ from 'lodash';
import { computed } from 'vue';
const inventoryData = ref([...productInventoryData]); //copying the array so it can be manipulated

//modal for alert
const alertModalVisible = ref(true);
const closeAlertModal = () => {
    alertModalVisible.value = false;
}

//inventory status based on available inventory
const inventoryStatus = (inventory) => {
    if (inventory.available_inventory > 5) {
        return "In Stock"
    }
    else if (inventory.available_inventory < 5 && inventory.available_inventory > 0) {
        return "Low Stock"
    }
    else {
        return "Out of Stock"
    }
}
const stockLevelClass = (inventory) => { // to get the css class
    const status = inventoryStatus(inventory);
    if (status === "In Stock") return "bg-green-100 text-green-800";
    if (status === "Low Stock") return "bg-yellow-100 text-yellow-800";
    if (status === "Out of Stock") return "bg-red-100 text-red-800";
    return "";
};

const lowStockProducts = computed(() => {
    return productInventoryData.filter((product) => {
        const status = inventoryStatus(product);
        return status === "Low Stock" || status === "Out of Stock";
    });
});

//sort functions
const sortById = () => {
    inventoryData.value = _.orderBy(inventoryData.value, ['id'], ['asc']);

}
const sortByName = () => {
    // console.log("current inventory data", inventoryData.value);
    inventoryData.value = _.orderBy(inventoryData.value, ['name'], ['asc']);
    // console.log("sorted inventory data", inventoryData.value);
}
const sortByCategory = () => {
    inventoryData.value = _.orderBy(inventoryData.value, ['category'], ['asc']);
}
const sortByPrice = () => {
    inventoryData.value = _.orderBy(inventoryData.value, ['price'], ['asc']);
}
const sortByInventory = () => {
    inventoryData.value = _.orderBy(inventoryData.value, ['available_inventory'], ['asc']);
}


//filter functions
const filterByCategory = (category) => {
    inventoryData.value = _.filter(productInventoryData, (product) => product.category === category);
}

const filterByStatus = (status) => {
    inventoryData.value = _.filter(productInventoryData, (product) => inventoryStatus(product) === status);
}

const reset = () => {
    searchTerm.value = "";
    inventoryData.value = [...productInventoryData];
}

//search function to filter
const searchTerm = ref("");
const search = (searchTerm) => {
    //searching from both product and category
    inventoryData.value = _.filter(productInventoryData, (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));
}

//updating inventory in this list as well as in the original list
const updateInventory = () => {
    const quantityToAdd = Number(updateQuantity.value);
    if (isNaN(quantityToAdd)) {
        alert("Please enter a valid number for the quantity.");
        return;
    }

    const product = _.find(productInventoryData, (product) => product.id === selectedProduct.value.id); // Find the product in the original list
    product.available_inventory += quantityToAdd;

    closeModal();
    updateQuantity.value = 0;
};

// update inventory modal
const modalVisible = ref(false);
const selectedProduct = ref(null);
const updateQuantity = ref(0);

const openModal = (product) => {
    selectedProduct.value = product;
    modalVisible.value = true;
};

const closeModal = () => {
    modalVisible.value = false;
};
</script>

<template>
    <div class="mt-5">
        <div class="text-(--black)">
            <p class="ml-7 font-bold text-2xl">Inventory Management</p>
            <p class="w-1/5 ml-10 mt-5 border-(--pink) border-0 border-b-2">All Products</p>
        </div>
        <div class="flex flex-row justify-between gap-2 mr-10 ml-10 mt-2">
            <!-- search bar -->
            <label for="search"
                class="input btn shadow-sm shadow-gray m-0 pl-2 pr-1 rounded-md pt-0 pb-0 mt-0 mb-0 bg-(--background-color) text-(--black) border-(--black)">
                <input v-model="searchTerm" type="search" class="grow" placeholder="Search"
                    @keydown.enter="search(searchTerm)" />
                <button class="btn btn-sm btn-circle border-none bg-(--background-color) p-3 shadow-none"
                    @click="search(searchTerm)">
                    <font-awesome-icon icon="fa-magnifying-glass" class="text-(--black) p-0 m-0" />
                </button>
            </label>
            <!-- options for filterig -->
            <div class="flex flex-row justify-end gap-2 ">
                <button class="btn btn-sm m-0 p-2 rounded-md pt-0 pb-0 mt-0 mb-0 bg-(--background-color)"
                    @click="reset">
                    <span class="text-(--black)">
                        Reset
                    </span>
                </button>
                <details class="dropdown">
                    <summary class="btn btn-sm m-0 p-2 rounded-md pt-0 pb-0 mt-0 mb-0 bg-(--background-color)">
                        <span class="text-(--black)">
                            Category
                        </span>
                        <font-awesome-icon icon="fa-angle-down" class="text-(--black) p-0 m-0" />
                    </summary>
                    <ul
                        class="menu dropdown-content text-(--black) bg-(--background-color) rounded-box z-1 w-52 p-2 shadow-sm">
                        <li @click="filterByCategory('Cosmetics')"><a>Cosmetics</a></li>
                        <li @click="filterByCategory('Health')"><a>Health</a></li>
                        <li @click="filterByCategory('Food & Drink')"><a>Food & Drink</a></li>
                    </ul>
                </details>
                <details class="dropdown">
                    <summary class="btn btn-sm m-0 p-2 rounded-md pt-0 pb-0 mt-0 mb-0 bg-(--background-color)">
                        <span class="text-(--black)">
                            Stock Level
                        </span>
                        <font-awesome-icon icon="fa-angle-down" class="text-(--black) p-0 m-0" />
                    </summary>
                    <ul
                        class="menu dropdown-content text-(--black) bg-(--background-color) rounded-box z-1 w-52 p-2 shadow-sm">
                        <li @click="filterByStatus('In Stock')"><a>In Stock</a></li>
                        <li @click="filterByStatus('Low Stock')"><a>Low Stock</a></li>
                        <li @click="filterByStatus('Out of Stock')"><a>Out of Stock</a></li>
                    </ul>
                </details>
            </div>
        </div>

        <!-- inventory table -->
        <div class="mt-5 mr-10 ml-10 overflow-x-auto rounded-box border text-(--black) font-normal border-gray-200 ">
            <table class="table">
                <thead class="bg-gray-300 text-black text-md ">
                    <tr class="">
                        <th class="pl-5">
                            <span>ID</span>
                            <button class="btn btn-circle border-none bg-(--gray) shadow-none" @click="sortById">
                                <font-awesome-icon icon="fa-solid fa-sort" class="text-(--black) p-0 m-0" />
                            </button>
                        </th>
                        <th class="">
                            <span>Name</span>
                            <button class="btn btn-circle border-none bg-(--gray) shadow-none" @click="sortByName">
                                <font-awesome-icon icon="fa-solid fa-sort" class="text-(--black) p-0 m-0" />
                            </button>
                        </th>
                        <th class=""><span>Category</span>
                            <button class="btn btn-circle border-none bg-(--gray) shadow-none" @click="sortByCategory">
                                <font-awesome-icon icon="fa-solid fa-sort" class="text-(--black) p-0 m-0" />
                            </button>
                        </th>
                        <th class=""><span>Unit Price</span>
                            <button class="btn btn-circle border-none bg-(--gray) shadow-none" @click="sortByPrice">
                                <font-awesome-icon icon="fa-solid fa-sort" class="text-(--black) p-0 m-0" />
                            </button>
                        </th>
                        <th class=""><span>Quantity</span>
                            <button class="btn btn-circle border-none bg-(--gray) shadow-none" @click="sortByInventory">
                                <font-awesome-icon icon="fa-solid fa-sort" class="text-(--black) p-0 m-0" />
                            </button>
                        </th>
                        <th class=""><span>Stock Level</span>
                            <!-- <button class="btn btn-circle border-none bg-(--gray) shadow-none" @click="sortByInventory">
                                <font-awesome-icon icon="fa-solid fa-sort" class="text-(--black) p-0 m-0" />
                            </button> -->
                        </th>
                    </tr>
                </thead>
                <tbody v-for="product in inventoryData">
                    <tr class="border-b-[0.5px] border-b-(--grey) border-0 font-light hover:scale-102 hover:shadow-lg hover:bg-gray-100 transition-transform duration-200 "
                        @click="openModal(product)">
                        <th class="font-light pl-5">{{ product.id }}</th>
                        <th class="font-light">{{ product.name }}</th>
                        <th class="font-light"><span class="mt-2 mb-2 bg-(--pink) pt-1 pb-1 pl-2 pr-2 rounded-xl">{{
                            product.category }}</span></th>
                        <th class="font-light">{{ product.price }}</th>
                        <th class="font-light">{{ product.available_inventory }}</th>
                        <th><span :class="stockLevelClass(product)" class="mt-2 mb-2  pt-1 pb-1 pl-4 pr-4 rounded-xl">{{
                            inventoryStatus(product) }}</span>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- update inventory modal -->
    <div v-if="modalVisible" class="fixed inset-0 bg-none flex justify-center items-center z-50 text-black">
        <div class="bg-linear-to-r from-(--purple) to-(--pink) p-6 z-2 rounded-2xl shadow-md w-96">
            <h2 class="text-xl font-bold mb-4">Update Inventory</h2>
            <div>
                <!-- only updating inventory, displaying product, unit price and category wihtouy changing -->
                <p class="">Product: {{ selectedProduct.name }}</p>
                <p class="">Unit Price: {{ selectedProduct.price }}</p>
                <p class="">Category: {{ selectedProduct.category }}</p>
                <label class="flex flex-col items-center">
                    <p class="mt-5">Quantity to Add:</p>
                    <input v-model="updateQuantity" type=""
                        class="input btn w-1/4 shadow-sm shadow-gray m-0 pl-2 pr-1 rounded-md pt-0 pb-0 mt-0 mb-0 bg-(--background-color) text-(--black) border-(--black)" />
                </label>
                <div class="flex justify-end mt-4">
                    <button @click="updateInventory"
                        class="btn btn-sm bg-(--background-color) text-(--black)">Update</button>
                </div>

            </div>
            <div class="flex justify-end mt-4">
                <button @click="closeModal" class="btn btn-sm bg-(--pink) text-(--black)">Close</button>
            </div>
        </div>
    </div>
    <!-- alert message for low stock -->
    <div role="alert" class="alert alert-error flex flex-col items-center justify-center
    p-6 z-50 rounded-2xl shadow-md w-96   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    fixed inset-0 text-black h-1/2"
        v-if="lowStockProducts.length > 0 && alertModalVisible">
        <h2 class="font-bold text-2xl text-(--black)">Low Stock/Out of Stock Alert</h2>
        <p>The following products are running low or are out of stock:</p>
        <ul>
            <li v-for="product in lowStockProducts" :key="product.id">{{ product.name }}</li>
        </ul>
        <div class="flex justify-end mt-4">
            <button @click="closeAlertModal" class="btn btn-sm bg-(--pink) text-(--black)">Close</button>
        </div>
    </div>

</template>

<style scoped>
th {
    /* display: flex; */
    align-items: start;
    justify-content: start;
}
</style>