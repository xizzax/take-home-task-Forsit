<script setup>
import { productCategories, productInventoryData } from '../data/DummyData.js';

</script>

<template>
    <div>
        <!-- search bar -->

        <!-- options for filtering -->

        <!-- inventory table -->
        <div class="w-5/6 overflow-x-auto rounded-box border text-black border-gray-200 ">
            <table class="table">
                <thead class="bg-gray-300 text-black ">
                    <tr class="">
                        <th class="">Product ID</th>
                        <th class="">Product Name</th>
                        <th class="">Category</th>
                        <th class="">Unit Price</th>
                        <th class="">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
</style>