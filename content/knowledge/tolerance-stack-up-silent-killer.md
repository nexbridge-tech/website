---
layout: article.njk
title: "Tolerance Stack-Up: The Silent Killer of 'It Worked on the Bench'"
date: 2026-06-25
tags: ["Automotive / EV Powertrain", "Manufacturing", "Technical Guides"]
topic: "Automotive & EV Power Electronics"
excerpt: "A bench prototype is built from parts near the center of their tolerance bands, by engineers who unconsciously select the best-fitting components. Production doesn't have that luxury — and that's exactly where designs that worked perfectly start failing."
image: "/assets/images/knowledge-placeholder-power-electronics.svg"
draft: false
---

There's a specific and very common failure pattern: a design works flawlessly through every bench validation, passes design review, and then starts showing marginal failures once production volume ramps — not catastrophic failures, just an uncomfortable percentage of units sitting right at the edge of a spec limit. The design didn't change. What changed is which end of each component's tolerance band the actual production units are drawn from, and how those individual tolerances stack up once enough of them align in the same direction.


![Every component in spec — the assembly stack-up isn't](/assets/images/diagrams/tolerance-stack-up-silent-killer.svg)

## Why bench builds are unintentionally optimistic

Engineering bench builds are usually assembled from a small number of hand-selected components, and there's a well-documented, mostly unconscious bias in how that selection happens: parts that look slightly off, measure slightly out of the expected range, or require extra effort to fit get quietly swapped for a better-behaving unit, especially under schedule pressure to get a demo working. This isn't dishonesty — it's normal human behavior when troubleshooting a build — but it means the bench unit is statistically not representative of what a production line, drawing parts across the full tolerance distribution, will actually produce.

## Where the stack-up bites hardest

Tolerance stack-up problems concentrate in a few predictable places: mechanical fit and clearance in enclosures with multiple stacked components, thermal interface material compression where mechanical tolerance directly affects thermal resistance, and electrical timing margins where multiple components' propagation delays are additive. Each individual component's tolerance is within spec. The failure only appears when several tolerances happen to stack in the same direction on the same unit — which won't happen on a hand-built bench sample of five units, and will happen, statistically, on some fraction of a production run of fifty thousand.

The thermal interface case deserves particular attention in power electronics: a cold plate, a thermal interface material, and a power module each have their own flatness and thickness tolerance. Bench testing with one carefully assembled stack tells you almost nothing about the thermal resistance distribution across a production run where those three tolerances combine differently on every unit.

## What actually catches this before the field does

Worst-case and statistical tolerance analysis — root-sum-square or Monte Carlo methods applied to the actual dimensional and electrical tolerance chain, not just nominal values — needs to happen during design, using the *specified* tolerance of each component, not the *typical* value the engineering sample happened to measure. This is a step that gets skipped under schedule pressure because nominal-value analysis is faster and "the bench unit works" feels like sufficient evidence.

The second guardrail is deliberately building validation units from parts pulled from the edges of their tolerance bands, not the center — intentionally worst-case assembly, rather than best-effort assembly. It's a small process change that directly counteracts the unconscious best-fit bias in normal bench work, and it's the difference between finding a stack-up problem in validation, where it's inexpensive, and finding it in a production yield report, where it isn't.
