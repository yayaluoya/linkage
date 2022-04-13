import { ComApiCon } from "./http/apiCon/main/ComApiCon";
import { UserDataProxy } from "./localData/dataItem/UserDataProxy";
import { Env } from "./_d/Env";

/**
 * 验证用户
 */
export function vUser() {
    //如果用户已经登录了的话就同步数据，如果同步失败则删除数据
    if (UserDataProxy.instance.ifLogin) {
        //
    }
}