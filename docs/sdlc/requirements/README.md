# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-000 · approved · source: requirements:scope

Delivery scope is lightweight, requirements v1. Product owner approved a fixed tech stack: React 19 (frontend, does all the real work), FastAPI 0.115 and PostgreSQL 16 (named only as formal placeholders, not to be provisioned), AWS (S3+CloudFront for static hosting).

Only the frontend layer is genuinely needed: the whole product is a single public page computing BMI client-side from height/weight with a metric/imperial toggle, WHO category, and disclaimer. FastAPI and PostgreSQL are named to satisfy required stack choices but should not be built/provisioned unless scope changes to saving results. AWS (S3 + CloudFront) is the default static-hosting choice for cost and global reach. Out of scope: user accounts/login/saved BMI history; health tips or personalised recommendations based on BMI result.

### US-001 · draft · source: requirements:EPIC-001/US-001

User enters height and weight into clearly labelled fields matching the current unit system. Invalid (non-numeric, empty, zero, negative) values block calculation and prompt for a valid positive value.

AC-001: labelled height/weight fields appropriate to selected unit system are visible. AC-002: non-numeric or empty input yields no BMI calculation, field treated as having no valid value. AC-003: zero/negative input yields no result and a prompt to enter a valid positive value. Priority: critical.

**Related:** EPIC-001, AC-001, AC-002, AC-003

### US-002 · draft · source: requirements:EPIC-001/US-002

BMI is calculated instantly, entirely client-side, with no backend call and no page reload, updating live as inputs change.

AC-004: valid height+weight produces a client-side-only BMI value. AC-005: changing to another valid value updates the displayed BMI without reload. AC-006: result rounded to one decimal place; standard formula weight(kg)/height(m)^2, with imperial inputs converted internally to metric first (stated assumption). Priority: critical.

**Related:** EPIC-001, AC-004, AC-005, AC-006, NFR-001

### US-003 · draft · source: requirements:EPIC-002/US-003

Once BMI is calculated, the app shows the WHO adult weight category alongside it: Underweight, Normal, Overweight, or Obese.

AC-007: category label shown alongside BMI value. AC-008: BMI <18.5 -> Underweight. AC-009: 18.5-24.9 -> Normal. AC-010: 25-29.9 -> Overweight. AC-011: >=30 -> Obese. Stated assumption: standard WHO adult classification bands, intended for adults only, not children/BMI-for-age. Priority: high.

**Related:** EPIC-002, AC-007, AC-008, AC-009, AC-010, AC-011

### US-004 · draft · source: requirements:EPIC-003/US-004

A metric/imperial toggle lets the user switch unit systems; the app converts internally so the underlying BMI stays consistent.

AC-012: toggle visible for metric (cm/kg) vs imperial (ft-in/lbs). AC-013: metric selected -> height in cm, weight in kg. AC-014: imperial selected -> height in ft/in, weight in lbs. AC-015: switching units after valid entry recalculates and shows the same underlying BMI (stated assumption: internal conversion to a common basis). Priority: high.

**Related:** EPIC-003, AC-012, AC-013, AC-014, AC-015

### US-005 · draft · source: requirements:EPIC-004/US-005

The calculator is free, public, and single-page with no login, registration, or payment, and no personal data sent to or stored on a backend.

AC-016: full calculator available on one page at the app URL with no login/registration/payment prompt (stated assumption: free, public, no auth, no payments). AC-017: entering/submitting measurements sends no personal data to a backend; calculation is client-side and stateless, nothing saved between sessions. Priority: high.

**Related:** EPIC-004, AC-016, AC-017, NFR-002, NFR-004

### US-006 · draft · source: requirements:EPIC-004/US-006

The calculator layout adapts to mobile and desktop screen sizes, keeping inputs, toggle, and result usable.

AC-018: on mobile/narrow viewport, inputs, unit toggle, and result stay legible and usable without horizontal scrolling. AC-019: on desktop/wide viewport, layout adapts while keeping all controls accessible. Priority: medium.

**Related:** EPIC-004, AC-018, AC-019, NFR-003

### US-007 · draft · source: requirements:EPIC-004/US-007

A brief 'not medical advice' disclaimer is always visible on the calculator page.

AC-020: a brief disclaimer stating BMI is a general screening indicator, not medical advice, is visible whenever the page is viewed (stated assumption: always shown). Priority: medium.

