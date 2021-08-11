import H1 from "../../../components/typographies/H1.vue";
import H2 from "../../../components/typographies/H2.vue";

export default {
    title: "Typographies",
    component: H1,
    subcomponents: { H2 },
    argTypes: {
        text: {
            control: {
                type: "text",
            }
        },
    },
};


const TemplateH1 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { H1 },
    template: '<H1 @onClick="onClick" v-bind="$props" />',
});

const TemplateH2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { H2 },
    template: '<H2 @onClick="onClick" v-bind="$props" />',
});



export const h1 = TemplateH1.bind({});
h1.args = {
    text: "Description H1",
};

export const h2 = TemplateH2.bind({});
h2.args = {
    text: "Description H2",
};