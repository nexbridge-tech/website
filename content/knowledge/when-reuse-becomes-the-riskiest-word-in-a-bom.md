---
layout: article.njk
title: "When 'Reuse' Becomes the Riskiest Word in a BOM"
date: 2026-06-22
tags: ["Automotive / EV Powertrain", "Supply Chain", "Lessons Learned"]
topic: "Engineering Consulting & Process"
excerpt: "Carrying a qualified component forward from a previous program feels like risk reduction. It's only risk reduction if the new application's actual operating conditions were checked against the original qualification — and that check gets skipped more often than it should."
image: "/assets/images/knowledge-placeholder-process.svg"
draft: false
---

"It's already qualified, just carry it forward" is one of the most reasonable-sounding sentences in program management, and one of the more common sources of field failures that nobody predicted. Component reuse across programs is genuinely valuable — it reduces qualification cost, leverages supplier relationships, and avoids re-litigating decisions that already worked. The risk isn't in reuse itself. It's in the gap between "this component was qualified" and "this component was qualified for the conditions it's now being used under."


![Carrying a qualified component into a new program without rechecking conditions](/assets/images/diagrams/when-reuse-becomes-the-riskiest-word-in-a-bom.svg)

## Qualification is scoped, not universal

A power module qualified for one program's duty cycle, ambient temperature range, and mounting configuration is qualified for exactly that — not for every future application that happens to need a part in the same package with similar electrical ratings. When that part gets carried into a new program with a different thermal environment (a different cold plate, a different airflow pattern, a different neighboring heat source), the original qualification data doesn't cover the new operating envelope, even though the part number, and the paperwork trail, look identical.

This gap is easy to miss precisely because the part *looks* de-risked. It has a qualification report. It has field history. Every instinct says it's the safe choice compared to a new, unqualified alternative — and in most cases it is. The failures that happen are the ones where nobody explicitly checked whether the new application's actual conditions fall inside the original qualification envelope, because the part's existing track record made that check feel unnecessary.

## Where this shows up in practice

The specific case that recurs: a sensor or connector qualified for a benign electrical environment gets carried into a new subsystem with a noisier one — for instance, moving from a low-voltage auxiliary circuit application into proximity with a high dv/dt switching stage in a shared enclosure. The part's mechanical and electrical ratings are unchanged. Its EMI susceptibility characterization, if it was ever done at all, was done for the original environment, not the new one — and EMI susceptibility testing is exactly the kind of qualification work that's easy to skip when a part "already has a track record."

## The practical guardrail

The fix isn't avoiding reuse — it's making the requalification decision explicit rather than implicit. A short, structured comparison between the original qualification envelope and the new application's actual operating conditions (thermal, electrical, mechanical, EMI environment) should be a required step before a carried-forward part gets waved through, not an optional one that only happens if someone happens to think of it. That comparison is cheap. Discovering the gap through a field failure is not.

The uncomfortable truth is that "unqualified new part, fully tested for this application" is often a lower-risk choice than "qualified part, never checked against this application's actual conditions" — and program schedules consistently reward the second option because it looks faster, right up until it isn't.
