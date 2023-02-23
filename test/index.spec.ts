/**
 * @jest-environment jsdom
*/

import miuapi, {Platform, ClassicOrderBy, JSONData } from '../src/index';
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

test("JsonData, classicLevels", async () => {
    const data = await miuapi.Classic.FetchJSONData(JSONData.classicLevels);
    expect(Object.keys(data).length).toBeGreaterThan(0);
});