<script setup>
import SideBarButton from './SideBarButton.vue'
import { ref } from 'vue'
const emit = defineEmits(['navigate']);


const selected = ref("revenue")
const revenueSelected = ref(true)
const inventorySelected = ref(false)
const productsSelected = ref(false)

function onPressRevenue() {
  selected.value = "revenue"
  revenueSelected.value = true
  inventorySelected.value = false
  productsSelected.value = false
  emit('navigate', 'revenue');
}

function onPressInventory() {
  selected.value = "inventory"
  revenueSelected.value = false
  inventorySelected.value = true
  productsSelected.value = false
  emit('navigate', 'inventory');
}

// function onPressProducts() {
//   selected.value = "products"
//   revenueSelected.value = false
//   inventorySelected.value = false
//   productsSelected.value = true
// }

console.log(selected);
</script>

<template>
  <div id="sidebar-container">
    <div id="title">
      <img src="../../assets/photo.png" width="70px" height="70px" />
      <span> Izza Naeem</span>
    </div>
    <div id="pages-title">
      PAGES
    </div>
    <SideBarButton btnTitle="Revenue" iconTitle="fa-chart-simple" :onPressFtn="onPressRevenue"
      :selected="revenueSelected" />
    <SideBarButton btnTitle="Inventory" iconTitle="fa-boxes-stacked" :onPressFtn="onPressInventory"
      :selected="inventorySelected" />
    <!-- <SideBarButton btnTitle="Products" iconTitle="fa-box" :onPressFtn="onPressProducts" :selected="productsSelected" /> -->
  </div>
</template>

<style scoped>
#sidebar-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
}

#title {
  color: var(--black);
  font-weight: bold;
  font-size: larger;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: start  ;
}

#pages-title {
  color: var(--grey);
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>