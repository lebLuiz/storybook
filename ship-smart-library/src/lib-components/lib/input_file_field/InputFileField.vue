<template>
    <div class="button-wrapper-input-file">
        <span class="label-input-file" v-text="textInput" />
        <input @change="uploadAction" type="file" name="upload" id="upload" accept=".csv" >
    </div>
</template>

<script>
export default {
    name: 'InputFileField',

    props: {
        textInput: {
            type: String,
            required: true,
        },
    },

    methods: {
        uploadAction($event) {
            if ($event.target.files && $event.target.files[0]) {

                $event.target.previousElementSibling.innerHTML = `${$event.target.files[0].name}`;

                this.$emit('resFile', $event.target.files[0]);
            }
        },
    },

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.button-wrapper-input-file {
    position: relative;
    min-width: 150px;
    max-width: 425px;
    text-align: center;
    
    &:hover {
        background: #fbbe2fe1;
        transition: 0.5s ease;
    }

    span.label-input-file {
        position: relative;
        z-index: 0;
        display: inline-block;
        width: 100%;
        background: #fbbe2f8c;
        cursor: pointer;
        color: #000000;
        padding: 10px 0;
        text-transform: uppercase;
        font-size: 14px;
        font-family: 'Montserrat';
    }

    #upload {
        display: inline-block;
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }
}
</style>