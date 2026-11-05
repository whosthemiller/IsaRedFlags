# All App Copy — Investment at First Sight

**English localization of:** `טקסטים-באפליקציה.md`  
**Purpose:** Complete player-facing and editorial/review copy, keeping the original structure and intent.  
**Localization style:** Natural, lightly irreverent dating-app English; educational explanations remain accurate and restrained.  
**Note:** Red/green flags describe *signals*, not verified findings about people or investments. See editorial decisions at the end.

---

## 1. Game Name and Metadata

| Location | English copy |
| --- | --- |
| Game name (`gameConfig.gameName` / `<title>`) | Investment at First Sight |
| iOS app title | Investment at First Sight |
| Logo alt text | Israel Securities Authority |
| Game wordmark (two lines) | Investment / at First Sight |
| Loading (`sr-only`) | Loading |
| Logo loading (`aria-label`) | Israel Securities Authority logo is loading |

---

## 2. Welcome Screen and General UI

| Key | English copy |
| --- | --- |
| `logoTagline` | Save the red flags for your exes, not your investment portfolio. |
| `introLead` | Nice to meet you! The dating app from the Israel Securities Authority. |
| `introDecide` | Each round, you'll meet a new profile. Your call: can you trust them, or are there red flags? Swipe right for a green flag, left for a red flag. After each choice, find out if you spotted the signs—and what to watch for when investing, too. |
| `introCta` | Ready to find a match? |
| `pass` | Not My Type |
| `like` | Worth Getting to Know |
| `redFlag` | Red Flag |
| `greenFlag` | Green Flag |
| `passMeta` | Red Flag · Swipe Left |
| `likeMeta` | Green Flag · Swipe Right |
| `swipeHint` | Swipe the card or use the buttons. |
| `keyboardHint` | Keyboard: Left Arrow for a red flag, Right Arrow for a green flag. |
| `next` | Next |
| `again` | Let's Go Again |
| `scoreLabel` | Correct |
| `profile` | Profile |
| `of` | of |
| `about` | About Me |
| `explanation` | The Explanation |
| `signal` | The Tell |
| `correct` | You Got It Right |
| `disclaimer` | A green flag is not approval to invest or an endorsement of any person or product. Do your research before investing. |
| `noPhoto` | No Photo |
| `contentError` | We couldn't load the game content. |
| `progress` | Round Progress |

---

## 3. End Screen (Based on Score)

### Lower score (0–2 correct)

- **Title:** It's Not Always Love at First Sight
- **Description (bold):** First impressions can be misleading.
- **Description (continued):** Investing is no different: take a second look, ask questions, and understand the risks.

### Higher score (3+ correct)

- **Title (bold):** You've Got a Radar for Red Flags
- **Title (continued):** Now it's time to use it outside the app, too.
- **Description (bold):** You picked up on some important signs.
- **Description (continued):** In real life, keep asking questions before you commit.

---

## 4. Concept, Candidate Names, and Taglines (From Content File)

### Game concept

1. A swipe game inspired by dating apps: every round features a different person's profile, complete with a bio and opening message. Players decide whether to swipe right (worth getting to know / green flag) or left (not my type / red flag). After each choice, a short punchline and a professional explanation reveal the warning sign or positive indicator.
2. The creative idea: an investment is a relationship, too. We look at who's promising too much, who's applying pressure, who's keeping things vague, and who's willing to let you get to know them and do your homework before committing. The humor starts in the world of dating; the lesson lands in the feedback. A green flag is not approval to invest or an endorsement of any person or product.

### Candidate names (not shown in game)

- Not My Type
- Return at First Sight *(working pun; see editorial notes)*
- Love on Paper
- Investment at First Sight
- They're Great and All, But… *(localized equivalent of “סבבה והכל אבל...”; see editorial notes)*

### Candidate taglines

- Your taste in women is your problem. When it comes to investing, we can help.
- Your taste in men is your problem. When it comes to investing, we can help.
- Save the red flags for your exes, not your investment portfolio.

---

## 5. Feedback Bank

Where the source has male/female variants, both English variants are retained. **M/F refers to the profile character**, not the player.

