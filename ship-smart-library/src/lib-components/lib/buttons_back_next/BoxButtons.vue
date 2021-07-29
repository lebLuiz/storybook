<template>
    <div class="principal-box-progress">
        <button v-if="step > 1"
            class="btn-step" :class="[ { '--disabled': backDisabled } , handleTypesBtn]" :title="backTitle"
            :disabled="step <= 1 || backDisabled" @click="backOne">
            {{ textBtnBack }}
        </button>

        <button class="btn-step" :class="[ { '--disabled': advancedDisabled } , handleTypesBtn]" :title="advancedTitle"
            :disabled="advancedDisabled" @click="advanceOne">
            {{ textBtnAdvance }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'BoxButtons',

    props: {
        step: {
            type: Number,
            required: true,
        },

        max: {
            type: Number,
            default: Infinity,
        },

        textBtnBack: {
            type: String,
            required: true,
        },
        textBtnAdvance: {
            type: String,
            required: true,
        },

        backTitle: {
            type: String,
            required: false,
        },
        advancedTitle: {
            type: String,
            required: false,
        },
        typeColor: {
            type: String,
            default: 'primary'
        },

        backDisabled: { type: Boolean },
        advancedDisabled: { type: Boolean },
    },

    computed: {
        handleTypesBtn() {
            return {
                //Types:
                '--primary': this.typeColor === 'primary' ? true : false,
                '--secondary': this.typeColor === 'secondary' ? true : false,
            };
        }
    },

    methods: {
        backOne() {
            this.$emit('stepValue', 'back');
        },
        advanceOne() {
            this.$emit('stepValue', 'advance');
        },
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

$maxWidthMobile: 250px;
$colorWhite: #FFFFFF;

.principal-box-progress {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    column-gap: 10px;

    .btn-step {
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
}

@media only screen and (max-width: 550px) {
    .principal-box-progress {
        .btn-step {
            font-size: 18px;
        }
    }
}
</style>