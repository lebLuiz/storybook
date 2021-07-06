<template>
    <h2>{{ text }}</h2>
</template>

<script>

export default {
    name: 'H2',

    props: {
        text: {
            type: String,
            required: true,
        },
    }
}

</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'Montserrat';
    src: url(../../assets/fonts/Montserrat-Regular.ttf);
}

h2 {
    font-family: 'Montserrat';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
    color: #757575;
}
</style>