<template>
    <button :class="[{ '--rounded-ball': roundedBall }, handleTypesBtn]" :title="title"
        :disabled="disabled || loading" @click="$emit('onClick')">
        {{ loading ? 'Loading...' : text }}
    </button>
</template>

<script>

export default {
    name: 'Button',

    props: {
        text: {
            type: String,
            required: true,
        },
        typeColor: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: false,
        },

        //Button roundedBall:
        roundedBall: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        handleTypesBtn() {
            return {
                //Types:
                '--primary': this.typeColor === 'primary' ? true : false,
                '--secondary': this.typeColor === 'secondary' ? true : false,

                //Disabled:
                '--disabled': this.disabled || this.loading,
            };
        }
    },
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$maxWidthMobile: 425px;
$colorWhite: #FFFFFF;

button {
    background: #FBBE2F;
    color: $colorWhite;
    
    box-shadow: 0px 1px 24px rgba(35, 34, 39, 0.1);
    border-radius: 40px;
    border: none;
    outline: none;
    cursor: pointer;

    width: 100%;
    max-width: $maxWidthMobile;
    min-height: 44px;

    justify-content: center;
    align-items: center;

    // Text:
    font-family: "Montserrat";
    font-style: normal;
    font-weight: bold;
    font-size: 14px;

    line-height: 17px;
    text-align: center;

    @import "~@/components/button/styles/styles-btn.scss";

}

@media only screen and (max-width: 550px) {
    button {
        &.--rounded-ball {
            width: 24px;
            height: 24px;
            min-height: 0px;
            line-height: normal;
        }
    }
}

</style>