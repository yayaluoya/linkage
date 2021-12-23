type difficultyStr = {
    color: string;
    name: string;
};
let defficultyArray: Record<number, difficultyStr> = {
    1: {
        color: '#171613',
        name: '黑铁',
    },
    2: {
        color: '#583321',
        name: '青铜',
    },
    3: {
        color: '#808681',
        name: '白银',
    },
    4: {
        color: '#935e1f',
        name: '黄金',
    },
    5: {
        color: '#2c945d',
        name: '铂金',
    },
    6: {
        color: '#57e0e1',
        name: '翡翠',
    },
    7: {
        color: '#8367be',
        name: '钻石',
    },
    8: {
        color: '#aa31b6',
        name: '大师',
    },
    9: {
        color: '#a62830',
        name: '宗师',
    },
    10: {
        color: '#3ba6d9',
        name: '王者',
    },
};
/**
 * 难度字符串
 * @param n 难度值 [1~10]
 */
export function difficultyStr(n: number): {
    color: string;
    name: string;
} {
    return defficultyArray[n] || {
        color: '#171613',
        name: '暂无段位',
    };
}