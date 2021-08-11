import InputFileField from "../../../components/input_file_field/InputFileField.vue";

export default {
    title: "InputFileField",
    component: InputFileField,
    argTypes: {
        textInput: {
            control: {
                type: "text",
            },
        },
    },
};
  
const Template = (args, { argTypes }) => ({
    components: { InputFileField },
    props: Object.keys(argTypes),
    template: `<InputFileField v-bind="$props" @onResFile="onResFile" />`,
});

export const Default = Template.bind({});
Default.args = {
    textInput: "Choose file to upload",
};