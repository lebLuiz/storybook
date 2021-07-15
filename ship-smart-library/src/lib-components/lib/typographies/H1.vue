<template>
    <h1 @click="$emit('onClick')">{{ text }}</h1>
</template>

<script>

export default {
    name: 'H1',

    props: {
        text: {
            type: String,
            required: true,
        },
    },
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

h1 {
    font-family: 'Montserrat';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    color: #000000;
}
</style>