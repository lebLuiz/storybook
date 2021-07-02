<template>
    <button class="btn" :class="handleTypesBtn" :disabled="disabled">
        {{ text }}
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
        type: {
            type: String,
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        handleTypesBtn() {
            return {
                //Types:
                '--default': this.type === 'default' ? true : false,
                '--primary': this.type === 'primary' ? true : false,
                '--success': this.type === 'success' ? true : false,
                '--info': this.type === 'info' ? true : false,
                '--warning': this.type === 'warning' ? true : false,
                '--danger': this.type === 'danger' ? true : false,

                //Disabled:
                '--disabled': this.disabled,
            };
        }
    },
}

</script>

<style lang="scss" scoped>

@font-face {
  font-family: "Montserrat", sans-serif;
  src: url(../../assets/fonts/Montserrat-Regular.ttf);
}

$maxWidthMobile: 425px;
$colorWhite: #FFFFFF;

.btn {
    background: $colorWhite;
    color: #000000;
    
    box-shadow: 0px 1px 24px rgba(35, 34, 39, 0.1);
    border-radius: 40px;
    border: none;
    outline: none;
    cursor: pointer;

    width: 100%;
    max-width: 330px;
    height: 45px;

    // Text:
    font-family: "Montserrat", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;

    line-height: 17px;
    text-align: center;

    @import "~@/components/button/styles/styles-btn.scss";

}

</style>