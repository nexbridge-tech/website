---
layout: article.njk
title: "Smart Factory Integration: Where Automation Projects Actually Fail"
date: 2026-07-01
tags: ["Manufacturing", "Industrial Networking", "Supply Chain"]
topic: "Industrial Networking & Automation"
excerpt: "Most automation projects don't fail because the robot or the PLC was wrong — they fail in the gap between the automation plan and what's actually running on the shop floor. Here are the integration gaps we see most often, and how to catch them before commissioning."
image: "/assets/images/knowledge-automation-arm.jpg"
draft: false
---

Most automation projects don't fail because the robot or the PLC was wrong. They fail in the gap between the automation plan — the layout drawing, the network architecture diagram, the cycle-time model — and what's actually running on the shop floor once integration starts. That gap is predictable enough that it's worth naming the specific places it opens up, instead of treating each project's integration problems as a one-off surprise.


![The automation plan vs. the shop floor it actually meets](/assets/images/diagrams/smart-factory-integration.svg)

## Where the plan usually stops matching the floor

An automation plan is built from equipment specs, vendor cycle-time claims and an idealized material flow. The floor is built from whatever equipment actually arrived, whatever firmware revision it shipped with, and a material flow that includes the exceptions nobody put in the drawing — manual rework stations, buffer inventory that wasn't in the model, an operator workaround for a fault condition that's been there since the line started. The plan doesn't fail because it was drawn wrong; it fails because it was necessarily drawn before the floor's actual behavior existed to draw from, and very few programs go back and reconcile the two once commissioning starts.

The reconciliation gap shows up hardest at handoff points — the interface between two vendors' cells, or between the automation system and the plant's existing MES. Each vendor validates their own cell against their own assumptions about what's upstream and downstream. Nobody validates the seam until the whole line runs together for the first time, which is exactly why integration issues concentrate at cell boundaries rather than inside any single vendor's equipment.

## The most common PLC-to-network integration gaps

A PLC program that passes its own functional test can still fail on the floor because of network-layer assumptions that were never made explicit: cycle time margins that assumed a quiet network segment now sharing bandwidth with a dozen other cells, addressing schemes that worked in isolation but collide once cells are joined onto a shared industrial Ethernet backbone, and safety-network topology that was designed cell-by-cell instead of for the integrated line. None of these are PLC logic bugs — the logic is correct in isolation — but they produce exactly the symptoms of a logic bug once the system is integrated, which sends troubleshooting in the wrong direction for days.

The other recurring gap is IIoT and MES connectivity treated as an add-on after the control logic is finished, rather than a first-class requirement during PLC program design. Tag structures, data polling rates and OPC UA server configuration decided late tend to force compromises — either the control program gets modified under time pressure to expose data it wasn't structured for, or the data layer ends up polling at a rate the network can't actually sustain once the full line is live.

## A pre-commissioning checklist that catches most of these early

The gaps above share a common trait: they're invisible when every cell is tested standalone and only appear once the full system runs together. The checks that actually catch them before commissioning are integration-specific, not cell-specific — network load testing with all cells live simultaneously, not one at a time; a walkthrough of every inter-cell handoff point against the as-built equipment, not the original layout drawing; and IIoT/MES data requirements locked before PLC program architecture is finalized, not after. None of these checks are expensive on their own. What makes them easy to skip is that they require coordinating across vendors and disciplines that otherwise have no reason to talk to each other until the line is already being commissioned.
