/** 
 * 对一些npm库的声明
*/

declare module '@kangc/*' {
    const obj: any;
    export default obj;
}

declare module 'animejs/*' {
    const obj: any;
    export default obj;
}

declare module 'pako' {
    const obj: any;
    export default obj;
}

declare module 'prismjs' {
    const obj: any;
    export default obj;
}

declare module 'marked' {
    export namespace marked {
        export function parse(_str: string): string;
        export function setOptions(_op: any): any;
        export class Renderer { }
    }
}
