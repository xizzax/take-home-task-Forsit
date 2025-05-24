<!-- our main page -->
<!-- side bar and header -->
<script setup>
import SideBar from './components/SideBar/SideBar.vue'
import InventoryManagementScreen from './screens/InventoryManagementScreen.vue'
</script>

<template>
  <div id="main">
    <div id="sidebar">
      <SideBar />
    </div>
    <div id="main-page">
      <InventoryManagementScreen />
    </div>
  </div>
</template>

<style src="./AppStyles.css"></style>
<style scoped></style>

<!-- global style -->
<style src="../global.css"></style>
