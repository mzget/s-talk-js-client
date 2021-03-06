import * as Rx from "rxjs/Rx";
import { ChitChatFactory } from "../ChitChatFactory";
import { apiHeaders } from "./chitchatServiceUtils";
var getConfig = function () { return ChitChatFactory.getInstance().config; };
var authReducer = function () { return ChitChatFactory.getInstance().authStore; };
export function getLastAccessRoomInfo(user_id) {
    return fetch(getConfig().api.user + "/lastAccessRoom?user_id=" + user_id, {
        method: "GET",
        headers: apiHeaders()
    });
}
export function updateLastAccessRoomInfo(user_id, room_id) {
    return Rx.Observable.ajax({
        url: getConfig().api.user + "/lastAccessRoom",
        method: "POST",
        headers: apiHeaders(),
        body: JSON.stringify({
            room_id: room_id,
            user_id: user_id
        })
    });
}
export function removeLastAccessRoomInfo(user_id, room_id) {
    return Rx.Observable.ajax({
        url: getConfig().api.user + "/lastAccessRoom",
        method: "DELETE",
        headers: apiHeaders(),
        body: JSON.stringify({ room_id: room_id, user_id: user_id })
    });
}