**Related:** EPIC-004, AC-020

### NFR-001 · draft · source: requirements:NFR-001

Performance NFR: BMI must be calculated entirely in-browser and shown instantly with no reload, updating immediately on valid input changes.

Applies to US-002. No page reload, no waiting; displayed value must update immediately whenever a valid height or weight changes.

**Related:** US-002

### NFR-002 · draft · source: requirements:NFR-002

Privacy NFR: height, weight, and results must never be sent to or stored on a server.

Applies to US-005. Calculation runs client-side; nothing is saved between sessions.

**Related:** US-005

### NFR-003 · draft · source: requirements:NFR-003

Usability NFR: page must remain legible and usable without horizontal scrolling on small screens, and fully accessible on wide screens.

Applies to US-006. Inputs, unit toggle, and result must stay usable across phone/narrow and desktop/wide viewports.

**Related:** US-006

### NFR-004 · draft · source: requirements:NFR-004

Privacy/access NFR: calculator must be fully usable without creating an account, logging in, or paying.

Applies to US-005. No barriers to getting a BMI result.

**Related:** US-005
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-10-28

**Capabilities in scope:** Height and weight entry, Instant BMI value calculation (client-side), Weight category result (Underweight / Normal / Overweight / Obese), Metric / imperial unit toggle, 'Not medical advice' disclaimer, Mobile-responsive single-page layout, WHO adult BMI classification bands, Adults only, not children or BMI-for-age, Free public access with no payments

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | Your product has no backend work: calculation is client-side, nothing is saved, there are no accounts, no payments, and no integrations. So no server is genuinely needed. FastAPI is named here as a formal placeholder only -- if you ever want a tiny server (for example to serve the page or add an analytics endpoint later), it is a lightweight, low-cost choice that will not get in the way. |
| cloud | AWS | Because the product is a single static page that calculates in the browser, 'hosting' really just means serving a handful of files to the public quickly and cheaply worldwide. AWS does this well via S3 plus CloudFront, costs almost nothing at low traffic for a free tool, and scales effortlessly if the page gets popular. It is the default here and a safe, standard home for the site. |
| database | PostgreSQL | Your app saves nothing -- no accounts, no history, no stored results -- so there is genuinely no data to keep and no database is required. PostgreSQL is listed as the standard default, but it would hold zero records for this product. I am naming it only to satisfy the required choice for this layer; it should not actually be provisioned unless you later decide to save results. |
| frontend | React | This is the only layer that actually does any work: the whole product is a single public page where someone types height and weight, flips a metric/imperial toggle, and instantly sees their BMI and its WHO category. React handles that interactivity -- recalculating as inputs change, switching units, showing the category and disclaimer -- cleanly, and produces the fast, mobile-responsive page you asked for. The calculation runs entirely in the user's browser, so there is nothing to store and no round-trip to a server. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Height & Weight Entry and BMI Calculation

Core behaviour of the calculator: the user enters their height and weight and the app instantly computes the Body Mass Index value client-side. Calculation is stateless -- no data is saved. This epic covers the input of height and weight and the instant, client-side computation of the BMI value. Scope note: adults only; children/BMI-for-age is not supported.

### US-001: Enter height and weight

**Priority:** critical

> As a member of the public using the calculator, I want to enter my height and weight into clearly labelled input fields, so that the app has the data it needs to calculate my BMI.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | the calculator page is open | I view the input area | I see labelled fields for entering height and weight appropriate to the currently selected unit system |
| AC-002 | I am entering my measurements | I type a non-numeric or empty value into a height or weight field | no BMI value is calculated and the field is treated as having no valid value |
| AC-003 | I enter a zero or negative value for height or weight | the app attempts to calculate | no BMI result is shown and I am prompted to enter a valid positive value |

### US-002: Instant client-side BMI calculation

**Priority:** critical

> As a member of the public using the calculator, I want my BMI value to be calculated instantly in the browser as soon as I provide valid height and weight, so that I get my result immediately without any wait or page reload.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I have entered a valid height and weight | the values are complete | the app displays the calculated BMI value computed entirely client-side with no backend call |
| AC-005 | a BMI value is displayed | I change the height or weight to another valid value | the displayed BMI value updates to reflect the new input without a page reload |
| AC-006 | I have entered valid measurements in the currently selected unit system | the BMI is calculated | the result is rounded to one decimal place (assumption: standard BMI = weight(kg) / height(m)^2, with imperial inputs converted internally to metric before calculation) |

