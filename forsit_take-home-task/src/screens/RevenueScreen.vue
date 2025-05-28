<script setup>
import { ref, computed } from 'vue';
import { orderData, productInventoryData } from '../data/DummyData.js';
import _ from 'lodash';
import VueApexCharts from 'vue3-apexcharts';

const orders = ref([...orderData]);

// map product id to product to make it easeir to access
const productMap = {};
productInventoryData.forEach(product => {
    productMap[product.id] = product;
});


//REVENUE------------------------------------------

//-------------------------------
//DAILY CALCULATION
//-------------------------------
const dailyRevenueMap = {};
const selectedCategory = ref('All');
const categoryList = ['All', ...new Set(productInventoryData.map(p => p.category))];

function calculateRevenueSeries(data, categoryFilter = 'All') {
    const dailyMap = {};
    const sortedDates = [...new Set(data.map(o => o.date))].sort();
    const daily = [];
    const cumulative = [];

    let cumSum = 0;

    sortedDates.forEach(date => {
        let dayTotal = 0;

        data
            .filter(o => o.date === date)
            .forEach(order => {
                order.details.forEach(item => {
                    const product = productMap[item.product_id];
                    if (product && (categoryFilter === 'All' || product.category === categoryFilter)) {
                        dayTotal += (product.sale_price - product.cost) * item.quantity;
                    }
                });
            });

        daily.push({ x: date, y: dayTotal });
        cumSum += dayTotal;
        cumulative.push({ x: date, y: cumSum });
    });

    return { daily, cumulative };
}


orderData.forEach(order => {
    let dailyRevenue = 0;
    order.details.forEach(item => {
        const product = productMap[item.product_id];
        if (product) {
            const revenue = (product.sale_price - product.cost) * item.quantity;
            dailyRevenue += revenue;
        }
    });
    dailyRevenueMap[order.date] = (dailyRevenueMap[order.date] || 0) + dailyRevenue;
});

const sortedDates = Object.keys(dailyRevenueMap).sort();
const dailyRevenueSeries = [];
const cumulativeRevenueSeries = [];

let cumulative = 0;
sortedDates.forEach(date => {
    const revenue = dailyRevenueMap[date];
    cumulative += revenue;

    dailyRevenueSeries.push({ x: date, y: revenue });
    cumulativeRevenueSeries.push({ x: date, y: cumulative });
});

//---------------
//MONTHLY
//---------------
function getMonthlyRevenueSeries(orderData, productMap) {
    const monthlyRevenueMap = {};

    //monthly revenue
    orderData.forEach(order => {
        const month = order.date.slice(0, 7); // Get "YYYY-MM"

        let orderRevenue = 0;
        order.details.forEach(item => {
            const product = productMap[item.product_id];
            if (product) {
                const revenue = (product.sale_price - product.cost) * item.quantity;
                orderRevenue += revenue;
            }
        });

        monthlyRevenueMap[month] = (monthlyRevenueMap[month] || 0) + orderRevenue;
    });

    // cumulative revenue
    const sortedMonths = Object.keys(monthlyRevenueMap).sort();
    const monthlyRevenueSeries = [];
    const monthlyCumulativeRevenueSeries = [];

    let cumulative = 0;
    sortedMonths.forEach(month => {
        const revenue = monthlyRevenueMap[month];
        cumulative += revenue;

        monthlyRevenueSeries.push({ x: month, y: revenue });
        monthlyCumulativeRevenueSeries.push({ x: month, y: cumulative });
    });

    return {
        monthlyRevenueSeries,
        monthlyCumulativeRevenueSeries
    };
}

//---------------
//chart
//---------------
const selectedView = ref('daily'); // daily, monthly

const getChartSeries = () => {
    const cat = selectedCategory.value;
    if (selectedView.value === 'monthly') {
        const { monthlyRevenueSeries, monthlyCumulativeRevenueSeries } = getMonthlyRevenueSeries(orderData, productMap, cat);
        return [
            { name: 'Monthly Revenue', type: 'line', data: monthlyRevenueSeries },
            { name: 'Cumulative Revenue', type: 'area', data: monthlyCumulativeRevenueSeries }
        ];
    } else {
        const { daily, cumulative } = calculateRevenueSeries(orderData, cat);
        return [
            { name: 'Daily Revenue', type: 'line', data: daily },
            { name: 'Cumulative Revenue', type: 'area', data: cumulative }
        ];
    }
};

const series = computed(() => getChartSeries());


const lineChartOptions = {
    chart: {
        type: 'line', // Base type
        height: 350,
        zoom: { enabled: false },
        toolbar: { show: false }
    },
    stroke: {
        curve: 'smooth',
        width: [3, 2], // Thicker for line, thinner for area
    },
    fill: {
        type: ['solid', 'gradient'], // Fill style for area chart
        gradient: {
            shadeIntensity: 0.5,
            opacityFrom: 0.1,
            opacityTo: 0.5,
            stops: [0, 90, 100]
        }
    },
    markers: {
        size: 4
    },
    // title: {
    //     text: 'Revenue Trends',
    //     align: 'left'
    // },
    xaxis: {
        type: 'category',
        title: { text: 'Date' }
    },
    yaxis: {
        title: { text: 'Revenue ($)' }
    },
    legend: {
        position: 'top'
    },
    tooltip: {
        shared: true,
        intersect: false
    },
    colors: ["#FECDF2", "#CBB9EF"]
};


