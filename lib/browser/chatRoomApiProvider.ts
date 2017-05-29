import { IPomelo, Stalk } from "./serverImplemented";
type DataDict = Stalk.IDictionary;

export namespace ChatRoomApi {
    export class ChatRoomApiProvider {
        pomelo: IPomelo;
        constructor(socket) {
            this.pomelo = socket;
        }

        public chat(target: string, _message: any, callback: (err, res) => void) {
            this.pomelo.request("chat.chatHandler.send", _message, (result) => {
                if (callback !== null) {
                    if (result instanceof Error)
                        callback(result, null);
                    else
                        callback(null, result);
                }
            });
        }

        /**
         * @deprecated please use chat instead.
         */
        public chatFile(room_id: string, target: string, sender_id: string, fileUrl: string, contentType: string, meta: any, callback: (err, res) => void) {
            console.log("Send file to ", target);

            let message = {} as DataDict;
            message["rid"] = room_id;
            message["content"] = fileUrl;
            message["sender"] = sender_id;
            message["target"] = target;
            message["meta"] = meta;
            message["type"] = contentType;
            this.pomelo.request("chat.chatHandler.send", message, (result) => {
                let data = JSON.parse(JSON.stringify(result));
                console.log("chatFile callback: ", data);

                if (data.code == 200) {
                    if (callback != null) {
                        callback(null, data.data);
                    }
                }
                else {
                    console.error("WTF", "WTF god only know.");
                }
            });
        }

        public getSyncDateTime(callback: (err, res) => void) {
            let message = {} as DataDict;
            this.pomelo.request("chat.chatHandler.getSyncDateTime", message, (result) => {
                if (callback != null) {
                    callback(null, result);
                }
            });
        }

        /**
         * get older message histories.
         */
        public getOlderMessageChunk(roomId: string, topEdgeMessageTime: Date, callback: (err, res) => void) {
            let message = {} as DataDict;
            message["rid"] = roomId;
            message["topEdgeMessageTime"] = topEdgeMessageTime.toString();

            this.pomelo.request("chat.chatHandler.getOlderMessageChunk", message, (result) => {
                console.log("getOlderMessageChunk", result);
                if (callback !== null)
                    callback(null, result);
            });
        }

        public getMessagesReaders(topEdgeMessageTime: string) {
            let message = {} as DataDict;
            message["topEdgeMessageTime"] = topEdgeMessageTime;
            this.pomelo.request("chat.chatHandler.getMessagesReaders", message, (result) => {
                console.info("getMessagesReaders respones: ", result);
            });
        }

        public getMessageContent(messageId: string, callback: (err: Error, res: any) => void) {
            let message = {} as DataDict;
            message["messageId"] = messageId;
            this.pomelo.request("chat.chatHandler.getMessageContent", message, (result) => {
                if (!!callback) {
                    callback(null, result);
                }
            });
        }

        public updateMessageReader(messageId: string, roomId: string) {
            let message = {} as DataDict;
            message["messageId"] = messageId;
            message["roomId"] = roomId;
            this.pomelo.notify("chat.chatHandler.updateWhoReadMessage", message);
        }

        public updateMessageReaders(messageIds: string[], roomId: string) {
            let message = {} as DataDict;
            message["messageIds"] = JSON.stringify(messageIds);
            message["roomId"] = roomId;
            this.pomelo.notify("chat.chatHandler.updateWhoReadMessages", message);
        }
    }
}