import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: [
        "../packages/**/**/src/?(components/)*stories.@(ts|tsx)",
        "../packages/**/**/src/?(components/)*mdx.@(ts|tsx)"
    ],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-scss",
        "@storybook/addon-coverage"
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

