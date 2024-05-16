import type { AddonOptionsWebpack } from '@storybook/addon-coverage';
import type { StorybookConfig } from "@storybook/react-webpack5";

const coverageOptions:AddonOptionsWebpack = {
  istanbul: {
    include: ['../packages/**/**/src/*.stories.@(ts|tsx)'],
    extension: ['.ts', '.tsx'],
  }
}

const config: StorybookConfig = {
  stories: ["../packages/**/**/src/*.mdx", "../packages/**/**/src/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    {
      name: '@storybook/addon-coverage',
      options: coverageOptions,
    }
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  build: {
    test: {
      disabledAddons: [
        "@storybook/addon-docs",
        "@storybook/addon-essentials"
      ]
    }
  }
};
export default config;
