<template>
    <div class="box-content" :class="{ '--no-maximum-size': noMaximumSize }">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'BoxContent',

    props: {
        noMaximumSize: { type: Boolean },
    },
}

</script>

<style lang="scss" scoped>
.box-content {
    width: auto;
    max-width: 470px;
    padding: 25px 50px;
    margin: 20px 0px;

    box-sizing: border-box;
    box-shadow: 0px 1px 24px rgba(35, 34, 39, 0.1);
    border-radius: 40px;
    background-color: #FFFFFF;

    &.--no-maximum-size {
        max-width: none;
    }
}

@media only screen and (max-width: 550px) {
    .box-content {
        max-width: 100%;
        border-radius: 0px;
        box-shadow: none;
        padding: 0px;
        background-color: transparent
    }
}
</style>