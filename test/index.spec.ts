import miuapi, { ClassicScore } from '../lib/index';
var scores: ClassicScore[] = await miuapi.Classic.FetchScores("SP_rollTutorial", 10);