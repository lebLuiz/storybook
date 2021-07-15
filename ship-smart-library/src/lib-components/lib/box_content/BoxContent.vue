<template>
    <div class="box-content">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'BoxContent',
}

</script>

<style lang="scss">
.box-content {
    width: 100%;
    max-width: 470px;
    border-radius: 40px;
    box-shadow: 0px 1px 24px rgba(35, 34, 39, 0.1);
    padding: 40px 100px;
    background-color: #FFFFFF;
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