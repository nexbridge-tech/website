---
layout: article.njk
title: "Requirements That Don't Survive Contact With Hardware"
date: 2026-06-15
tags: ["Automotive / EV Powertrain", "Energy Storage", "Lessons Learned"]
topic: "Engineering Consulting & Process"
excerpt: "A requirements document is a hypothesis about the system, written before the system exists. The gap between that hypothesis and the as-built hardware is where a surprising number of program delays actually originate."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

Every program starts with a requirements document that looks complete: voltage ranges, current limits, thermal envelopes, timing budgets, interface definitions. It's reviewed, signed off, and treated afterward as ground truth. The problem is that a requirements document is a hypothesis about a system that doesn't exist yet, written by people who are reasoning from prior programs, supplier datasheets, and assumptions about how subsystems will interact. As soon as real hardware shows up, some fraction of that hypothesis turns out to be wrong — and the gap between the written requirement and the as-built reality is where a surprising share of program delay actually lives.


![Requirements document, design and hardware build — where the hypothesis breaks](/assets/images/diagrams/requirements-that-dont-survive-contact-with-hardware.svg)

## The requirement that was true in isolation

The most common pattern: a requirement is correct for the subsystem it was written for, and becomes wrong once that subsystem is integrated with others. A thermal budget derived assuming a component operates at its own worst-case duty cycle stops being accurate the moment that component shares a cold plate or enclosure with something else generating heat on a different schedule. A timing requirement written against a bus running in isolation stops holding once three more nodes are added and arbitration behavior changes. The requirement wasn't wrong when it was written — it was scoped to a system boundary that no longer matches the integrated reality.

## Requirements that encode yesterday's architecture

Requirements documents get copied forward from program to program more often than anyone likes to admit, because writing requirements from scratch is expensive and reuse feels efficient. The risk is that a requirement written for a previous architecture — a different sensor placement, a different communication topology, a different thermal path — gets carried into a new program where the underlying assumption no longer applies, and nobody re-derives it because it's sitting in a document that already passed review once.

## What actually catches this

The programs that catch requirement drift early are the ones that treat the requirements document as a living artifact tied to test evidence, not a static deliverable that's "done" after sign-off. Specifically: every requirement should trace to a verification method, and every verification result should be able to flag the requirement it was testing as suspect, not just pass or fail. When a bench test produces a marginal result against a requirement that's been carried unchanged across three programs, that's a signal to re-derive the requirement, not just tighten the test tolerance until the result passes.

The other practical habit: closing the loop from integration testing *back* into the requirements document. If a system-level test reveals that a component-level requirement was insufficient, that finding needs to update the requirement, not just get logged as a one-off test exception. Otherwise the same gap reappears on the next program that reuses the document.

Requirements aren't wrong because engineers are careless. They're wrong because they're written before the system they describe fully exists, and the discipline that prevents that gap from becoming a schedule problem is treating verification as a feedback loop into the requirements, not a one-way gate past them.
