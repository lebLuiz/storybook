<template>
    <button :class="[ { 'btn': !rounded, 'btn-rounded': rounded }, handleTypesBtn]"
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
        clickMethod: {
            type: Function,
            required: false,
        },

        //Button Rounded:
        rounded: {
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

@font-face {
  font-family: "Montserrat";
  src: url(../../assets/fonts/Montserrat-Regular.ttf);
}

$maxWidthMobile: 425px;
$colorWhite: #FFFFFF;

.btn {
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

    // display: flex;
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

.btn-rounded {
    background: #FBBE2F;
    color: $colorWhite;
    
    box-shadow: 0px 1px 24px rgba(35, 34, 39, 0.1);
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;

    width: 100%;
    max-width: 70px;

    height: 100%;
    max-height: 70px;

    // display: flex;
    justify-content: center;
    align-items: center;

    // Text:
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;

    line-height: 44px;
    text-align: center;

    @import "~@/components/button/styles/styles-btn.scss";
}

@media only screen and (max-width: 550px) {
    .btn-rounded {
        max-width: 24px;
        max-height: 24px;
    }
}

</style>