### Correctly identifying a red flag (`correctRed`)

- A second date? Better not.
- You got out before your wallet fell in love.
- Not my type. Not my portfolio's type, either.
- **Male profile:** You spotted the red flag before he spotted your money.
- **Female profile:** You spotted the red flag before she spotted your money.

### Missing a red flag (`incorrectRed`)

- **Male profile:** He calls it chemistry. We call it a red flag.
- **Female profile:** She calls it chemistry. We call it a red flag.
- **Male profile:** You can fix him. Sure.
- **Female profile:** You can fix her. Sure.
- Butterflies aren't due diligence.
- Well, you fell hard. Good thing it's just a game.

### Correctly identifying a green flag (`correctGreen`)

- **Male profile:** Well, look at that. A guy who reads the fine print.
- **Female profile:** Well, look at that. A woman who reads the fine print.
- Turns out not everyone's out to rip you off.

### Missing a green flag (`incorrectGreen`)

- **Male profile:** Babe, not every guy is your ex.
- **Female profile:** Babe, not every woman is your ex.
- **Male profile:** Just because he's taking his time doesn't mean he's stringing you along.
- **Female profile:** Just because she's taking her time doesn't mean she's stringing you along.

### Ending (from content file; UI actually uses `uiCopy`)

- You've got a radar for red flags. Now use it outside the app, too.

---

## 6. Profiles (22)

Each entry retains the person's name, age, gender, flag, difficulty, profile tagline, bio, opening message, explanation, and any bespoke feedback. Names are transliterated, not replaced with Anglo names. **Flag and difficulty are editorial metadata and must not appear before the player swipes.**

### 1. Nadav — Red Flag · Medium · 33 · Male

- **Profile tagline:** Lives in Dubai · Real estate developer · Back home once a month
- **Bio:** “I've got an apartment with a sea view, big plans for the future, and I know exactly what I want. Looking for a woman who's ready to take the plunge with me without making a big deal out of every little thing. I promise I'll take care of you.”
- **Opening message:** “Are you spontaneous, or are you one of those people who needs to know everything first?”
- **Explanation:** Avoiding questions about details and terms is a reason to investigate before investing.

### 2. Michael — Red Flag · Easy · 30 · Male

- **Profile tagline:** Businessman · Looking for something long-term
- **Bio:** “I'm not like other guys. With me, there's literally no risk. I've got a steady job, my own place, and a guaranteed 20% return. My mom says I'm a catch.”
- **Opening message:** “So, are you giving me a chance, or are you scared of success? Just don't take too long to decide. I won't be here forever.”
- **Explanation:** Promises of unusually high, guaranteed returns with no risk are warning signs. Extremely high claimed returns are another red flag.

### 3. Guy — Red Flag · Easy · 34 · Male

- **Profile tagline:** Founder & CEO · Never misses Pilates
- **Bio:** “All my exes made at least 30% off me. I know that sounds crazy, but I've got receipts. I'm not into games—unless it's padel.”
- **Opening message:** “If you want, I can send screenshots of everyone in the group's profits.”
- **Explanation:** Screenshots and success stories don't prove that an offer is trustworthy or that future returns are guaranteed.

### 4. Yonatan — Red Flag · Hard · 29 · Male

- **Profile tagline:** Self-employed · Marathon runner
- **Bio:** “Not really into grand promises. I believe in honesty, open communication, and actually getting to know someone before committing. I like running, cooking, and giving friends advice about life and money. Apparently I'm pretty good at it.”
- **Opening message:** “I know exactly what's right for you. I haven't had any formal training, but trust me, I've got plenty of experience.”
- **Explanation:** Experience and confidence are no substitute for the required investment-advice license. Check who's giving you personalized advice about your money.

### 5. Adam — Green Flag · Medium · 33 · Male

- **Profile tagline:** Loves cooking · Licensed · Ready for something serious
- **Bio:** “Ready to invest in a relationship. I like open communication, I'm not afraid of commitment, and I'd rather get to know someone before diving in. And yes, my license is in investment advice. Parallel parking in Tel Aviv? Still working on that.”
- **Opening message:** “Before we talk investments, maybe we should figure out what you're looking for first?”
- **Custom feedback:** A man with a license who actually listens. Rare.
- **Explanation:** A relevant, verifiable license and a personal assessment of someone's financial circumstances and investment goals are positive signs—not automatic approval of any investment offer.