//ORDERS VS SALES------------------------------------------
const dailyOrderSalesMap = {};

// Process daily orders and sales
orderData.forEach(order => {
    const date = order.date;
    let totalSales = 0;
    const uniqueOrderIds = new Set();

    order.details.forEach(item => {
        uniqueOrderIds.add(item.order_id);

        const product = productMap[item.product_id];
        if (product) {
            totalSales += product.sale_price * item.quantity;
        }
    });

    if (!dailyOrderSalesMap[date]) {
        dailyOrderSalesMap[date] = { orders: 0, sales: 0 };
    }

    dailyOrderSalesMap[date].orders += uniqueOrderIds.size;
    dailyOrderSalesMap[date].sales += totalSales;
});

const sortedOrderDates = Object.keys(dailyOrderSalesMap).sort();

const ordersSeries = sortedOrderDates.map(date => dailyOrderSalesMap[date].orders);
const salesSeries = sortedOrderDates.map(date => dailyOrderSalesMap[date].sales);


const orderVsSalesSeries = [
    {
        name: 'Orders',
        data: ordersSeries,
    },
    {
        name: 'Sales',
        data: salesSeries,
    }
];

const orderVsSalesOptions = {
    chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: { show: false }
    },
    title: {
        text: 'Orders vs Sales Per Day',
        align: 'left'
    },
    xaxis: {
        categories: sortedOrderDates,
        title: { text: 'Date' },
    },
    yaxis: [
        {
            title: { text: 'Number of Orders' },
            labels: { formatter: val => parseInt(val) }
        },
        {
            opposite: true,
            title: { text: 'Sales ($)' },
            labels: { formatter: val => `$${val}` }
        }
    ],
    colors: ['#94B3FD', '#FECDF2'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '45%',
        }
    },
    dataLabels: { enabled: false },
    tooltip: {
        shared: true,
        intersect: false
    },
    legend: {
        position: 'top'
    }
};

//PIEcHART---------------
const categoryInventory = {};
productInventoryData.forEach(p => {
    categoryInventory[p.category] = (categoryInventory[p.category] || 0) + p.available_inventory;
});

const categoryNames = Object.keys(categoryInventory);
const categoryValues = Object.values(categoryInventory);

const inventoryPieSeries = categoryValues;

const inventoryPieOptions = {
    chart: {
        type: 'donut',
        height: 350
    },
    labels: categoryNames,
    title: {
        text: 'Inventory Distribution by Category',
        align: 'left'
    },
    colors: ['#FECDF2', '#CBB9EF', '#94B3FD'],
    tooltip: {
        y: { formatter: val => `${val} units` }
    },
    legend: {
        position: 'bottom'
    }
};




</script>

<script>
export default {
    components: {
        apexchart: VueApexCharts,
    },
};
</script>

<template>
    <div class="ml-5 mt-5 mr-2">
        <div class="m-2 flex justify-between items-center">
            <h1 class=" text-black font-bold text-2xl">Revenue Trends</h1>
        </div>
        <!-- total revenue -->
        <div class="m-2 flex flex-row gap-5 items-center">
            <div class="w-2/3 bg-white rounded-lg p-5 text-black justify-center align-items-end just">
                <details class="dropdown">
                    <summary class="btn btn-sm m-0 p-2 rounded-md pt-0 pb-0 mt-0 mb-0 bg-(--background-color)">
                        <span class="text-(--black)">
                            {{ selectedView === 'daily' ? 'Daily' : 'Monthly' }}
                        </span>
                        <font-awesome-icon icon="fa-angle-down" class="text-(--black) p-0 m-0" />
                    </summary>
                    <ul
                        class="menu dropdown-content text-(--black) bg-(--background-color) rounded-box z-1 w-52 p-2 shadow-sm">
                        <li @click="selectedView = 'daily'"><a>Daily</a></li>
                        <li @click="selectedView = 'monthly'"><a>Monthly</a></li>
                    </ul>
                </details>
                <details class="dropdown ml-2">
                    <summary
                        class="btn btn-sm m-0 p-2 rounded-md pt-0 pb-0 mt-0 mb-0 bg-(--background-color) text-(--black)">
                        Category: {{ selectedCategory }}</summary>
                    <ul
                        class="menu dropdown-content text-(--black) bg-(--background-color) rounded-box z-1 w-52 p-2 shadow-sm">
                        <li v-for="category in categoryList" :key="category" @click="selectedCategory = category">
                            <a>{{ category }}</a>
                        </li>
                    </ul>
                </details>
                <apexchart width="100%" type="line" :options="lineChartOptions" :series="series"></apexchart>
            </div>
            <!-- orders vs sales -->
            <div class="w-1/3 bg-white rounded-lg p-5">
                <apexchart type="donut" :options="inventoryPieOptions" :series="inventoryPieSeries" />
            </div>

        </div>
        <div class="w-full bg-white rounded-lg p-5">
            <apexchart type="bar" :options="orderVsSalesOptions" :series="orderVsSalesSeries" />
        </div>
    </div>
</template>

<style scoped></style>