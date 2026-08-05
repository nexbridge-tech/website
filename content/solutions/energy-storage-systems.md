---
layout: solution-detail.njk
title: "Energy Storage Systems (ESS)"
eyebrow: "ENERGY STORAGE"
---

A grid-scale or behind-the-meter battery energy storage system is rarely at risk at the component level — cells, modules and inverters are, for the most part, mature and well-characterized technology. Where programs actually run into trouble is at the seams between those components, and in the gap between a dispatch requirement written by a developer and the grid-code behavior an interconnection authority will actually accept. Our engineering support is built around those seams, not just the components on either side of them.

![Engineering support across the full BESS chain](/assets/images/diagrams/solution-energy-storage-systems.svg)

## Cell, module and BMS qualification

Cell and module selection starts with the application's actual duty cycle — depth of discharge, cycling frequency, ambient temperature range — not a datasheet's headline cycle-life number measured under a single idealized condition. For LFP-chemistry systems at grid scale, we work through cell and module qualification documentation with the same scrutiny we'd apply to an automotive component: capacity fade curves under the application's real conditions, thermal runaway propagation testing, and BMS-level cell balancing and protection thresholds validated against the pack's actual electrical design, not just the cell vendor's reference implementation.

## Power conversion and grid-code compliance

A PCS (power conversion system) that passes its own factory acceptance test can still fail interconnection if its ride-through behavior, reactive power support, and frequency response settings weren't engineered against the specific grid code and interconnection agreement the project operates under — requirements that vary by market and by utility, and that are frequently treated as a configuration afterthought rather than a design input. We work through PCS selection and configuration, EMS/SCADA coordination, and dispatch logic validation against the project's actual grid-code and utility interconnection requirements before commissioning, not during it.

## Container integration and fire safety

Containerized and cabinet-based ESS integration is where cell-level, module-level and system-level engineering actually converge: thermal management sized for the container's real airflow and ambient conditions, fire detection and suppression systems designed around the specific cell chemistry's failure signature, and structural and electrical integration with substation and metering equipment that has to match the utility's actual interconnection point, not a generic single-line diagram. Getting this integration layer right the first time is the difference between a commissioning schedule that holds and one that slips by months over issues that were knowable in the design phase.