### 6. Noa — Green Flag · Medium · 28 · Female

- **Profile tagline:** Analyst · Apologizes in advance for her playlist
- **Bio:** “I don't believe in love at first sight. I'd rather take things slow, discover the less photogenic sides of each other, and avoid promises I can't keep. In life and in my investment portfolio, I'm all about transparency.”
- **Opening message:** “I can tell you what doesn't work so well about me, too. Want the short version or the long one?”
- **Explanation:** Being transparent about limitations and risks is a positive sign, but it's still important to check the details of the investment offer.

### 7. Tom — Red Flag · Medium · 31 · Male

- **Profile tagline:** Vegan · All-in on everything I do
- **Bio:** “I'm an all-or-nothing kind of guy. When I feel a connection, I go all in. I don't believe in spreading my money—or my energy—across too many things.”
- **Opening message:** “I know it's early, but I think you should stop talking to other people.”
- **Custom feedback:** He calls it exclusivity. We call it concentration risk.
- **Explanation:** Putting all your investment money into one asset increases your exposure to risk. Diversification may help reduce it.

### 8. Rafael — Red Flag · Medium · 35 · Male

- **Profile tagline:** Manager · Mysterious, in a good way
- **Bio:** “I believe trust is the foundation of any relationship. That's how I work with my clients, too. I don't like getting into every tiny detail. I'd rather people trust me and let me do what I know best.”
- **Opening message:** “If you really trust me, why do you need to know everything?”
- **Custom feedback:** A mysterious man? Fun. Money disappearing mysteriously? Less fun.
- **Explanation:** Avoiding questions about how your money or savings are used, or failing to explain the terms and risks, is a warning sign.

### 9. Ori — Green Flag · Medium · 30 · Male

- **Profile tagline:** Loves reading · Lives in Tel Aviv
- **Bio:** “I'm not the guy who'll whisk you off to the Maldives after two dates. I'm not trying to get rich by Thursday with my investments, either. I'm more the guy who'll remember how you take your coffee ten years from now.”
- **Opening message:** “I'm all for taking things slow. Good things don't have to happen in a week.”
- **Explanation:** Avoiding get-rich-quick promises, being patient, and considering your investment time horizon are positive signs.

### 10. Shachar — Red Flag · Medium · 27 · Female

- **Profile tagline:** Dog walker · Mostly available after 11 p.m.
- **Bio:** “If there's a spark, why wait? I love making quick decisions, the adrenaline rush, and the feeling of getting there first. Opportunities don't wait around for people who spend too long doing the math.”
- **Opening message:** “You've got ten minutes to decide if you're interested. After that, I'm moving on.”
- **Explanation:** Pressure to make financial decisions quickly can prevent you from checking the details carefully.

### 11. Ayelet — Green Flag · Medium · 38 · Female

- **Profile tagline:** Lawyer · Looking for stability
- **Bio:** “Not into drama. I like things organized and transparent—with paperwork, clear expectations, and an actual conversation about what we're each looking for. A bit nerdy, apparently, but it works pretty well in the long run.”
- **Opening message:** “Want me to send you all the details first so you can see whether it's even relevant?”
- **Explanation:** Sharing information upfront and giving someone time to review it are positive signs, though the information itself still needs to be verified.

### 12. Lior — Red Flag · Medium · 32 · Female

- **Profile tagline:** AI entrepreneur · Makes magic happen
- **Bio:** “My friends call me a magician. I've built a system that knows you better than you know yourself. All you have to do is let me take the lead, without grilling me about how it works.”
- **Opening message:** “Trust the algorithm. It already knows what's best for you.”
- **Explanation:** Using AI doesn't remove the need to understand the product, its risks, and who's managing your money. No one knows you better than you know yourself.

### 13. Daniela — Green Flag · Hard · 29 · Female

