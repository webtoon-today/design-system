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
    },
    managerHead: (head) => `
    ${head}
    <script>
        window.onload=function () {
            if (window.location.pathname === "/") {
                return;
            }
            let session=localStorage.getItem("session");
            if (!session || !JSON.parse(session)?.userid) {
                window.location.href = "/"; 
            }
        }
    </script>
    `
};
export default config;

