import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
    stories: ["../packages/**/**/src/*.mdx", "../packages/**/**/src/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-interactions"),
        getAbsolutePath("@storybook/preset-scss"),
    ],

    framework: {
        name: getAbsolutePath("@storybook/react-webpack5"),
        options: {},
    },

    docs: {},

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
    `,

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};
export default config;

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}

