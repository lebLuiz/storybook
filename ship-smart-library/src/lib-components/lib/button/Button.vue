<template>
    <button :class="[{ '--rounded-ball': roundedBall }, handleTypesBtn]"
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
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: bold;
    font-size: 14px;

    line-height: 17px;
    text-align: center;

    &.--rounded-ball {
        border-radius: 50%;
        height: 100%;
        max-width: 70px;
        max-height: 70px;
        min-height: 20px;

        font-weight: 400;
        line-height: 44px;
    }

    &.--disabled {
        cursor: not-allowed;
        background: #FBBE2F;
        color: $colorWhite;
        border: 0.1px solid rgba(56, 56, 56, 0.11);
    }

    // Types_Styles:
    &.--primary {
        background: #FBBE2F;
        color: $colorWhite;
        &.--disabled {
            cursor: not-allowed;
            background: #fbbe2fa6;
            color: #00000040;
            border: 0.1px solid rgba(56, 56, 56, 0.11);
        }
    }

    &.--secondary {
        background: $colorWhite;
        color: #000000;
        &.--disabled {
            cursor: not-allowed;
            background: #e5e5e5a8;
            color: #00000063;
            border: 0.1px solid rgba(56, 56, 56, 0.11);
        }
    }

}

@media only screen and (max-width: 550px) {
    button {
        &.--rounded-ball {
            max-width: 24px;
            max-height: 24px;
        }
    }
}

</style>