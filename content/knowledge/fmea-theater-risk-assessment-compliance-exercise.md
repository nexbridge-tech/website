---
layout: article.njk
title: "FMEA Theater: When Risk Assessment Becomes a Compliance Exercise Instead of an Engineering One"
date: 2026-07-13
tags: ["Automotive / EV Powertrain", "Energy Storage", "Engineering Journal"]
topic: "Engineering Consulting & Process"
excerpt: "A Failure Mode and Effects Analysis with a hundred rows and a green severity-times-occurrence heatmap can still miss the failure that actually happens, because the spreadsheet was built to satisfy a milestone gate, not to genuinely interrogate the design."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

Every serious power electronics or energy storage program produces an FMEA — a systematic walk through failure modes, their effects, their severity, occurrence, and detection ratings, and the resulting risk priority number. It's a genuinely good tool, developed for good reasons, and it's also one of the most consistently hollowed-out documents on a program, because the incentive structure around it rewards completing the spreadsheet, not interrogating the design.


![Severity vs. occurrence risk matrix — the cell the FMEA scored green](/assets/images/diagrams/fmea-theater-risk-assessment-compliance-exercise.svg)

## How an FMEA becomes theater without anyone deciding it should

The drift is gradual and rarely deliberate. A program under schedule pressure needs the FMEA "done" by a milestone gate. The team populating it is often not the same team that made the original design decisions, working from block diagrams rather than from direct knowledge of where the design's actual weak points are. Severity and occurrence ratings get assigned based on generic categories rather than component-specific data, because gathering component-specific failure rate data for every line item is slow. Detection ratings assume test coverage that may not actually exist yet in the validation plan. None of this is dishonest — every step is a locally reasonable response to time pressure — and the cumulative effect is a document that looks rigorous, passes a gate review, and doesn't actually reflect where the design is fragile.

## The tell: an FMEA that never gets updated after it's approved

The clearest sign of an FMEA that's become a compliance artifact rather than a living risk tool is that it stops changing after initial approval — even as the design changes, even as test results come in that should update occurrence or detection ratings, even after a failure occurs during validation that clearly maps to a row in the document. A genuinely useful FMEA is revised continuously as real evidence arrives. One that was built once for a gate review and then archived was never really doing its job past that gate.

## Where this actually bites

The failure that eventually happens is very often traceable, after the fact, to a row that existed in the FMEA with a risk priority number low enough not to trigger action — not because the failure mode was truly low-risk, but because the occurrence or detection rating was optimistic, assigned under the same time pressure that produced the rest of the document. Post-incident reviews finding "it was in the FMEA" are common, and they're a specific kind of uncomfortable, because they mean the tool that was supposed to catch the problem did technically capture it, just with a rating that didn't reflect reality.

## What makes an FMEA actually useful

Risk ratings need to be argued, not just assigned — every occurrence and detection rating should be traceable to actual data (field history, test results, physics-based analysis) or explicitly flagged as an engineering estimate pending data, not presented with the same confidence either way. Cross-functional review matters more than document completeness: an FMEA reviewed only by the team that wrote it tends to validate that team's existing mental model of the design's risks, and misses the failure modes an outside perspective — a different subsystem team, a manufacturing engineer, a field service perspective — would catch immediately. And the document needs an explicit owner responsible for updating it as real evidence arrives, not a one-time deliverable that satisfied a gate and was never touched again.
