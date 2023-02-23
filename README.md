# miu-api

Fetch data related to Marble it Up in a simple way.
Has types for TypeScript!

## Example

Fetching top 10 on Learning to Roll in Javascript.  

```js
import miuapi from 'miu-api';

const scores = await miuapi.Classic.FetchScores("SP_rollTutorial", 10);
console.log(scores);
```

Fetching the newest custom level in Typescript.  

```ts
import miuapi, { CustomLevel } from 'miu-api';

const level: CustomLevel = await miuapi.Steam.FetchNewestLevel();
console.log(level);
```

A more advanced query in Typescript.  

```ts
import miuapi, { ClassicScore, Platform, ClassicOrderBy } from 'miu-api';

const scores: ClassicScore = await miuapi.Classic.FetchScores(
    "SP_rollTutorial", 25, 5, Platform.Switch, ClassicOrderBy.Time, true
);
console.log(scores);
```

A more advanced custom level query in Typescript.

```ts
import miuapi, { CustomLevel, SteamQuery } from 'miu-api';

const levels: CustomLevel = await miuapi.Steam.FetchCustomLevel(SteamQuery.RankedByVote, 5, 1, "Escapade");
console.log(levels);
```

Fetching the current weekly challenge scores in Typescript.  

```ts
import miuapi, { ClassicScore, WeeklyChallengeStatus, Platform, ClassicOrderBy } from 'miu-api';

const scores: ClassicScore = await miuapi.Classic.FetchWeeklyChallengeScores(
    WeeklyChallengeStatus.Current, "Precious Gems", 50, 0, Platform.Steam, ClassicOrderBy.UpdatedAt, false
);
console.log(scores);
```
