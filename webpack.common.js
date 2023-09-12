const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
    
    entry: {
        popup: path.resolve("./src/popup/popup.tsx"),
        background: path.resolve("./src/background/background.ts"),
        contentScript: path.resolve("./src/contentScript/contentScript.ts"),
        options: path.resolve("./src/index.tsx"),
    },
    module: {
        rules: [
            { use: "ts-loader", test: /\.tsx?$/, exclude: /node_modules/ }, 
            { test: /\.scss$|css$/, use: [ 
               // { loader: "style-loader" },  // to inject the result into the DOM as a style block
                //{ loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                //{ loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
               // { loader: "sass-loader" }, 
               "style-loader", "css-loader",
                { 
                    loader: "postcss-loader", 
                    options: {
                        postcssOptions: {
                            ident: "postcss",
                            plugins: [tailwindcss, autoprefixer]
                        }
                    }
                }, 
                
                // to convert SASS to CSS

                // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
            ]}, 

        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve("src/assets/manifest.json"), 
                    to: path.resolve("dist")
                }
            ]
        }),
        new HtmlPlugin({
            title: "TabSera Quick Manage",
            filename: "popup.html",
            chunks: ["popup"]
        }),
        new HtmlPlugin({
            title: "TabSera Manage",
            filename: "options.html",
            chunks: ["options"]
        }),
        
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
    },
    output: {
        filename: "[name].js"  // in /dist
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    }
}; 