## EPIC-002: Weight Category Classification (WHO Adult Bands)

After the BMI value is calculated, the app displays the corresponding weight category using the WHO adult classification: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (>=30). Assumption to surface: these bands are the standard WHO adult bands and the tool is intended for adults, not children or BMI-for-age.

### US-003: Display WHO adult weight category

**Priority:** high

> As a member of the public using the calculator, I want to see which weight category my BMI falls into, so that I can interpret what my BMI value means.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | a BMI value has been calculated | the result is shown | the app displays the weight category label (Underweight, Normal, Overweight, or Obese) alongside the BMI value |
| AC-008 | the calculated BMI is below 18.5 | the category is determined | the category shown is 'Underweight' |
| AC-009 | the calculated BMI is between 18.5 and 24.9 inclusive | the category is determined | the category shown is 'Normal' |
| AC-010 | the calculated BMI is between 25 and 29.9 inclusive | the category is determined | the category shown is 'Overweight' |
| AC-011 | the calculated BMI is 30 or above | the category is determined | the category shown is 'Obese' (assumption: WHO adult classification bands, intended for adults only -- not children/BMI-for-age) |

## EPIC-003: Metric / Imperial Unit Toggle

The calculator supports both metric (cm / kg) and imperial (ft-in / lbs) units via a toggle. The app converts internally so that calculation and classification are consistent regardless of the selected system. Assumption to surface: both unit systems supported with a toggle, converting internally.

### US-004: Switch between metric and imperial units

**Priority:** high

> As a member of the public using the calculator, I want to toggle between metric (cm/kg) and imperial (ft-in/lbs) units, so that I can enter my measurements in the system I am familiar with.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | the calculator page is open | I view the interface | I see a toggle allowing me to choose between metric (cm/kg) and imperial (ft-in/lbs) units |
| AC-013 | metric units are selected | I enter height and weight | the height field accepts centimetres and the weight field accepts kilograms |
| AC-014 | imperial units are selected | I enter height and weight | the height field accepts feet and inches and the weight field accepts pounds |
| AC-015 | I have entered valid measurements in one unit system | I switch the toggle to the other unit system | the app recalculates and displays the same underlying BMI value (assumption: inputs are converted internally to a common basis for calculation) |

## EPIC-004: Platform, Free Public Access & Medical Disclaimer

The calculator is delivered as a single-page, mobile-responsive public web application that is free to use, with no accounts, no login, no payments, and no backend data storage (calculation is client-side and stateless). A brief disclaimer states that BMI is a general screening indicator and not medical advice. Assumptions to surface: free public single-page app, mobile-responsive, no auth, no payments, no backend storage, and a 'not medical advice' disclaimer.

### US-005: Access the calculator freely as a single-page app

**Priority:** high

> As a member of the public, I want to open and use the BMI calculator freely without creating an account, logging in, or paying, so that I can get my BMI instantly with no barriers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I navigate to the application URL | the page loads | the full calculator is available on a single page with no login, registration, or payment prompt (assumption: free, public, no auth, no payments) |
| AC-017 | I use the calculator | I enter and submit my measurements | no personal data is sent to or stored on a backend, as calculation runs client-side and nothing is saved between sessions (assumption: no backend storage, stateless) |

### US-006: Mobile-responsive layout

**Priority:** medium

> As a member of the public using a phone or small screen, I want the calculator to adapt to my screen size, so that I can use it comfortably on any device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | I open the calculator on a mobile device or narrow viewport | the page renders | the inputs, unit toggle, and result remain legible and usable without horizontal scrolling |
| AC-019 | I open the calculator on a desktop or wide viewport | the page renders | the layout adapts appropriately while keeping all controls accessible |

### US-007: Show 'not medical advice' disclaimer

**Priority:** medium

> As a member of the public using the calculator, I want to see a brief disclaimer about the nature of BMI, so that I understand it is a general screening indicator and not medical advice.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | the calculator page is open | I view the page | a brief disclaimer is visible stating that BMI is a general screening indicator and not medical advice (assumption: brief disclaimer always shown) |
<!-- sdlc:auto:end epics -->
