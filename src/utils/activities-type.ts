import { customAlphabet } from "nanoid";
import { Activity } from "../interfaces/player-details-response";

export function classifyActivity(activity: Activity): Activity {
  const id = customAlphabet("1234567890ABCDEF", 6)()

  const activityTypes = [
    { type: 'leveling', pattern: /Levelled up([\w\s]+)/, url: 'https://runescape.wiki/images/Statistics.png'},
    { type: 'bossKills', pattern: /defeated ([\w\s]+)| killed ([\w\s]+)/i, url: 'https://runescape.wiki/images/Combat_icon_large.png'},
    { type: 'quest', pattern: /Quest complete:([\w\s]+)/ , url: 'https://runescape.wiki/images/Quest.png'},
    { type: 'questPoints', pattern: /Quest Points ([\w\s]+)/ , url: 'https://runescape.wiki/images/Quest.png'},
    { type: 'drop', pattern: /I found a ([\w\s]+)/, url: 'https://runescape.wiki/images/Backpack_icon.png' },
    { type: 'miniGame', pattern: /completed a game of ([\w\s]+)/, url: 'https://runescape.wiki/images/Activity_icon.png?bb8e5' },
    { type: 'clue', pattern: /completed a ([\w\s]+) clue/, url: 'https://runescape.wiki/images/Sealed_clue_scroll_%28master%29.png?f1baf' },
    { type: 'songs', pattern: /([\w\s]+) songs unlocked/, url: 'https://runescape.wiki/images/Music_icon.png' },
  ]

  for (const { type, pattern, url } of activityTypes) {
    if (
      (activity.text && pattern.test(activity.text))  
    ) {
      return { ...activity, activityType: type, activityUrl: url, id: id };
    }
  }
  return { ...activity, id, activityType: 'other', activityUrl: 'https://runescape.wiki/images/Default_achievement_icon.png' };
}