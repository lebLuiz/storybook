<template>
    <h2 @click="$emit('onClick')">{{ text }}</h2>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

h2 {
    font-family: 'Montserrat';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 19.5px;
    color: #757575;
}
</style>