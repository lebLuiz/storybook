<template>
    <div class="principal-box-progress">
        <Button v-if="step !== 1" text="Voltar" class="btn-step" :disabled="step <= 1 || backDisabled"
            typeColor="primary" :title="backTitle"
            @onClick="backOne" />

        <Button :text="step === max ? 'Finalizar' : 'Próximo'" class="btn-step" :disabled="advancedDisabled"
            typeColor="primary" :title="advancedTitle"
            @onClick="advanceOne" />
    </div>
</template>

<script>
import Button from '@/components/button/Button'

export default {
    name: 'BoxButtons',
    components: {
        Button,
    },

    data(){
        return {
            stepMoment: 1,
        }
    },

    props: {
        step: {
            type: Number,
            required: true,
        },

        max: {
            type: Number,
            default: Infinity,
        },

        backTitle: {
            type: String,
            required: false,
        },
        advancedTitle: {
            type: String,
            required: false,
        },

        backDisabled: { type: Boolean },
        advancedDisabled: { type: Boolean },
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

.principal-box-progress {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    column-gap: 10px;

    .btn-step {
        font-size: 18px;
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