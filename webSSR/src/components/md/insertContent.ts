/**
 * 插入内容
 * @param _el 元素
 * @param _tem 模板，$字符表示插槽位置，且只能有一个
 * @param _def 默认内容
 * @param _back 内容修改后的回调，需要通知vue的双向绑定
 */
export function insertContent(_el: HTMLTextAreaElement, _tem: string, _def: string = "", _back?: (_str: string) => void) {
    if (!_el) { return; }
    // console.log('插入内容');
    _el.focus();
    /** 选择状态 */
    let _selectState: {
        s: number;
        e: number;
        /** 方向，向前，向后，无 */
        d: "forward" | "backward" | "none";
    } = {
        s: _el.selectionStart,
        e: _el.selectionEnd,
        d: _el.selectionDirection,
    };
    let _onStr = _el.value.slice(_selectState.s, _selectState.e) || '';
    /** 目标状态 */
    let _targetState: {
        s: number;
        e: number;
    } = {
        s: _selectState.s,
        e: _selectState.e,
    };
    let _$s = _tem.indexOf('$');
    if (_$s != -1) {
        _targetState = {
            s: _$s,
            e: _tem.length - _$s - 1,
        };
        _onStr = _tem.replace(/\$/, _onStr || _def);
        _targetState.s = _selectState.s + _targetState.s;
        _targetState.e = _selectState.s + _onStr.length - _targetState.e;
    } else {
        _onStr = _tem;
        _targetState.e = _targetState.s + _onStr.length;
    }
    //
    setTimeout(() => {
        _el.setRangeText(_onStr, _selectState.s, _selectState.e);
        _back?.(_el.value);
        setTimeout(() => {
            _el.setSelectionRange(_targetState.s, _targetState.e);
        }, 0);
    }, 0);
}