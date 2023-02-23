import "whatwg-fetch" // Polyfill for fetch

export enum Platform {
    Global = "Global",
    Steam = "Steam",
    Switch = "Switch"
}

export enum ClassicOrderBy {
    Username = "username",
    Time = "time",
    LevelId = "mapID",
    SkinUsed = "skinUsed",
    Platform = "platform",
    UpdatedAt = "updatedAt"
}

export enum WeeklyChallengeStatus {
    Current = "current",
    Previous = "previous",
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

export enum JSONData {
    classicLevelOrder,
    classicLevels,
    customSkins,
    diamondTimes,
    goldTimes,
    levelAuthor,
    mayhemLevelorder,
    mayhemLevels,
    mayhemSkins,
    silverTimes,
    SteamEstimatedPlayCount,
    ultimateTimes,
    weeklyModifiers
}

enum RequestTemplates {
    ClassicScores = "miu/lb/classic/?level={0}&limit={1}&skip={2}&orderBy={3}&orderByDesc={4}&platform={5}&usernameQuery={6}",
    CustomScores = "steam/lb/?start={0}&end={1}&level={2}",
    JSONData = "miu/data/?jsonData={0}",
    CustomLevels = "steam/leveldata/?",

    WeeklyScores = "miu/lb/classicWeekly/?status={0}&GetLevelScore={1}&level={2}&platform={3}&limit={4}&skip={5}&orderBy={6}&orderByDesc={7}",
    WeeklyData = "miu/lb/classicWeekly/?status={0}&GetScores={1}",
}

function FormatString(str: string, ...val: string[]) {
    for (let index: number = 0; index < val.length; index++) {
      str = str.toString().replace(`{${index}}`, val[index]);
    }
    return str;
}

function ValidateResponse(response: any): any {
    if (response.status != 200) {
        throw new Error(`Request failed with status code ${response.status}`);
    }
    else if (response.data.error) {
        throw new Error(`Request failed with error: ${response.data.error}`);
    }

    return response.data;
}

/**
 * A class containing all the data for a classic score
 * @param username The username of the player
 * @param time The time of the score
 * @param level The level of the score
 * @param skin The skin used in the score
 * @param platform The platform of the score
 * @param timestamp The timestamp of when the score was "updated"?
 * @param rank The rank of the score
 * 
 * @param toString Returns a string representation of the score
 * @param full If true, returns a full string representation of the score
 */
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

/**
 * A class containing all the data for a custom score
 * @param username The username of the player
 * @param time The time of the score
 * @param rank The rank of the score
 */
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

/**
 * A class containing all the data for a custom level
 * @param fileSize The size of the level file in bytes
 * @param timeCreated The time the level was created in unix time
 * @param previewURL The URL to the level preview image
 * @param author The level author
 * @param title The level title
 * @param description The level description
 * @param fileID The level file ID
 * @param workshopURL The level workshop URL
 */
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
/**
 * A class containing all the data for a replay
 * @param states The states of the replay
 * 
 * State:
 * @param position The position of the marble
 * @param velocity The velocity of the marble
 * @param omega The angular velocity of the marble
 * @param timeIndex The states time index in the replay
 */
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
    private static _URL = "https://api.olofspelar.se/lb"

    public static ChangeURL(url: string) {
        this._URL = url;
    }
    
