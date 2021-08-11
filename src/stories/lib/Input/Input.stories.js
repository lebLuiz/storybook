import InputField from "../../../components/text_form_field/partials/InputField.vue";

export default {
    title: "InputField",
    component: InputField,
    argTypes: {
        typeField: { 
            control: {
                type: "select",
                options: ["text", "password", "tel"],
            },
        },

        mask: {
            control: "text" || "array"
        },

        value: {
            control: {
                type: "text",
            },
        },

        disabled: {
            control: {
                type: "boolean",
            },
        },

        maxLength: {
            control: {
                type: "number",
                min: 0,
            },
        },

        inputMaxWidthNormal: {
            control: {
                type: "boolean",
            },
        },

    },
};
  
const Template = (args, { argTypes, events }) => ({
    components: { InputField },
    props: Object.keys(argTypes),
    data: () => ({
        events,
        inputValue: null,
    }),
    template: `<InputField v-bind="$props" v-model="inputValue" />`,
});

export const Default = Template.bind({});
Default.args = {
    typeField: "text",
    maxLength: Infinity,
};