# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary user: Alex, preparing for the Workday Pro HCM Core certification exam with zero hands-on Workday experience and no sandbox/tenant access. Target exam date: end of December 2026 to early January 2027. Studies on phone, tablet, and laptop/desktop: short sessions and audio on the go, longer sit-down sessions for lessons and mock exams.

Secondary (later, unconfirmed timing): other HCM Core candidates may use it eventually. Build for Alex first; avoid choices that would block sharing later.

## Product Purpose
HCM Core Study Lab is a private study companion that gets one person from zero to exam-ready on Workday Pro HCM Core. Success is passing the exam: pass/fail, up to 55 items (50 scored), 2-hour limit, 1 training credit per attempt, 4-day wait to retake.

## Positioning
Every lesson, question, and card is tied to the current official Exam Guide and the two HCM Core course books (HCM Core for Administrators + Supplemental 25R2), with book page citations. Content is audited against those sources, and unsourced claims get removed rather than kept. It's a study plan, lessons, spaced-repetition cards, practice, and audio in one tool, built around the real exam blueprint.

## Operating Context
- Daily study loop: 45–60 min per study day (due flashcards, then the assigned lesson, then practice without notes, then logging weak spots). Four to six study days a week, at least one rest day.
- 9-week plan with day agendas, review/test days, and TL;DRs.
- One audio episode per study day (46), listened to away from the desk.
- Progress lives in browser localStorage, per device. It does not sync between devices.
- Alex sometimes edits from a phone, so changes can land on GitHub before they reach the local checkout.

## Capabilities and Constraints
- Static HTML/CSS/JS, no build step, hosted on GitHub Pages (alexandra-riano.github.io/projects/workday-study/). Icons: Phosphor, vendored.
- Pages: Home (readiness), Plan, Learn (lessons), Cards, Practice (domain quizzes + 50-question weighted mock exam), Terms (glossary), global search, source library, light/dark theme.
- Content files: `questions.js`, `cards.js`, `notes.js` (study notes), `guide.js` (exam-guide requirements per lesson), `tldr.js`, `visuals.js` (original diagrams), `plan.js`, `audio/` + `podcast.js`. Audio is rebuilt with `node tools/build-podcast.js --force` after content edits.
- The repo is public. No Workday screenshots and no course-book page images go in it; book scans are watermarked "DO NOT COPY". Visuals are original redraws with example data.
- Terminology follows Workday's (supervisory organization, business process, staffing model, security group, etc.). Lessons are study drafts, not "verified" Workday documentation, and the UI must not claim otherwise.
- Must work at phone width with no sideways scroll, and survive blocked storage.
- Open: per-option explanations for wrong answers; whether/when to open it to other candidates; cross-device progress sync (none today).

## Brand Commitments
- Name: HCM Core Study Lab. "W" mark favicon.
- Disclaimer stays: independent private study aid, not affiliated with or endorsed by Workday; practice questions are original.
- Voice: direct and plain; state facts with their source; no hype.

## Evidence on Hand
- Official Exam Guide (current): `~/Documents/New project/Workday/Workday Pro HCM Core Certification Exam Guide.pdf`. The 2021 guide is outdated; don't use it.
- Course books + private OCR text: `~/Documents/New project/Workday/` (private, never in the repo).
- In-app content: 25 lessons, 361+ questions, 131+ flashcards, 46 audio episodes, 67 exam-guide requirements mapped to book answers.
- No testimonials, pass rates, or outside users exist. Don't invent any.

## Product Principles
1. Source over sounding right: every fact traces to the Exam Guide or course books, or it goes.
2. Exam blueprint drives structure: weighting, domains, and objectives come from the official guide.
3. Today's session first: the app should always make the next study step obvious.
4. Honest status: never present drafts as verified, never inflate readiness.
5. Works everywhere Alex studies: phone, tablet, desktop, offline-tolerant, no build step.

## Accessibility & Inclusion
Keep axe-clean in both light and dark themes (current state: no real violations). Audio episodes are an alternate way to take in the lessons; the transcripts (`audio/*.txt`) stay alongside them.
