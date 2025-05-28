<!-- our main page -->
<!-- side bar and header -->
<script setup>
import SideBar from './components/SideBar/SideBar.vue'
import InventoryManagementScreen from './screens/InventoryManagementScreen.vue'
import RevenueScreen from './screens/RevenueScreen.vue';
import { ref, computed} from 'vue';
const selectedPage = ref('revenue'); // default main


const pageMap = {
  revenue: RevenueScreen,
  inventory: InventoryManagementScreen
};

const selectedPageComponent = computed(() => pageMap[selectedPage.value]);
</script>

<template>
  <div id="main">
    <div id="sidebar">
      <SideBar @navigate="selectedPage = $event" />
    </div>
    <div id="main-page">
      <component :is="selectedPageComponent" />
    </div>
  </div>
</template>

<style src="./AppStyles.css"></style>
<style scoped></style>

<!-- global style -->
<style src="../global.css"></style>

