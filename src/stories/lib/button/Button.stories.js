import Button from "../../../components/button/Button.vue";

export default {
    title: "Button",
    component: Button,
    argTypes: {
        text: {
            control: {
                type: "text",
            }
        },

        disabled: {
            control: {
                type: "boolean",
            }
        },

        loading: {
            control: {
                type: "boolean",
            }
        },
        
        roundedBall: {
            control: {
                type: "boolean",
            }
        },
        
        title: {
            control: {
                type: "text",
            }
        },

        typeColor: {
            control: {
                type: "select",
                options: ["primary", "secondary"],
            },
        },

    },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button @onClick="onClick" v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
    typeColor: "primary",
    text: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
    typeColor: "secondary",
    text: "Button",
};
