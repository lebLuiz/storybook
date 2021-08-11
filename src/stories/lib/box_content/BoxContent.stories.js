import BoxContent from "../../../components/box_content/BoxContent.vue";

export default {
    title: "BoxContent",
    component: BoxContent,
    argTypes: {
        noMaximumSize: {
            control: {
                type: "boolean",
            }
        },
    },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BoxContent },
  template: '<BoxContent v-bind="$props"><span>Content description example</span></BoxContent>',
});

export const Default = Template.bind({});
Default.args = {
    noMaximumSize: false,
};
