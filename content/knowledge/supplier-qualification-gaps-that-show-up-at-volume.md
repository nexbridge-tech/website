---
layout: article.njk
title: "The Supplier Qualification Gaps That Only Show Up at Volume"
date: 2026-07-14
tags: ["Supply Chain", "Manufacturing", "Lessons Learned"]
topic: "Semiconductor & Manufacturing"
excerpt: "A supplier's qualification sample can be genuinely representative of their process capability and still fail to predict what happens once that process is running at ten times the volume, under commercial pricing pressure, twelve months later."
image: "/assets/images/knowledge-placeholder-manufacturing.svg"
draft: false
---

Supplier qualification for a new power electronics or battery component typically involves a defined sample size, a defined set of tests, and a pass/fail decision that then governs a multi-year sourcing relationship. The qualification sample is usually built with real care — the supplier wants to pass, the buying company wants confidence in the decision, and the process that produces the qualification sample often gets more attention than the process will receive once it's running at full commercial volume. That gap, between qualification conditions and steady-state production conditions, is where a specific and recurring category of field failure originates.


![Qualification sample conditions vs. production-run conditions](/assets/images/diagrams/supplier-qualification-gaps-that-show-up-at-volume.svg)

## Qualification samples are a snapshot, production is a trend

A qualification sample represents a specific point in a supplier's process maturity, often run with extra process control attention because everyone involved knows it's a qualification build. Once qualification passes and volume production ramps, that same process is subject to normal commercial pressures — cost reduction initiatives, second-source material substitutions, process drift that isn't severe enough to trigger an internal quality alarm — that the qualification sample, by definition, never experienced. A component that was genuinely representative of the supplier's capability at qualification time can drift meaningfully by the time volume reaches the levels a mature program actually needs, without any single change being large enough to trigger a formal change notification.

## Where this specifically shows up

**Material substitutions below the disclosure threshold.** Many supplier quality agreements require notification for "significant" material changes, and significance is often defined narrowly enough that a substitution — a different supplier for a raw material input, a minor formulation change to a coating or encapsulant — doesn't meet the notification bar, even though it can measurably affect long-term reliability in ways that don't show up in short-duration acceptance testing.

**Second-source qualification that doesn't match first-source depth.** When a supplier adds capacity through a second manufacturing line or a genuinely separate facility to meet volume, that second source often receives less qualification rigor than the original — sometimes correctly treated as equivalent, sometimes not, and the difference usually only becomes visible once enough volume has shipped from the second source to generate a statistically meaningful field population.

**Statistical process control that catches gross defects and misses gradual drift.** A supplier's SPC system is typically tuned to catch defects that would fail incoming inspection, not to catch a slow drift in a parameter that stays within specification limits at every individual measurement but trends meaningfully over months — exactly the kind of drift that erodes a design margin gradually rather than producing an obvious reject.

## What actually closes this gap

Ongoing statistical monitoring of incoming component data — not just pass/fail against a specification, but trend analysis of the actual measured values over time — catches drift long before it produces an out-of-spec rejection, because a parameter trending toward a limit is visible in the data well before it crosses the limit. This requires the buying company to actually retain and analyze incoming inspection data longitudinally, which is a data infrastructure investment many programs skip in favor of simple pass/fail gating.

The second practical habit: periodic requalification, or at minimum periodic re-sampling against the original qualification test plan, on a cadence tied to volume shipped rather than only to elapsed time — because a supplier who ships ten times the qualification-sample volume in a year has had ten times the opportunity for undisclosed process drift to accumulate, and a purely calendar-based requalification schedule doesn't reflect that.
