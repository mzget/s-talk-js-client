import ServerImp, { IDictionary } from "./lib/node/serverImplemented";

const stalk = ServerImp.getInstance();
export type Dict = IDictionary;
export function init(): Promise<ServerImp> {
    return new Promise((resolve, reject) => {
        stalk.init((err, result) => {
            if (err) {
                console.error("init stalk fail: ", err);
                stalk._isConnected = false;
                reject(err);
                return;
            }

            console.log("Stalk init success.");
            stalk._isConnected = true;
            resolve(stalk);
        });
    });
}

export function pushMessage(msg: IDictionary) {
    stalk.getClient().request("push.pushHandler.push", msg, (result) => {
        console.log("request result", result);
    });
}