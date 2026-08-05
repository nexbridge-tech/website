---
layout: article.njk
title: "The E/E Architecture Decision Nobody Revisits"
date: 2026-06-18
tags: ["Automotive / EV Powertrain", "Engineering Journal", "Lessons Learned"]
topic: "Automotive & EV Power Electronics"
excerpt: "Domain vs. zonal, centralized vs. distributed, the wiring topology chosen in the first program review — these decisions get made early, get treated as settled, and quietly constrain every design decision that follows for years."
image: "/assets/images/knowledge-placeholder-power-electronics.svg"
draft: false
---

Every EV program has a moment, usually early and usually rushed, where the E/E architecture gets decided: domain-based or zonal, how many gateway ECUs, where the high-voltage and low-voltage domains physically split, how the wiring harness topology routes power and data across the vehicle. That decision gets made with the information available at the time — which is always less than what's available two years later — and then it becomes load-bearing. Every subsystem team designs against it. By the time anyone has enough evidence to know the decision was suboptimal, changing it means touching everything downstream of it.


![One early E/E architecture decision, years of downstream constraint](/assets/images/diagrams/ee-architecture-decision-nobody-revisits.svg)

## Why the decision is hard to revisit even when it should be

The cost of revisiting an E/E architecture decision isn't symmetric with the cost of making it. Making it wrong initially costs nothing visible — the program moves forward, subsystem teams start their work, milestones get hit. The cost shows up later, distributed across every team that had to design around the constraint, and by the time it's visible in aggregate, it's diffuse enough that no single stakeholder has the full picture or the authority to force a redesign. This is why architecture decisions that were clearly suboptimal in hindsight often survive multiple vehicle generations: the cost of the decision is real but never concentrated enough in one place to trigger a revisit.

## The zonal vs. domain trade-off nobody fully resolves

Domain architectures group functionality (powertrain, chassis, body, infotainment) and keep related signals close together, which simplifies software ownership boundaries but concentrates wiring complexity at domain boundaries. Zonal architectures group by physical location, which simplifies harness routing but distributes related functionality across zone controllers that now need a coherent communication strategy to act as one system. Neither is universally correct — the right choice depends on where the actual complexity of the specific vehicle program lives, and that's usually not fully known at the point the architecture decision has to be made.

## What tends to go unexamined

The specific thing that rarely gets revisited, even on programs willing to revisit other decisions, is the boundary between the high-voltage power domain and the low-voltage control domain — not the electrical isolation itself, but the physical routing and connector strategy around it. That boundary was drawn based on early packaging assumptions, and by the time later programs discover that boundary is awkward for a new subsystem (a new sensor that needs both HV proximity and LV-grade signal integrity, for instance), the routing convention is already baked into the harness supplier's tooling and the connector strategy across multiple vehicle variants.

## What helps

Architecture decisions age better when they're documented with the *reasoning*, not just the *conclusion* — what alternatives were considered, what assumptions the choice depended on, and what would have to change for the decision to need revisiting. A decision record that only states the outcome gives future teams no way to tell whether the original assumptions still hold. A decision record that states the reasoning gives them a checklist to test against before inheriting a constraint that may no longer make sense.
