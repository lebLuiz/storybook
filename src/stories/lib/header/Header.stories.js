import HeaderMenu from "../../../components/header_menu/HeaderMenu.vue";

export default {
    title: "Header",
    component: HeaderMenu,
    argTypes: {
        imgLogo: {
            control: {
                type: "text",
            }
        },

        linksRedirected: {
            control: {
                type: "array",
            }
        },

        openOptionsRedirect: {
            control: {
                type: "boolean",
            }
        },
    },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HeaderMenu },
  template: '<HeaderMenu v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
    openOptionsRedirect: false,
    linksRedirected: [
        {
            label: 'Google',
            srcOrpath: 'https://www.google.com/',
        },
        {
            label: 'ShipSmart',
            srcOrpath: 'https://shipsmart.com.br/',
        }
    ],
};