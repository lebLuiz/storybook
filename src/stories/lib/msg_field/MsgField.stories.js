import MsgField from "../../../components/text_form_field/partials/MsgField.vue";

export default {
    title: "MsgField",
    component: MsgField,
    argTypes: {
        error: { 
            control: {
                type: "boolean",
            },
        },
        errorMessage: { 
            control: {
                type: "text",
            },
        },
        message: { 
            control: {
                type: "text",
            },
        },
    },
};
  
const Template = (args, { argTypes, events }) => ({
    components: { MsgField },
    props: Object.keys(argTypes),
    template: `<MsgField v-bind="$props" />`,
});

export const DefaultMessage = Template.bind({});
DefaultMessage.args = {
    message: "A notification message",
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
    error: true,
    errorMessage: "An error notification message",
};