- **Profile tagline:** Graphic designer · Asks way too many questions on a first date
- **Bio:** “I actually like difficult questions. If something isn't clear, I think we should say so, even if it kills the mood a little. And if we're not a match, there's no point forcing it.”
- **Opening message:** “What's the one thing you'd want to know before saying yes?”
- **Explanation:** Encouraging questions and clarifying individual needs is a positive sign, though it doesn't prove trustworthiness on its own.

### 14. Roni — Red Flag · Easy · 26 · Female

- **Profile tagline:** Mentor · Lives in Jerusalem
- **Bio:** “I got out of the rat race before everyone else. I'm living exactly the life I dreamed of, and I teach others how to do the same. People who know me know I have nothing to prove.”
- **Opening message:** “Come join my private group. You'll see how everyone's already made it.”
- **Explanation:** Big promises and success stories in private groups are no substitute for checking the business model and the people behind it. And if she's already living the dream, why is she selling you something?

### 15. Ido — Red Flag · Medium · 36 · Male

- **Profile tagline:** Startup founder · Looking for a partner for life
- **Bio:** “I'm all about equality. It's just that when it comes to money, I prefer one of us to handle everything so we don't argue. What you don't know can't stress you out.”
- **Opening message:** “Let me take care of it. It'll be easier for both of us.”
- **Explanation:** A lack of transparency or oversight when someone manages money on your behalf is a warning sign.

### 16. Bar — Green Flag · Medium · 33 · Female

- **Profile tagline:** Architect · Plans vacations in Excel
- **Bio:** “Spontaneous, as long as you give me two days' notice. I like knowing where things are going, but I don't need to plan a wedding before the first date. I believe in setting expectations and being allowed to change plans—as long as both people are in the loop.”
- **Opening message:** “Tell me what works for you and what absolutely doesn't, and we'll see if there's a connection.”
- **Explanation:** Understanding goals, boundaries, and the ability to tolerate risk is an important part of assessing financial suitability.

### 17. Ofir — Red Flag · Easy · 30 · Female

- **Profile tagline:** Overseas real estate · Always on the way to the airport
- **Bio:** “I believe in privacy. Not everything needs to be online, and not every transaction needs to go through a bank. People who trust me profit.”
- **Opening message:** “Just transfer it to my business partner's account abroad. It'll save us a lot of paperwork.”
- **Explanation:** Being asked to transfer money to a third party or to an account that doesn't match the party named in the agreement is a reason to stop and verify the details.

### 18. Mai — Green Flag · Easy · 28 · Female

- **Profile tagline:** Researcher · Prefers long conversations
- **Bio:** “Yes, I'm the kind of person who checks restaurant reviews before leaving home. I'm not about to promise a future together just because we had one good conversation.”
- **Opening message:** “Can we ask a few more questions before deciding?”
- **Explanation:** Research, comparing alternatives, and avoiding rushed decisions are positive habits.

### 19. Eitan — Red Flag · Medium · 35 · Male

- **Profile tagline:** Doesn't believe in astrology · Still a Libra
- **Bio:** “I don't judge people who don't understand me. Some things just aren't for everyone. Those on the inside get it. Everyone else keeps asking questions.”
- **Opening message:** “There's a reason I can't send you all the details in chat. We can talk once you've paid a commitment fee.”
- **Explanation:** Withholding information and asking for money before providing full details are warning signs.

### 20. Yael — Green Flag · Hard · 31 · Female

- **Profile tagline:** Looking for something serious · Works in tech
- **Bio:** “My fantasy? A relationship with complete transparency. Not everything in life is glamorous, and that's okay. I'd rather you knew the risks before falling for the potential.”
- **Opening message:** “Can we start with what might not work?”
- **Explanation:** Discussing risks and the possibility of losing money is a positive practice, not a guarantee of results.

### 21. Amit — Green Flag · Medium · 29 · Female

- **Profile tagline:** Master's student · Not a morning person
- **Bio:** “I don't have an answer for everything, and I don't pretend to. I read, compare, ask for advice, and don't count on shortcuts. First dates, though? I like to keep those casual.”
- **Opening message:** “Coffee? I promise I won't ask you to decide our entire future by the end of the evening.”
- **Explanation:** Learning, comparing options, and making decisions without pressure are good habits.

