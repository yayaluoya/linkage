interface ISe {
    key: string;
    name: string;
}

/**
 * 特效列表
 */
export const SeList: ISe[] = [
    { key: 'stripes', name: '胖次条纹' },
    { key: 'dot', name: '迷雾小黑点' },
    { key: 'cross', name: '小方块' },
    { key: 'fence', name: '渔网袜' },
    { key: 'fence_bold', name: '渔网袜 [加粗]' },
];

/**
 * 正常特效列表
 */
export const NormalSeList: ISe[] = SeList.slice(0, 3);