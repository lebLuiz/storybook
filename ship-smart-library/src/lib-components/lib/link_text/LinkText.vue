<template>
    <div>
        <a v-if="href && title" :style="{ 'fontSize': `${size}px`, 'fontWeight': weight ? weight : '', 'cursor': 'pointer' }"
            @click="redirect">{{ title }}</a>

        <!-- IF YOU WANT TO DEAL WITH ELEMENTS AND A SPECIFIC ROUTE TREATMENT (ex: VueRouter) -->
        <slot v-if="!href" name="link-redirect" >

        </slot>
    </div>
    
</template>

<script>

export default {
    name: 'LinkText',

    props: {
        title: {
            type: String,
            required: false,
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

    methods: {
        redirect() {
            // Is path:
            if (this.href[0] === '/') {
                window.location.pathname = this.href;
            }
            // Is URL Ancora:
            else {
                window.location.href = this.href;
            }
        },
    },
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

a {
    color: #757575;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    cursor: pointer;
}

@media only screen and (max-width: 550px) {
    a {
        font-size: 12px;
    }
}
</style>