---
layout: article.njk
title: "Interface Control Documents: Why the Boring Document Is the One That Saves the Program"
date: 2026-07-09
tags: ["Automotive / EV Powertrain", "Energy Storage", "Supply Chain"]
topic: "Engineering Consulting & Process"
excerpt: "No supplier ever misses a schedule milestone because their interface control document was too detailed. Almost every multi-vendor integration delay traces back to one that wasn't."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

An interface control document (ICD) is, by design, one of the least exciting deliverables on a program — it's a specification of connectors, signal definitions, communication protocols, timing, and electrical characteristics at the boundary between two subsystems, usually from two different suppliers or two different internal teams. Nobody gets excited reviewing an ICD. Everybody eventually wishes it had been reviewed more carefully, because the single most predictable source of schedule slip on any multi-vendor integration — a BESS with separate BMS, PCS and EMS suppliers, a 6-in-1 drive unit with subsystems from different design teams — is an ICD that was agreed to on paper before it was detailed enough to actually prevent a mismatch.


![One interface control document, every supplier boundary](/assets/images/diagrams/interface-control-documents-boring-document-that-saves-programs.svg)

## Where a thin ICD actually costs time

The failure pattern isn't usually a completely missing ICD — most programs have one. It's an ICD detailed enough to look complete in review and thin enough to leave real ambiguity in exactly the places that matter: which side is responsible for pull-up resistors on a shared bus, what happens during power-up sequencing when two subsystems initialize on different timelines, what the exact fault reporting format is when a value is out of range versus when a sensor has actually failed, what units and scaling factors apply to a given signal when both suppliers' internal documentation uses slightly different conventions.

Every one of these ambiguities is resolvable in a five-minute conversation between the two engineering teams — if that conversation happens before both sides have built hardware and written firmware against their own interpretation. If it happens after, resolving the same ambiguity means someone has to change already-built hardware or already-tested firmware, and now it's a schedule problem instead of a documentation problem.

## Why this is worse with more suppliers, not just more complex

A two-party interface only has one boundary to get wrong. A BESS with a BMS supplier, a PCS supplier, and a site-level EMS integrator has three pairwise boundaries, and ambiguity at any one of them can produce a system-level failure that looks like it could be coming from any of the three parties — which is exactly the situation that turns a documentation gap into a finger-pointing exercise during commissioning, when schedule pressure is highest and patience for ambiguity is lowest.

## What a genuinely useful ICD does differently

The programs that don't lose time to this treat the ICD as a testable contract, not a descriptive document — every signal definition should be specific enough that both sides could write an automated test against it independently and get the same pass/fail result. Fault reporting conventions, initialization sequencing, and responsibility boundaries for shared electrical characteristics (like bus termination or pull-up resistors) need to be stated explicitly, not left to "standard practice," because standard practice varies between suppliers more than anyone expects until it causes a problem.

The other habit that pays for itself: a joint ICD review with all parties in the same room (or call) before any hardware is committed to fabrication, specifically looking for the ambiguities above — not a document exchange where each side reviews in isolation and assumes silence means agreement. Silence on an ICD review almost never means agreement. It usually means nobody has gotten to the specific line yet where their assumption diverges from the other side's.
