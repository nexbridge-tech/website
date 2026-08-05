---
layout: article.njk
title: "What a Risk Register Looks Like Six Months Before a Recall"
date: 2026-07-23
tags: ["Automotive / EV Powertrain", "Energy Storage", "Engineering Journal"]
topic: "Engineering Consulting & Process"
excerpt: "In post-incident reviews, the risk register almost never shows a completely blank space where the failure should have been flagged. It shows a row that was open, tracked, deprioritized, and eventually closed for reasons that made sense at the time."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

Post-incident reviews on major field failures have a recurring, uncomfortable pattern: pulling the risk register from six months before the incident almost never reveals a blank space where the eventual failure should have been. It reveals a row. Sometimes several rows, related to the eventual failure mode from different angles, each one individually reasonable to have deprioritized at the time, collectively describing exactly the failure that eventually happened.


![A risk register entry's life cycle: opened, tracked, deprioritized, closed](/assets/images/diagrams/risk-register-six-months-before-a-recall.svg)

## The risk that got closed for a good reason

A risk gets logged during design — a marginal thermal margin under a specific edge-case operating condition, a supplier's process capability that looked borderline during initial qualification, a test coverage gap for a low-probability but high-severity scenario. It gets discussed, gets a mitigation plan, and then gets closed — sometimes because the mitigation genuinely resolved it, and sometimes because schedule pressure made "the probability seems low and we're out of time before the milestone" a more attractive conclusion than "we should actually resolve this before shipping." The closure rationale in both cases can read identically in the risk register. Only one of them was actually true.

## Why deprioritization feels safe in the moment

Every individual decision to deprioritize a marginal risk is made with incomplete information and real schedule pressure, by people trying to make a reasonable trade-off between engineering rigor and program timelines that are themselves under commercial pressure. No single deprioritization decision looks reckless in isolation — each one is a judgment call that a specific risk is probably low-probability enough, or the mitigation is probably good enough, to accept and move forward. The problem is that these decisions accumulate without anyone tracking the *aggregate* risk they represent, because each one gets evaluated and closed independently, at a different point in the program, often by different people, none of whom has visibility into how many similar judgment calls have already been made elsewhere in the same system.

## The specific pattern that recurs

The failure that eventually happens is very often not a single dramatic miss — it's the intersection of two or three separately-deprioritized risks occurring together in a combination nobody explicitly evaluated, because each risk was assessed against its own independent probability, not against the probability of it coinciding with the other deprioritized risks. A marginal thermal margin combined with a borderline supplier process combined with a real-world usage pattern slightly outside the validated envelope — each individually "probably fine," and the intersection of all three is exactly where the field failure originates.

## What actually helps

A risk register needs a mechanism for surfacing aggregate exposure, not just individual risk status — a periodic review, separate from individual risk closure decisions, that asks specifically what happens if several of the currently-accepted, currently-deprioritized risks occur together, not just what happens if each occurs alone. This is a different question than the one most risk reviews ask, and it requires someone with visibility across the whole system, not just one subsystem, to ask it.

The other practical discipline: closure rationale should distinguish explicitly between "resolved" and "accepted as residual risk under schedule pressure," rather than using the same closed status for both. A register full of risks marked simply "closed" gives no signal about which ones were actually fixed and which ones were judgment calls that traded engineering certainty for schedule — and that distinction is exactly the information a post-incident review needs and almost never has, because it was never captured in the first place.
