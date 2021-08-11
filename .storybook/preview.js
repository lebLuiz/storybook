import withEvents from 'storybook-auto-events';

export const parameters = {
  withEvents,
  actions: { argTypesRegex: "^on[A-Z].*" },
}