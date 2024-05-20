import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ["../packages/**/**/src/*.mdx", "../packages/**/**/src/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-scss",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
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

