/**
 * @jest-environment jsdom
*/

import miuapi, {Platform, ClassicOrderBy, JSONData, WeeklyChallengeStatus, SteamQuery } from '../src/index';
jest.setTimeout(10000);

miuapi.ChangeURL("http://192.168.88.177:5420/"); // development, just because im on the same network

test("Fetches scores", async () => {
    const scores = await miuapi.Classic.FetchScores("SP_rollTutorial", 10, 0, Platform.Global, ClassicOrderBy.Time, false);
    expect(scores.length).toBeGreaterThan(0);
});

test("Fetches scores with username", async () => {
    const scores = await miuapi.Classic.FetchUsernameScores("VilleOlof", Platform.Global, ClassicOrderBy.Time, false);
    expect(scores.length).toBeGreaterThan(0);
});

test("Fetches weekly challenge scores", async () => {
    const scores = await miuapi.Classic.FetchWeeklyChallengeScores(WeeklyChallengeStatus.Current, "Precious Gems", 10, 0, Platform.Steam, ClassicOrderBy.Time, false);
    expect(scores.length).toBeGreaterThan(0);
});

test("Fetches weekly challenge data", async () => {
    const data = await miuapi.Classic.FetchWeeklyChallengeData(WeeklyChallengeStatus.Current);
    expect(data.status).toBe("current");
});

test("Fetches replay data", async () => {
    const data = await miuapi.Classic.FetchReplays("SP_rollTutorial", 1);
    expect(data).not.toBeNull();
});

test("JsonData, classicLevels", async () => {
    const data = await miuapi.Classic.FetchJSONData(JSONData.classicLevels);
    expect(Object.keys(data).length).toBeGreaterThan(0);
});

test("Fetches custom level by text", async () => {
    const data = await miuapi.Steam.FetchCustomLevelByName("Azure Athletics");
    expect(data).not.toBeNull();
});

test("Fetchs custom level by custom query", async () => {
    const data = await miuapi.Steam.FetchCustomLevel(SteamQuery.RankedByTotalVotesAsc, 5, 0, "Azure Athletics");
    expect(data).not.toBeNull();
});

test("Fetches all custom levels", async () => {
    const data = await miuapi.Steam.FetchAllCustomLevels();
    expect(data).not.toBeNull();
});

test("Fetches the newest custom level", async () => {
    const data = await miuapi.Steam.FetchNewestCustomLevel();
    expect(data).not.toBeNull();
});
