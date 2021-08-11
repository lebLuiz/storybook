<template>
    <div>
        <span style="padding: 30px">
            Tela de Home
        </span>

        <InputFileField textInput="Insira um arquivo" @resFile="getFile" />
        <br><br>
        <InputFileField textInput="Upload file" @resFile="getFile" />
    </div>
</template>

<script>
import InputFileField from "@/components/input_file_field/InputFileField";

export default {
    name: 'Home',

    components: {
        InputFileField,
    },

    methods: {
        getFile(file) {
            console.log(file);
        },
    },
}
</script>

<style>

</style>