# stalk-javascript-client
Stalk javascript client-api.

```javascript
$ npm install stalk-js --save
or
$ yarn add stalk-js

```

[![https://nodei.co/npm/stalk-js.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/stalk-js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/stalk-js)

### Example
```javascript
/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 */

import {
    Stalk, IDictionary, IServer, API, Utils, StalkFactory, ServerImplemented,
    IPomelo, StalkEvents, PushEvents, ChatEvents
} 
    // from "stalk-js";
    from "../../index";

export namespace StalkCodeExam {

    /**
     * Preparing connection... 
     */
    export class Factory {
        stalk: ServerImplemented;

        constructor(host, port) {
            this.stalk = StalkFactory.create(host, port);
        }

        async stalkInit() {
            let socket = await StalkFactory.init(this.stalk);
            return socket;
        }

        async handshake(uid: string) {
            try {
                // @ get connector server.
                let msg = {} as IDictionary;
                msg["uid"] = uid;
                msg["x-api-key"] = /* your api key*/;
                let connector = await StalkFactory.geteEnter(this.stalk, msg);

                let params = { host: connector.host, port: connector.port, reconnect: false } as Stalk.ServerParam;
                await StalkFactory.handshake(this.stalk, params);

                return await connector;
            } catch (ex) {
                throw new Error("handshake fail: " + ex.message);
            }
        }

        async checkIn(user: any) {
            let msg = {} as IDictionary;
            msg["user"] = user;
            msg["x-api-key"] = /* your api key*/;
            let result = await StalkFactory.checkIn(this.stalk, msg);
            return result;
        }

        private async checkOut() {
            await StalkFactory.checkOut(this.stalk);
        }
    }

    /**
     * Listenning for messages...
     */
    export class ServerListener {
        socket: IPomelo;

        constructor(socket: IPomelo) {
            this.socket = socket;
        }

        private pushServerListener: PushEvents.IPushServerListener;
        public addPushListener(obj: PushEvents.IPushServerListener) {
            this.pushServerListener = obj;

            let self = this;

            self.socket.on(PushEvents.ON_PUSH, function (data) {
                console.log(PushEvents.ON_PUSH, JSON.stringify(data));

                self.pushServerListener.onPush(data);
            });
        }


        private serverListener: StalkEvents.BaseEvents;
        public addServerListener(obj: StalkEvents.BaseEvents): void {
            this.serverListener = obj;

            let self = this;

            // <!-- User -->
            self.socket.on(StalkEvents.ON_USER_LOGIN, data => {
                console.log(StalkEvents.ON_USER_LOGIN);

                self.serverListener.onUserLogin(data);
            });
            self.socket.on(StalkEvents.ON_USER_LOGOUT, data => {
                console.log(StalkEvents.ON_USER_LOGOUT);

                self.serverListener.onUserLogout(data);
            });
        }

        private chatServerListener: ChatEvents.IChatServerEvents;
        public addChatListener(obj: ChatEvents.IChatServerEvents): void {
            this.chatServerListener = obj;

            let self = this;

            self.socket.on(ChatEvents.ON_CHAT, function (data) {
                console.log(ChatEvents.ON_CHAT, JSON.stringify(data));

                self.chatServerListener.onChat(data);
            });
            self.socket.on(ChatEvents.ON_ADD, (data) => {
                console.log(ChatEvents.ON_ADD, data);

                self.chatServerListener.onRoomJoin(data);
            });
            self.socket.on(ChatEvents.ON_LEAVE, (data) => {
                console.log(ChatEvents.ON_LEAVE, data);

                self.chatServerListener.onLeaveRoom(data);
            });

            self.socket.on(ChatEvents.ON_MESSAGE_READ, (data) => {
                console.log(ChatEvents.ON_MESSAGE_READ);

                self.chatServerListener.onMessageRead(data);
            });

            self.socket.on(ChatEvents.ON_GET_MESSAGES_READERS, (data) => {
                console.log(ChatEvents.ON_GET_MESSAGES_READERS);

                self.chatServerListener.onGetMessagesReaders(data);
            });
        }
    }
}


/**
 * 
 * login to stalk.
 */
export function stalkLogin(user: any) {
    const exam = new StalkCodeExam.Factory("stalk.com", 3010);

    exam.stalkInit().then(socket => {
        exam.handshake(user._id).then((connector) => {
            exam.checkIn(user).then((value) => {
                console.log("Joined stalk-service success", value);
                let result: { success: boolean, token: any } = JSON.parse(JSON.stringify(value.data));
                if (result.success) {
                    // Save token for your session..

                    // Listen for message...
                    new StalkCodeExam.ServerListener(exam.stalk.getSocket());
                }
                else {
                    console.warn("Joined chat-server fail: ", result);
                }
            }).catch(err => {
                console.warn("Cannot checkIn", err);
            });
        }).catch(err => {
            console.warn("Hanshake fail: ", err);
        });
    }).catch(err => {
        console.log("StalkInit Fail.", err);
    });
}
```
