---
layout: article.njk
title: "The Hardware-Software Interface Document Nobody Owns"
date: 2026-06-29
tags: ["Automotive / EV Powertrain", "Technical Guides", "Engineering Journal"]
topic: "Engineering Consulting & Process"
excerpt: "The HSI document sits between two teams, referenced by both, authored by neither with real authority. That ownership gap is where register mismatches, timing assumption conflicts, and 'it worked in my test environment' bugs actually come from."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

The Hardware-Software Interface (HSI) document exists specifically to prevent the hardware team and the software team from making incompatible assumptions about how the two sides of the system talk to each other — register maps, timing constraints, signal polarity, initialization sequences, fault reporting formats. In practice, it's one of the most consistently under-owned documents on a program. It's not really a hardware deliverable, because most of its content describes software-visible behavior. It's not really a software deliverable, because it describes hardware constraints the software has to respect. Both teams reference it. Neither team has clear, sole authority to keep it current, and that gap is where a specific, very common category of integration bug comes from.


![The HSI document sits between two teams, owned by neither](/assets/images/diagrams/hardware-software-interface-document-nobody-owns.svg)

## The bug that isn't really a bug

The pattern repeats across programs: hardware makes a small, apparently reasonable change — a register bit gets reassigned during a respin, a timing margin gets tightened, an interrupt priority changes — and the change gets reflected in the hardware design documentation but not propagated to the HSI document, because updating the HSI wasn't clearly anyone's job on that specific change. Software continues developing against the stale interface definition. Everything works in unit testing, because unit tests are written against the same (stale) understanding of the interface. The mismatch only surfaces during system integration, and by then it looks like a mysterious intermittent bug rather than what it actually is: two teams that were both internally consistent and mutually inconsistent with each other.

## Why "it's documented somewhere" isn't good enough

A hardware design document, a schematic, and an HSI document can all technically contain the correct information while still producing this failure mode, because the software team isn't reading the schematic and the hardware team isn't reading the software's interpretation of the register map. The HSI document's entire value proposition is being the single place both teams actually consult — and that value collapses the moment either team starts treating it as a snapshot taken at kickoff rather than a live artifact that has to be updated in lockstep with every hardware or software change that touches the interface.

## What ownership actually needs to look like

The programs that avoid this class of bug treat HSI updates as a mandatory gate on any change that touches the interface — no hardware ECO that changes register behavior, timing, or signal definitions ships without a corresponding HSI update reviewed by both sides, and no software change that reinterprets the interface gets merged without the same review. This requires someone with actual authority over the document — not a shared folder anyone can theoretically edit, but a named owner, often a systems engineer rather than a hardware or software lead specifically, whose job includes catching exactly this kind of unpropagated change.

The second practical habit: version-controlling the HSI document alongside the code and treating a register map change as a breaking change requiring explicit acknowledgment from both teams, the same way an API contract change would be treated between two software teams. Most HSI documents are still Word documents or spreadsheets passed around by email, which makes this kind of change tracking almost impossible — and that format choice, more than any individual team's diligence, is often the real root cause of the bug.
