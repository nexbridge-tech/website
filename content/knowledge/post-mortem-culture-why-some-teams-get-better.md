---
layout: article.njk
title: "Post-Mortem Culture: Why Some Engineering Teams Actually Get Better After a Failure (And Most Don't)"
date: 2026-07-28
tags: ["Engineering Journal", "Career Development", "Lessons Learned"]
topic: "Career & Culture"
excerpt: "Almost every engineering organization runs a post-mortem after a serious failure. Very few of them produce a process that's actually different six months later — and the difference between the two isn't effort, it's what the post-mortem is structurally allowed to conclude."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

Almost every engineering organization serious enough to build power electronics or energy storage systems at scale has a post-incident review process. Most of them produce a document, a list of action items, and, six months later, a process that is not meaningfully different from before the incident. The gap between organizations where this genuinely works and organizations where it doesn't isn't effort or intelligence — it's what the post-mortem process is structurally allowed to conclude, and whether the organization's incentives support acting on that conclusion once it's uncomfortable.


![The post-mortem loop that closes back to process change — or doesn't](/assets/images/diagrams/post-mortem-culture-why-some-teams-get-better.svg)

## The post-mortem that stops at the proximate cause

The easiest, least threatening finding for any post-mortem to reach is a specific component failure, a specific test that should have caught it, or a specific engineer's decision that, in hindsight, should have gone differently. These findings are real and worth documenting — but stopping there treats the incident as a local, fixable defect rather than asking the harder question: what about the organization's process, incentive structure, or review culture made this specific gap likely to occur, and are there other places in the current program where the same systemic condition exists right now, undiscovered?

A post-mortem that identifies "this specific FMEA row had an optimistic occurrence rating" is useful. A post-mortem willing to ask "why do our FMEAs systematically produce optimistic occurrence ratings under schedule pressure, and where else is that happening right now" is the one that actually prevents the next incident, and it's also the one that's uncomfortable to conduct, because it implicates process and incentive structure rather than a single identifiable decision point.

## Why psychological safety is a structural requirement, not a nice-to-have

Teams that don't feel safe surfacing the systemic answer will, predictably, produce post-mortems that land on the proximate cause and stop there — not out of dishonesty, but because identifying a systemic problem often means implicitly criticizing schedule pressure, resourcing decisions, or process choices made by people with more organizational power than the engineer writing the post-mortem. An organization that punishes, even subtly, the person who raises an uncomfortable systemic finding will reliably get shallow post-mortems, regardless of how good its post-mortem template or process documentation looks on paper.

## The specific pattern that separates organizations that improve from ones that don't

Organizations that genuinely get better track whether previous post-mortem action items were actually completed and actually effective — not just closed as a task, but verified to have changed the outcome they were meant to change — as a matter of routine, visible process, not a special audit that only happens after a second, more severe incident makes it politically necessary. If action items from a post-mortem eighteen months ago can't be located, or nobody can say whether they were implemented, that's a stronger signal about organizational learning capacity than the quality of the most recent post-mortem document itself.

The other consistent difference: findings get shared and applied across programs, not just within the program where the incident happened. A systemic finding about, for instance, optimistic FMEA ratings under schedule pressure is exactly as relevant to a different product line's current FMEA as it is to the one where the incident occurred — and organizations that route post-mortem findings only to the affected program, rather than treating them as organizational knowledge, pay for the same systemic gap repeatedly, once per program, instead of once.

A post-mortem is not really a document. It's a test of whether an organization's incentive structure rewards finding uncomfortable truths or rewards closing the ticket quickly — and the quality of the resulting engineering process, over years, tracks that test far more closely than it tracks any individual post-mortem's technical thoroughness.
