/**
 * 生成随机码
 */
export function getRandomCode(): string {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let res = "";
    for (let i = 0, id; i < 4; i++) {
        id = Math.ceil(Math.random() * 35)
        res += chars[id]
    }

    return res;
}