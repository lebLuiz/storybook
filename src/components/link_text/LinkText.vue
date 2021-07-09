<template>
    <a :style="{ 'fontSize': `${size}px`, 'fontWeight': weight ? weight : '' }"
        :href="href">{{ title }}</a>
</template>

<script>

export default {
    name: 'LinkText',

    props: {
        title: {
            type: String,
            required: true,
        },
        href: {
            type: String,
            required: false,
        },

        // Styles:
        size: {
            type: Number,
            required: false,
        },
        weight: {
            type: Number,
            required: false,
        },
    },
}

</script>

<style lang="scss">

@font-face {
  font-family: 'Montserrat';
  src: url(../../assets/fonts/Montserrat-Regular.ttf);
}

a {
    color: #757575;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
}

@media only screen and (max-width: 550px) {
    a {
        font-size: 12px;
    }
}
</style>