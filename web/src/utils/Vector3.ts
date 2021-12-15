/** 三维向量 */
export class Vector3 {
    /** x轴分量 */
    x: number;
    /** y轴分量 */
    y: number;
    /** z轴分量 */
    z: number;

    /**
     * 初始化
     * @param _x x轴分量
     * @param _y y轴分量
     */
    constructor(_x = 0, _y = 0, _z = 0) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    /** 返回一个克隆的向量 */
    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /** 设置值 */
    setValue(_x = this.x, _y = this.y, _z = this.z): this {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        return this;
    }

    /** 向量相加 */
    static add(a: Vector3, b: Vector3, _v?: Vector3): Vector3 {
        if (!_v) {
            _v = new Vector3();
        }
        _v.x = a.x + b.x;
        _v.y = a.y + b.y;
        _v.z = a.z + b.z;
        return _v;
    }
    /** 向量相减 */
    static subtract(a: Vector3, b: Vector3, _v?: Vector3): Vector3 {
        if (!_v) {
            _v = new Vector3();
        }
        _v.x = a.x - b.x;
        _v.y = a.y - b.y;
        _v.z = a.z - b.z;
        return _v;
    }
}