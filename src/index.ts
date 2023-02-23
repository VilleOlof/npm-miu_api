export enum Platform {
    Global = "Global",
    Steam = "Steam",
    Switch = "Switch",
}

export enum SteamQuery {
    RankedByVote = "k_EUGCQuery_RankedByVote",
    RankedByPublicationDate = "k_EUGCQuery_RankedByPublicationDate",
    AcceptedForGameRankedByAcceptanceDate = "k_EUGCQuery_AcceptedForGameRankedByAcceptanceDate",
    RankedByTrend = "k_EUGCQuery_RankedByTrend",
    FavoritedByFriendsRankedByPublicationDate = "k_EUGCQuery_FavoritedByFriendsRankedByPublicationDate",
    CreatedByFriendsRankedByPublicationDate = "k_EUGCQuery_CreatedByFriendsRankedByPublicationDate",
    RankedByNumTimesReported = "k_EUGCQuery_RankedByNumTimesReported",
    CreatedByFollowedUsersRankedByPublicationDate = "k_EUGCQuery_CreatedByFollowedUsersRankedByPublicationDate",
    NotYetRated = "k_EUGCQuery_NotYetRated",
    RankedByTotalVotesAsc = "k_EUGCQuery_RankedByTotalVotesAsc",
    RankedByVotesUp = "k_EUGCQuery_RankedByVotesUp",
    RankedByTextSearch = "k_EUGCQuery_RankedByTextSearch",
    RankedByTotalUniqueSubscriptions = "k_EUGCQuery_RankedByTotalUniqueSubscriptions",
    RankedByPlaytimeTrend = "k_EUGCQuery_RankedByPlaytimeTrend",
    RankedByTotalPlaytime = "k_EUGCQuery_RankedByTotalPlaytime",
    RankedByAveragePlaytimeTrend = "k_EUGCQuery_RankedByAveragePlaytimeTrend",
    RankedByLifetimeAveragePlaytime = "k_EUGCQuery_RankedByLifetimeAveragePlaytime",
    RankedByPlaytimeSessionsTrend = "k_EUGCQuery_RankedByPlaytimeSessionsTrend",
    RankedByLifetimePlaytimeSessions = "k_EUGCQuery_RankedByLifetimePlaytimeSessions",
}

export class ClassicScore {
    public username: string;
    public time: number;
    public level: string;
    public skin: string;
    public platform: Platform;
    public timestamp: Date;
    public rank: number;

    constructor(username: string, time: number, level: string, skin: string, platform: Platform, timestamp: Date, rank: number) {
        this.username = username;
        this.time = time;
        this.level = level;
        this.skin = skin;
        this.platform = platform;
        this.timestamp = timestamp;
        this.rank = rank;
    }

    public toString(full: boolean = false) {
        var out: string;

        if (full) {
            out = `${this.rank} - ${this.username} - ${this.time} - ${this.platform} - ${this.level} - ${this.skin} - ${this.timestamp}`;
        } else {
            out = `${this.rank} - ${this.username} - ${this.time}`;
        }

        return out;
    }
}

export class CustomScore {
    public username: string;
    public time: number;
    public rank: number;

    constructor(username: string, time: number, rank: number) {
        this.username = username;
        this.time = time;
        this.rank = rank;
    }

    public toString() {
        return `${this.rank} - ${this.username} - ${this.time}`;
    }
}

export class CustomLevel {
    public fileSize: number;
    public timeCreated: number;
    public previewURL: string;
    public author: string;
    public title: string;
    public description: string;
    public fileID: string;
    public workshopURL: string;

    constructor(fileSize: number, timeCreated: number, previewURL: string, author: string, title: string, description: string, fileID: string, workshopURL: string) {
        this.fileSize = fileSize;
        this.timeCreated = timeCreated;
        this.previewURL = previewURL;
        this.author = author;
        this.title = title;
        this.description = description;
        this.fileID = fileID;
        this.workshopURL = workshopURL;
    }
}

export class Replay {
    static State = class {
        public position: number[];
        public velocity: number[];
        public omega: number[];
        public timeIndex: number;

        constructor(position: number[], velocity: number[], omega: number[], timeIndex: number) {
            this.position = position;
            this.velocity = velocity;
            this.omega = omega;
            this.timeIndex = timeIndex;
        }
    }

    public states: Replay.State[];

    constructor(states: Replay.State[]) {
        this.states = states;
    }
}

class miuapi {
    
    static Classic = class  {

        public static async FetchScores(): Promise<ClassicScore[]> {
            throw new Error("Not implemented");
        }

        public static async FetchUsernameScores(): Promise<ClassicScore[]> {
            throw new Error("Not implemented");
        }

        public static async FetchJSONData(): Promise<any> {
            throw new Error("Not implemented");
        }
    }

    static Steam = class {
        
        public static async FetchScores(): Promise<CustomScore[]> {
            throw new Error("Not implemented");
        }

        public static async FetchCustomLevels(): Promise<CustomLevel[]> {
            throw new Error("Not implemented");
        }
    }
}

declare namespace miuapi {
    type Classic = typeof miuapi.Classic.prototype;
    type Steam = typeof miuapi.Steam.prototype;
}

declare namespace Replay {
    type State = typeof Replay.State.prototype;
}

export default miuapi;