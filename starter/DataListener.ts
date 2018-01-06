﻿import { ChatEvents, stalkEvents } from "../index";
import { StalkAccount, RoomAccessData, IMessage } from "./models/index";

export class DataListener implements
    stalkEvents.IServerListener,
    ChatEvents.IChatServerEvents {

    //#region IServerListener.

    onUserLogin(dataEvent: any) {
        console.log("user loged In", JSON.stringify(dataEvent));
    }

    onUserLogout(dataEvent: any) {
        console.log("user loged Out", JSON.stringify(dataEvent));
    }

    private onRoomAccessEventListeners = new Array<(data: StalkAccount) => void>();
    public addOnRoomAccessListener = (listener: (data: StalkAccount) => void) => {
        this.onRoomAccessEventListeners.push(listener);
    }
    public removeOnRoomAccessListener = (listener: (data: any) => void) => {
        let id = this.onRoomAccessEventListeners.indexOf(listener);
        this.onRoomAccessEventListeners.splice(id, 1);
    }
    onAccessRoom(dataEvent: Array<any>) {
        if (Array.isArray(dataEvent) && dataEvent.length > 0) {
            let data = dataEvent[0] as StalkAccount;

            // this.dataManager.setRoomAccessForUser(data);

            this.onRoomAccessEventListeners.map(listener => {
                listener(data);
            });
        }
    }

    private onAddRoomAccessEventListeners = new Array();
    public addOnAddRoomAccessListener = (listener: (data: any) => void) => {
        this.onAddRoomAccessEventListeners.push(listener);
    }
    public removeOnAddRoomAccessListener = (listener: (data: any) => void) => {
        let id = this.onAddRoomAccessEventListeners.indexOf(listener);
        this.onAddRoomAccessEventListeners.splice(id, 1);
    }
    onAddRoomAccess(dataEvent: any) {
        let datas: Array<StalkAccount> = JSON.parse(JSON.stringify(dataEvent));
        if (!!datas[0].roomAccess && datas[0].roomAccess.length !== 0) {
            // this.dataManager.setRoomAccessForUser(dataEvent);
        }

        this.onAddRoomAccessEventListeners.map(value => value(dataEvent));
    }

    private onUpdateRoomAccessEventListeners = new Array<(data: RoomAccessData) => void>();
    public addOnUpdateRoomAccessListener = (listener: (data: RoomAccessData) => void) => {
        this.onUpdateRoomAccessEventListeners.push(listener);
    }
    public removeOnUpdateRoomAccessListener = (listener: (data: RoomAccessData) => void) => {
        let id = this.onUpdateRoomAccessEventListeners.indexOf(listener);
        this.onUpdateRoomAccessEventListeners.splice(id, 1);
    }
    onUpdatedLastAccessTime(dataEvent: RoomAccessData) {
        // this.dataManager.updateRoomAccessForUser(dataEvent);

        this.onUpdateRoomAccessEventListeners.map(item => item(dataEvent));
    }

    //#endregion

    // #region ChatListener...

    private onChatEventListeners = new Array<(message: IMessage) => void>();
    public addOnChatListener(listener: (message: IMessage) => void) {
        this.onChatEventListeners.push(listener);
    }
    public removeOnChatListener(listener: (message: IMessage) => void) {
        let id = this.onChatEventListeners.indexOf(listener);
        this.onChatEventListeners.splice(id, 1);
    }

    onChat(data: any) {
        let chatMessageImp = data as IMessage;
        this.onChatEventListeners.map((value, id, arr) => {
            value(chatMessageImp);
        });
    };

    private onLeaveRoomListeners = new Array();
    public addOnLeaveRoomListener(listener: (message: IMessage) => void) {
        this.onLeaveRoomListeners.push(listener);
    }
    public removeOnLeaveRoomListener(listener: (message: IMessage) => void) {
        let id = this.onLeaveRoomListeners.indexOf(listener);
        this.onLeaveRoomListeners.splice(id, 1);
    }
    onLeaveRoom(data: any) {
        this.onLeaveRoomListeners.map(value => value(data));
    };

    onRoomJoin(data: any) {

    };

    // onGetMessagesReaders(dataEvent: DataEvent) {
    //     if (!!this.chatListenerImps && this.chatListenerImps.length !== 0) {
    //         this.chatListenerImps.forEach(value => {
    //             value.onGetMessagesReaders(dataEvent);
    //         });
    //     }
    // };

    //#endregion
}