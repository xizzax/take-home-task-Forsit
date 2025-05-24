<script setup>
const props = defineProps(
    {
        btnTitle: String,
        iconTitle: String,
        onPressFtn: Function,
        selected: Boolean,
    }  
)

function handleClick() { props.onPressFtn?.() }
</script>

<template>
    <div id="container" @click="handleClick" :class="{ selected: props.selected }">
        <font-awesome-icon :icon=iconTitle />
        {{ btnTitle }} 
    </div>
</template>

<style>
#container {
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px;
    color: var(--grey);
    cursor: pointer;
}

.selected {
    background: linear-gradient(135deg, var(--purple), var(--pink));
    color: black !important;
}
</style>