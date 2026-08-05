---
layout: solution-detail.njk
title: "Semiconductor"
eyebrow: "SEMICONDUCTOR"
---

A component that clears every line item on a datasheet can still be the wrong choice for a production program — the failures that actually surface later almost never come from a spec the datasheet got wrong, they come from questions a parametric search was never going to answer: long-term reliability under the application's real thermal cycling, second-source viability before an allocation shortage forces the issue, and what a qualification grade actually certifies versus what a buyer assumes it certifies.

![From component selection to qualified workmanship](/assets/images/diagrams/solution-semiconductor.svg)

## Component sourcing beyond the datasheet

Component selection — MCUs, SiC/IGBT power modules, precision passives — starts with the qualification report behind the part, not the summary datasheet: cycles-to-failure data under real thermal stress, AEC-Q grade stress test results, and a genuine multi-vendor second-source path planned in at design-in, not discovered during the next allocation crisis.

## High-voltage PCB layout and PCBA design

For automotive-grade power electronics, PCB layout has to account for thick-copper current-carrying requirements, high-voltage isolation clearances, and EMI/EMC behavior together, as one design problem — a layout that satisfies each constraint independently but wasn't checked against all three simultaneously is where a design passes individual reviews and still fails integration testing.

## Qualification and workmanship for automotive programs

Getting components right means nothing if the assembly process doesn't hold to the same standard: IPC-A-610 Class 3 workmanship, ESD-safe handling through clean-room and production processes, and AEC-Q qualified components tracked through the full BOM — not just the handful of parts an audit happens to sample.