### 22. Kobi — Red Flag · Medium · 37 · Male

- **Profile tagline:** Mama's boy · Plant dad
- **Bio:** “Everyone's scared of taking risks because that's what they've been taught. I prefer people who think big. In life, you've got to know when to take a gamble on the right thing. Nothing ventured, nothing gained.”
- **Opening message:** “Don't worry. Worst-case scenario, you get a good story out of it.”
- **Explanation:** Dismissing the possibility of losses or minimizing risks is a warning sign when real money is involved. The stock market isn't a casino.

---

## 7. Review Screen (`/review`) — Internal Copy

| Location | English copy |
| --- | --- |
| Page title | Profile Review |
| Description | Check the wording, spelling, and spacing here before the copy appears in the game. |
| Note | Saving is only available when running `npm run dev`. You can still read the copy here. |
| Loading status | Loading profiles… |
| Loading error | We couldn't load the profiles. |
| Index | Profile {N} |
| Field labels | Name / Profile Tagline / Opening Message / Custom Feedback |
| Explanation hint | Appears after a swipe, beneath the punchline. This field cannot be left blank. |
| Feedback hint | Appears instead of a banked feedback line when the answer is correct. Leaving the field empty removes it. |
| Button | Save / Saving… |
| Unsaved changes | You have unsaved changes |
| Save success | Saved. Refresh the game to see the updated copy. |
| Save error | We couldn't save the copy. |

---

## 8. Editorial and Localization Decisions to Confirm

**These are not untranslated omissions.** All source copy above has an English version. The choices below may change the cultural tone or technical implementation:

1. **Title:** “Investment at First Sight” is the closest natural English title and maintains the romance/investing double meaning. “Return at First Sight” better preserves the pun in *תשואה ממבט ראשון*, but is less idiomatic. Proposed current title: **Investment at First Sight**.
2. **Candidate title “סבבה והכל אבל...”** has no exact idiomatic equivalent. “They're Great and All, But…” captures the format; “They're a Ten, But…” evokes a recognizable English dating game, though it changes the phrase and potentially the concept.
3. **Male/female source variants:** Preserve separate strings for character pronouns if the code expects them. English often makes this unnecessary, but the data structure should not drop variants silently.
4. **Israeli-local details:** Tel Aviv parking, Jerusalem, Dubai, and *padel* have been retained. “Back home once a month” for Nadav assumes “בארץ” refers to Israel, which is clear in the game's setting; “Back in Israel once a month” is an even more explicit alternative for international audiences.
5. **“דמי רצינות”:** Rendered as “commitment fee,” preserving the demand for money upfront. Depending on the scam type, “reservation fee” or “good-faith deposit” could sound more plausible, but would change the nuance.
6. **License terminology:** “License in investment advice” / “required investment-advice license” keeps the Israeli regulatory point. Do **not** substitute a U.S.-specific designation such as SEC registration or FINRA licensing without jurisdiction-specific review.
7. **Professional accuracy — AI profile:** The source concludes “No one knows you better than you know yourself.” This line is translated in full above, but is a rhetorical claim rather than a technical fact about AI; consider whether to retain it in the official release.
8. **Unusual finance jokes:** Guy's “my exes made at least 30% off me” deliberately keeps the ambiguous investing/dating joke. Kobi's “Mama's boy · Plant dad” preserves the original deadpan bio rhythm.
9. **Brand/authority:** “Israel Securities Authority” is the proper English-facing agency label; retain the official agency logo and separately translate its accessibility text.
10. **UI wording:** `signal` = “The Tell” is playful and compact; “The Sign in the Story” is literal, and “What Gave It Away” is more conversational.
11. **Score logic:** The source defines a five-question end screen with buckets 0–2 and 3–5. Ensure the product's round size matches this; if it doesn't, adapt the threshold in code rather than changing the translation.
12. **Source typos:** Corrected ordinary spelling/spacing/punctuation in English (including Bar, Amit, and Lior), without changing the intended message.
