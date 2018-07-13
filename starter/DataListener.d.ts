import { ChatEvents, StalkEvents } from "../index";
import { IMessage, RoomAccessData, StalkAccount } from "./models/index";
export declare class DataListener implements StalkEvents.IServerListener, ChatEvents.IChatServerEvents {
    constructor();
    private activeUserEvents;
    addActiveUserEventListener(listener: (key: string, data: any) => void): void;
    removeActiveUserEventListener(listener: (key: string, data: any) => void): void;
    onActiveUser(eventName: string, data: any): void;
    onUserLogin(dataEvent: any): void;
    onUserLogout(dataEvent: any): void;
    private onRoomAccessEventListeners;
    addOnRoomAccessListener: (listener: (data: StalkAccount) => void) => void;
    removeOnRoomAccessListener: (listener: (data: any) => void) => void;
    onAccessRoom(dataEvent: any[]): void;
    private onAddRoomAccessEventListeners;
    addOnAddRoomAccessListener: (listener: (data: any) => void) => void;
    removeOnAddRoomAccessListener: (listener: (data: any) => void) => void;
    onAddRoomAccess(dataEvent: any): void;
    private onUpdateRoomAccessEventListeners;
    addOnUpdateRoomAccessListener: (listener: (data: RoomAccessData) => void) => void;
    removeOnUpdateRoomAccessListener: (listener: (data: RoomAccessData) => void) => void;
    onUpdatedLastAccessTime(dataEvent: RoomAccessData): void;
    private onChatEventListeners;
    addOnChatListener(listener: (message: IMessage) => void): void;
    removeOnChatListener(listener: (message: IMessage) => void): void;
    onChat(data: any): void;
    private onLeaveRoomListeners;
    addOnLeaveRoomListener(listener: (message: IMessage) => void): void;
    removeOnLeaveRoomListener(listener: (message: IMessage) => void): void;
    onLeaveRoom(data: any): void;
    onRoomJoin(data: any): void;
}