    static Classic = class  {

        /**
         * Fetches scores from the classic leaderboards
         * @param level The level to fetch scores from
         * @param limit The amount of scores to fetch
         * @param skip The amount of scores to skip starting from 0
         * @param platform The platform to fetch scores from
         * @param orderby The order to sort the scores by
         * @param orderByDescending Whether to sort the scores in descending order
         * @returns An array of scores
         * 
         * @example
         * ```typescript
         * const scores: ClassicScore[] = await miuapi.Classic.FetchScores("SP_rollTutorial", 10, 0, Platform.Global, ClassicOrderBy.Time, false);
         * 
         * const scores: ClassicScore[] = await miuapi.Classic.FetchScores("SP_rollTutorial", 10);
         * ```
         */
        public static async FetchScores(
            level: string, 
            limit: number, 
            skip: number = 0, 
            platform: Platform = Platform.Global, 
            orderby: ClassicOrderBy = ClassicOrderBy.Time, 
            orderByDescending: boolean = false,
            ): Promise<ClassicScore[]> {
            
            const URL: string = FormatString(miuapi._URL + RequestTemplates.ClassicScores,
                level, limit.toString(), skip.toString(), orderby, orderByDescending.toString(), platform);

            console.log(URL);

            const response: any = await fetch(URL);
            const data: any = await ValidateResponse(response).json();

            const scores: ClassicScore[] = [];

            console.log(data);

            return scores;
        }

        /**
         * Only fetches scores from the classic leaderboards for a specific user
         * @param username The username to fetch scores for
         * @param platform The platform to fetch scores from
         * @param orderby The order to sort the scores by
         * @param orderByDescending Whether to sort the scores in descending order
         * @returns An array of scores
         * 
         * @example
         * ```typescript
         * const scores: ClassicScore[] = await miuapi.Classic.FetchUsernameScores("VilleOlof", Platform.Global, ClassicOrderBy.Time, false);
         * 
         * const scores: ClassicScore[] = await miuapi.Classic.FetchUsernameScores("VilleOlof");
         * ```
         */
        public static async FetchUsernameScores(
            username: string, 
            platform: Platform = Platform.Global, 
            orderby: ClassicOrderBy = ClassicOrderBy.Time, 
            orderByDescending: boolean = false,
            ): Promise<ClassicScore[]> {
            
            const URL: string = FormatString(miuapi._URL + RequestTemplates.ClassicScores,
                username,
                "1",
                "0",
                orderby,
                orderByDescending.toString(),
                platform,
                "true"
            );
            
            const response: any = await fetch(URL);
            const data: any = await ValidateResponse(response).json()

            const scores: ClassicScore[] = [];

            console.log(data);

            return scores;
        }

        /**
         * Fetches scores from the weekly classic leaderboards
         * @returns An array of scores
         * 
         * @example
         * ```typescript
         * const scores: ClassicScore[] = await miuapi.Classic.FetchWeeklyScores();
         * ```
         */
        public static async FetchWeeklyChallengeScores(): Promise<ClassicScore[]> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches the weekly challenge data
         * @param status The status of the weekly challenge
         * @returns The weekly challenge data
         * 
         * @example
         * ```typescript
         * const data: any = await miuapi.Classic.FetchWeeklyChallengeData(WeeklyChallengeStatus.Current);
         * ```
         */
        public static async FetchWeeklyChallengeData(status: WeeklyChallengeStatus): Promise<any> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches replay data from the classic leaderboards
         * @param level The level to fetch replay data from
         * @param limit The amount of replays to fetch
         * @param skip The amount of replays to skip starting from 0
         * @param platform The platform to fetch replays from
         * @param orderby The order to sort the replays by
         * @param orderByDescending Whether to sort the replays in descending order
         * @returns An array of replays
         * 
         * @example
         * ```typescript
         * const replays: Replay[] = await miuapi.Classic.FetchReplays("SP_rollTutorial", 10, 0, Platform.Global, ClassicOrderBy.Time, false);
         * 
         * const replays: Replay[] = await miuapi.Classic.FetchReplays("SP_rollTutorial", 10);
         * ```
         */
        public static async FetchReplays(
            level: string,
            limit: number,
            skip: number = 0,
            platform: Platform = Platform.Global,
            orderby: ClassicOrderBy = ClassicOrderBy.Time,
            orderByDescending: boolean = false,
        ): Promise<Replay[]> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches specific data from the server in JSON format
         * @param type The type of data to fetch
         * @returns The data as an object
         * 
         * @example
         * ```typescript
         * const data: any = await miuapi.Classic.FetchJSONData(JSONData.classicLevels);
         * ```
         */
        public static async FetchJSONData(type: JSONData): Promise<any> {
            throw new Error("Not implemented");
        }
    }

    static Steam = class {

        /**
         * Fetches scores from the steam leaderboards
         * @param level The level to fetch scores from
         * @param limit The amount of scores to fetch
         * @param skip The amount of scores to skip starting from 0
         * @return An array of scores
         * 
         * @example
         * ```typescript
         * const scores: SteamScore[] = await miuapi.Steam.FetchScores("Azure Athletics", 10, 0);
         * 
         * const scores: SteamScore[] = await miuapi.Steam.FetchScores("Azure Athletics", 10);
         * ```
         */
        public static async FetchScores(
            level: string,
            limit: number,
            skip: number = 0,
        ): Promise<CustomScore[]> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches replay data from the steam leaderboards
         * @param level The level to fetch replay data from
         * @param limit The amount of replays to fetch
         * @param skip The amount of replays to skip starting from 0
         * @returns An array of replays
         * 
         * @example
         * ```typescript
         * const replays: Replay[] = await miuapi.Steam.FetchReplays("Azure Athletics", 10, 0);
         * 
         * const replays: Replay[] = await miuapi.Steam.FetchReplays("Azure Athletics", 10);
         * ```
         */
        public static async FetchReplays(
            level: string,
            limit: number,
            skip: number = 0,
        ): Promise<Replay[]> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches a specific custom level via its name
         * @param level The name of the level to fetch
         * @returns The level
         * 
         * @example
         * ```typescript
         * const level: CustomLevel = await miuapi.Steam.FetchCustomLevelByName("Azure Athletics");
         * ```
         */
        public static async FetchCustomLevelByName(
            level: string,
        ): Promise<CustomLevel> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches a specific custom level via query params
         * @param query The query to use
         * @param start The start index
         * @param end The end index
         * @returns An array of levels
         * 
         * @example
         * ```typescript
         * const levels: CustomLevel[] = await miuapi.Steam.FetchCustomLevel(SteamQuery.RankedByTotalVotesAsc, 0, 1);
         * ```
         */
        public static async FetchCustomLevel(
            query: SteamQuery,
            start: number,
            end: number,
        ): Promise<CustomLevel[]> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches all custom levels
         * @returns An array of levels
         * 
         * @example
         * ```typescript
         * const levels: string[] = await miuapi.Steam.FetchAllCustomLevels();
         * ```
         */
        public static async FetchAllCustomLevels(): Promise<string[]> {
            throw new Error("Not implemented");
        }

        /**
         * Fetches the newest custom level
         * @returns The level
         * 
         * @example
         * ```typescript
         * const level: CustomLevel = await miuapi.Steam.FetchNewestCustomLevel();
         * ```
         */
        public static async FetchNewestCustomLevel(): Promise<CustomLevel> {
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