/**
 * Copyright 2016 Ahoo Studio.co.th.
 *
 * Support by@ nattapon.r@live.com
 */
import { absSpartan } from "./spartanEvents";
export default class ServerEventListener {
    static ON_ADD: string;
    static ON_LEAVE: string;
    static ON_CHAT: string;
    static ON_MESSAGE_READ: string;
    static ON_GET_MESSAGES_READERS: string;
    static ON_VIDEO_CALL: string;
    static ON_VOICE_CALL: string;
    static ON_HANGUP_CALL: string;
    static ON_THE_LINE_IS_BUSY: string;
    static ON_ACCESS_ROOMS: string;
    static ON_ADD_ROOM_ACCESS: string;
    static ON_UPDATED_LASTACCESSTIME: string;
    static ON_CREATE_GROUP_SUCCESS: string;
    static ON_EDITED_GROUP_MEMBER: string;
    static ON_EDITED_GROUP_NAME: string;
    static ON_EDITED_GROUP_IMAGE: string;
    static ON_NEW_GROUP_CREATED: string;
    static ON_UPDATE_MEMBER_INFO_IN_PROJECTBASE: string;
    static ON_USER_LOGIN: string;
    static ON_USER_UPDATE_IMAGE_PROFILE: string;
    static ON_USER_UPDATE_PROFILE: string;
    static ON_GET_ME: string;
    static ON_GET_COMPANY_INFO: string;
    static ON_GET_COMPANY_MEMBERS: string;
    static ON_GET_PRIVATE_GROUPS: string;
    static ON_GET_ORGANIZE_GROUPS: string;
    static ON_GET_PROJECT_BASE_GROUPS: string;
    private chatServerListener;
    private frontendListener;
    private rtcCallListener;
    private serverListener;
    private pushServerListener;
    addFrontendListener(obj: absSpartan.IFrontendServerListener): void;
    addServerListener(obj: absSpartan.IServerListener): void;
    addChatListener(obj: absSpartan.IChatServerListener): void;
    addRTCListener(obj: absSpartan.IRTCListener): void;
    addPushListener(obj: absSpartan.IPushServerListener): void;
    pomelo: any;
    constructor(socket: any);
    addListenner(resolve?: Function): void;
    private callFrontendServer();
    private callChatServer();
    private callRTCEvents();
    private callServerEvents();
    private callPushEvents();
}
