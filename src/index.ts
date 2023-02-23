export enum Platform {
    Global = "Global",
    Steam = "Steam",
    Switch = "Switch",
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

class miuapi {
    
    static Classic = class  {


        public static async FetchScores(): Promise<ClassicScore[]> {
            throw new Error("Not implemented");
        }
    }

    static Steam = class {

    }
}

export default miuapi;