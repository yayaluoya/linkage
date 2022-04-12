/** 主题类型，分别是md主题和代码主题 */
export type themeType = "md" | "code";

/**
 * 主题列表
 */
export const themeList: Record<themeType, {
    /** 名字 */
    name: string;
    /** 值 */
    value: string;
    /** 是否标星，就是是否常用 */
    star?: boolean;
}[]> = {
    md: [
        {
            name: "mistyDark",
            value: "misty-dark",
            star: true,
        },
        {
            name: "mistyLight",
            value: "misty-light",
            star: true,
        },
        {
            name: 'drake',
            value: 'drake',
        },
        {
            name: 'fluent',
            value: 'fluent',
        },
        {
            name: "drakeAyu",
            value: "drake-ayu",
        },
        {
            name: "drakeBlack",
            value: "drake-black",
        },
        {
            name: "drakeDark",
            value: "drake-dark",
        },
        {
            name: "drakeGoogle",
            value: "drake-google",
        },
        {
            name: "drakeJuejin",
            value: "drake-juejin",
        },
        {
            name: "drakeLight",
            value: "drake-light",
        },
        {
            name: "drakeMaterial",
            value: "drake-material",
        },
        {
            name: "drakePurple",
            value: "drake-purple",
        },
        {
            name: "drakeVue",
            value: "drake-vue",
        },
        {
            name: "purpleBlue",
            value: "purple-blue",
        },
        {
            name: "purpleCesno",
            value: "purple-cesno",
            star: true,
        },
        {
            name: "purpleClassic",
            value: "purple-classic",
            star: true,
        },
        {
            name: "purpleGreen",
            value: "purple-green",
        },
        {
            name: "purplePlain",
            value: "purple-plain",
        },
        {
            name: "barfi",
            value: "barfi",
        },
        {
            name: "dracula",
            value: "dracula",
        },
    ],
    code: [
        {
            name: 'atomOneDark',
            value: 'atom-one-dark',
            star: true,
        },
        {
            name: 'atomOneLight',
            value: 'atom-one-light',
            star: true,
        },
        {
            name: 'agate',
            value: 'agate',
        },
        {
            name: 'ascetic',
            value: 'ascetic',
        },
        {
            name: 'brownPaper',
            value: 'brown-paper',
        },
        {
            name: 'codepenEmbed',
            value: 'codepen-embed',
        },
        {
            name: 'colorBrewer',
            value: 'color-brewer',
        },
        {
            name: 'dark',
            value: 'dark',
        },
        {
            name: 'devibeans',
            value: 'devibeans',
        },
        {
            name: 'docco',
            value: 'docco',
        },
        {
            name: 'far',
            value: 'far',
        },
        {
            name: 'foundation',
            value: 'foundation',
        },
        {
            name: 'github',
            value: 'github',
        },
        {
            name: 'githubDark',
            value: 'github-dark',
        },
        {
            name: 'githubDarkDimmed',
            value: 'github-dark-dimmed',
        },
        {
            name: 'googlecode',
            value: 'googlecode',
        },
        {
            name: 'gradientDark',
            value: 'gradient-dark',
        },
        {
            name: 'gradientLight',
            value: 'gradient-light',
        },
        {
            name: 'grayscale',
            value: 'grayscale',
        },
        {
            name: 'hybrid',
            value: 'hybrid',
        },
        {
            name: 'idea',
            value: 'idea',
        },
        {
            name: 'kimbieDark',
            value: 'kimbie-dark',
        },
        {
            name: 'kimbieLight',
            value: 'kimbie-light',
        },
        {
            name: 'lightfair',
            value: 'lightfair',
        },
        {
            name: 'lioshi',
            value: 'lioshi',
        },
        {
            name: 'magula',
            value: 'magula',
        },
        {
            name: 'monokai',
            value: 'monokai',
        },
        {
            name: 'monokaiSublime',
            value: 'monokai-sublime',
        },
        {
            name: 'nord',
            value: 'nord',
        },
        {
            name: 'obsidian',
            value: 'obsidian',
        },
        {
            name: 'paraisoDark',
            value: 'paraiso-dark',
        },
        {
            name: 'paraisoLight',
            value: 'paraiso-light',
        },
        {
            name: 'pojoaque',
            value: 'pojoaque',
        },
        {
            name: 'purebasic',
            value: 'purebasic',
        },
        {
            name: 'qtcreatorDark',
            value: 'qtcreator-dark',
        },
        {
            name: 'qtcreatorLight',
            value: 'qtcreator-light',
        },
        {
            name: 'rainbow',
            value: 'rainbow',
        },
        {
            name: 'routeros',
            value: 'routeros',
        },
        {
            name: 'schoolBook',
            value: 'school-book',
        },
        {
            name: 'shadesOfPurple',
            value: 'shades-of-purple',
        },
        {
            name: 'srcery',
            value: 'srcery',
        },
        {
            name: 'stackoverflowDark',
            value: 'stackoverflow-dark',
        },
        {
            name: 'stackoverflowLight',
            value: 'stackoverflow-light',
        },
        {
            name: 'sunburst',
            value: 'sunburst',
        },
        {
            name: 'tomorrowNightBlue',
            value: 'tomorrow-night-blue',
        },
        {
            name: 'tomorrowNightBright',
            value: 'tomorrow-night-bright',
        },
        {
            name: 'xcode',
            value: 'xcode',
        },
    ],
};

/**
 * 根据字符串获取主题
 * @param str 
 */
export function byStrGetTheme(str: string = ''): {
    md: string;
    code: string;
} {
    try {
        return JSON.parse(str);
    } catch {
        return {
            md: "",
            code: "",
        };
    }
}