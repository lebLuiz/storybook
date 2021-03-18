import Button from "../../../components/ShipButton.vue";

export default {
  title: "Ship Button",
  component: Button,
  argTypes: {
    label: String,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Button },
  template: '<Button @onClick="onClick" v-bind="$props" />',
});

export const TesteButton = Template.bind({});
TesteButton.args = {
  label: "Ship Button",
};
