import { EnumSearchType } from "@/enums";

export class ModelEmoji {
    emoji: string;
    shortName: string;
    searchType: EnumSearchType;
    memeUrl: string;

    constructor(
        emoji: string,
        shortName: string,
        searchType: EnumSearchType,
        memeUrl: string
    ) {
        this.emoji = emoji;
        this.shortName = shortName;
        this.searchType = searchType;
        this.memeUrl = memeUrl;
    }

    toMap(): { [key: string]: any } {
        return {
            emoji: this.emoji,
            shortName: this.shortName,
            searchType: this.searchType.toString(),
            memeUrl: this.memeUrl,
        };
    }

    toJSON(): string {
        return JSON.stringify(this.toMap());
    }

    static fromJSON(jsonString: string): ModelEmoji {
        const obj = JSON.parse(jsonString);
        return new ModelEmoji(
            obj.emoji,
            obj.shortName,
            EnumSearchType[obj.searchType as keyof typeof EnumSearchType],
            obj.memeUrl
        );
    }

    customToString(): string {
        return `${this.shortName} - ${this.emoji} - ${this.searchType} - ${this.memeUrl}`;
    }
}


