---
layout: article.njk
title: "The Design Review That Only Reviews the Slides"
date: 2026-07-16
tags: ["Automotive / EV Powertrain", "Energy Storage", "Engineering Journal"]
topic: "Engineering Consulting & Process"
excerpt: "A design review that runs entirely off a slide deck is reviewing the presenter's summary of the design, not the design itself. The gap between those two things is exactly where risk hides — and it's usually invisible to everyone in the room."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

A design review is supposed to be the point where a design gets tested against perspectives the original designer doesn't have — a different subsystem's constraints, a manufacturing engineer's producibility concerns, a safety engineer's failure-mode thinking. In practice, most design reviews run entirely off a slide deck prepared by the same engineer who did the design, summarizing the decisions they already made and, almost by definition, presenting the strongest case for those decisions. That's not a criticism of the engineer — it's simply what happens when the review artifact is a summary written by the person being reviewed, rather than the underlying design data itself.


![The slide vs. the actual design — where review risk hides](/assets/images/diagrams/design-review-that-only-reviews-the-slides.svg)

## What gets lost in the summary

A slide showing a thermal simulation result — a single color-coded temperature plot with a peak junction temperature number — represents a specific set of boundary conditions, mesh assumptions, and material properties that took real engineering judgment to select. None of that judgment is visible on the slide. The reviewers see the conclusion, not the assumptions the conclusion depends on, and a design review built entirely around slide summaries structurally cannot catch a wrong assumption baked into an otherwise-correct-looking analysis, because the assumption never enters the room.

This is why a design review can produce genuine, thoughtful discussion, generate real action items, get everyone's sign-off, and still miss a problem that was sitting directly in the underlying simulation setup or calculation the whole time — because the review process never actually looked at it, only at someone's interpretation of it.

## The confidence trap

Slide-based reviews have a specific failure mode beyond just missing detail: they tend to produce false confidence proportional to how polished the slides are, not how sound the underlying engineering is. A well-organized, professionally presented deck with clean charts reads as "this team has it under control" regardless of what's actually behind the charts, and a design with real unresolved risk, presented well, will often sail through review with less scrutiny than a design with minor issues presented awkwardly. Reviewers are human, and presentation quality is a genuinely powerful, genuinely misleading signal.

## What a review that actually catches things looks like

The structural fix is requiring underlying data, not summaries, for the specific claims the review needs to trust — the actual simulation model and boundary conditions for a thermal claim, the actual test data and sample size for a reliability claim, the actual schematic and layout for an EMC claim, available for reviewers to interrogate directly, not just referenced as "available on request" (which in practice means rarely requested, given review meeting time constraints).

The second habit that separates reviews that catch real issues from reviews that rubber-stamp: assigning specific reviewers to specific claims *before* the meeting, with time to actually examine the underlying data beforehand, rather than expecting real scrutiny to happen live, cold, in a room where the presenting engineer has had weeks to prepare and the reviewers have had zero. A design review is only as good as the depth of engagement it structurally enables — and a review format built around a live slide walkthrough enables surface-level engagement almost by construction, no matter how experienced or well-intentioned the reviewers in the room are.
