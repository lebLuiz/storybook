import LabelField from "../../../components/text_form_field/partials/LabelField.vue";

export default {
    title: "LabelField",
    component: LabelField,
    argTypes: {
        labelField: { 
            control: {
                type: "text",
            },
        },
    },
};
  
const Template = (args, { argTypes, events }) => ({
    components: { LabelField },
    props: Object.keys(argTypes),
    template: `<LabelField v-bind="$props" />`,
});

export const Default = Template.bind({});
Default.args = {
    labelField: "Title of label",
};