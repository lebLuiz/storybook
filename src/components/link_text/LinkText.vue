<template>
    <a class="link" :style="{ 'fontSize': `${size}px` }"
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
            default: 12
        },
    },
}

</script>

<style lang="scss">

@font-face {
  font-family: 'Montserrat';
  src: url(../../assets/fonts/Montserrat-Regular.ttf);
}

.link {
    color: #757575;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
}
</style>