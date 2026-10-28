---
name: Kerala Services Portal
colors:
  surface: '#F8FAFC'
  surface-dim: '#d2d9fa'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F1F5F9'
  surface-container: '#E2E8F0'
  surface-container-high: '#CBD5E1'
  surface-container-highest: '#94A3B8'
  on-surface: '#131a33'
  on-surface-variant: '#44464f'
  inverse-surface: '#282f49'
  inverse-on-surface: '#eff0ff'
  outline: '#757780'
  outline-variant: '#c5c6d1'
  surface-tint: '#475d92'
  primary: '#00153d'
  on-primary: '#ffffff'
  primary-container: '#0f2a5c'
  on-primary-container: '#7c93cb'
  inverse-primary: '#b0c6ff'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#001c19'
  on-tertiary: '#ffffff'
  tertiary-container: '#00332e'
  on-tertiary-container: '#2ea498'
  error: '#DC2626'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#2e4578'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#faf8ff'
  on-background: '#131a33'
  surface-variant: '#dbe1ff'
  border-subtle: '#E2E8F0'
  border-strong: '#CBD5E1'
  accent-gold: '#D97706'
  success: '#059669'
  success-subtle: '#ECFDF5'
  error-subtle: '#FEF2F2'
  warning: '#D97706'
  warning-subtle: '#FFFBEB'
  info-subtle: '#E0F2FE'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an authoritative, reliable, and high-trust directory and service marketplace. The visual language shifts to a distinguished corporate modern aesthetic anchored in deep nautical authority and civic precision.

- **Personality & Tone:** Authoritative, transparent, institutional yet modern, disciplined, and frictionless.
- **Visual Style:** Modern Corporate with clean architectural structure. It balances deep navy brand anchors with crisp, high-contrast borders, refined light cool surfaces, and clear visual hierarchy suited for professional verification and rapid transactional workflows.
- **Emotional Response:** Inspires unshakeable confidence, credibility, efficiency, and clarity for both end-users booking certified trades and corporate service entities managing operations.

## Colors

The color palette centers on **#0F2A5C** (Deep Navy), providing institutional gravity, high contrast, and polished authority across all primary interfaces.

- **Primary (`#0F2A5C`):** Deep Navy. Governs primary call-to-action buttons, key brand banners, active state indicators, and prominent section titles.
- **Secondary (`#0284C7`):** Steel Azure. Acts as an active navigational accent, interactive link indicator, focus indicator, and complementary active pill color.
- **Tertiary (`#0D9488`):** Verified Teal. Retained strictly for certified trust badges, authentications, trade verifications, and positive milestones.
- **Neutral (`#0B132B`):** Deep Midnight Slate. Drives critical typography, headers, high-emphasis icons, and structural divider emphasis.
- **Backgrounds & Surfaces:**
  - Base canvas uses `#F8FAFC` for glare-free readability.
  - Interactive and data containers use crisp `#FFFFFF` with structural `1px` borders in `#E2E8F0`.
  - Secondary containers and input backings utilize soft `#F1F5F9`.

## Typography

The design system maintains **Plus Jakarta Sans** for comprehensive typographic needs, utilizing clean geometric architecture and robust legibility across small digital screens.

- **Headlines (`headline-xl` to `headline-sm`):** Rendered in weights `600` and `700` with subtle negative tracking for an authoritative, clean editorial finish. Always set in the neutral primary `#0B132B` or `#0F2A5C`.
- **Body (`body-lg` to `body-sm`):** Set in regular weight (`400`) with generous line heights to provide clear scanning for provider credentials, addresses, licensing details, and user agreements.
- **Labels (`label-lg` to `label-sm`):** Employed for interactive controls, badges, table columns, and metadata. Uses medium to semibold weights with positive tracking (`0.01em` - `0.03em`) for enhanced legibility at compact sizes.

## Layout & Spacing

A balanced, responsive grid architecture optimized for data density and thumb-driven handheld interaction.

- **Grid Systems:**
  - **Mobile (<640px):** 4 columns with `1rem` outer screen margins and `0.75rem` column gutters. Maximum container constraint of 480px centered.
  - **Tablet & Desktop (≥640px):** 8 to 12 columns with `1.5rem` outer margins and `1rem` gutters, contained to a maximum width of 1120px to preserve comfortable scan lengths.
- **Spacing Rhythm:**
  - `space-xs` (4px) and `space-sm` (8px) govern tight pairings like icon-to-label gaps and badge internals.
  - `space-md` (16px) defines standard component padding for inputs, list tiles, and compact cards.
  - `space-lg` (24px) handles section interiors and larger card groupings.
  - `space-xl` (32px) separates structural blocks and content segments.

## Elevation & Depth

Visual hierarchy uses crisp boundary lines supplemented by subtle, cool navy ambient shadows:

- **Level 0 (Base Canvas):** `#F8FAFC`. Flat, foundational background.
- **Level 1 (Card & Content Blocks):** Pure white `#FFFFFF` surfaces defined by a crisp `1px` border of `#E2E8F0` and an ultra-subtle ambient shadow:
  `box-shadow: 0 1px 3px 0 rgba(15, 42, 92, 0.04), 0 1px 2px -1px rgba(15, 42, 92, 0.03)`.
- **Level 2 (Active & Hover Cards, Popovers):** Raised interactive containers utilizing a `1px` border of `#CBD5E1` and elevated ambient dispersion:
  `box-shadow: 0 4px 6px -1px rgba(15, 42, 92, 0.06), 0 2px 4px -2px rgba(15, 42, 92, 0.04)`.
- **Level 3 (Sticky Nav, Floating Actions, Modal Sheets):** High-elevation layers with crisp perimeter borders and deep ambient depth:
  `box-shadow: 0 10px 25px -3px rgba(15, 42, 92, 0.10), 0 4px 6px -4px rgba(15, 42, 92, 0.05)`.
  Sticky bars use a refined translucent background (`rgba(255, 255, 255, 0.94)`) with `backdrop-filter: blur(10px)`.

## Shapes

The interface embraces a balanced, professional rounded geometry (`level 2`) to maintain clean structure while offering modern visual warmth:

- **Small Radius (0.25rem / 4px):** Checkbox boxes, micro tags, status indicator pills, and code markers.
- **Base Radius (0.5rem / 8px):** Form fields, action buttons, segment controls, search bars, and dropdown menus.
- **Large Radius (1rem / 16px):** Provider summary cards, corporate profile panels, modal bottom sheets, and image preview containers.
- **Full Radius (9999px):** Filter chips, verified certification badges, avatars, and bottom navigation indicator pills.

## Components

### Buttons
- **Primary Action:** Solid `#0F2A5C` background, white text (`label-lg`), `rounded-md` (8px), 48px height for consistent mobile touch targets. Focus state shows a 2px outer ring in `#0284C7` with a 2px offset. Hover/active states transition to `#1A3D7C`.
- **Secondary Action:** Subdued navy tint (`#F1F5F9`) with `#0F2A5C` text and a 1px border in `#CBD5E1`.
- **Tertiary / Ghost Action:** Transparent background with `#0F2A5C` text; transitions to `#F1F5F9` on hover.

### Form Inputs & Search
- **Search Bar:** 48px height with `#FFFFFF` background, crisp 1px `#E2E8F0` border, leading search icon in `#64748B`, and text in `#0B132B`. Focus state transitions border to `#0F2A5C` with a 1px shadow ring.
- **Input Fields:** 1px border `#E2E8F0` on white surfaces, supporting labels set in `label-md` (`#0F2A5C`). Active focus switches border to `#0284C7`.
- **Checkboxes & Radios:** 20px controls with 1.5px border `#94A3B8`. Selected states fill with `#0F2A5C` featuring crisp white vector indicators.

### Cards (Professionals & Corporate Profiles)
- Built on white `#FFFFFF` with `rounded-lg` (16px), 1px crisp outline in `#E2E8F0`, and Level 1 elevation.
- Header contains provider verification badge and star rating. Body displays clear trade metadata in `#64748B`. Footer provides full-width or dual action buttons with high contrast.

### Badges & Status Chips
- **Verified / Credentialed:** Crisp `#F0FDFA` background with `#0F766E` text and a `#0D9488` micro-icon.
- **Service Status:**
  - *Available / Online:* `#ECFDF5` background with `#059669` text and a solid 6px indicator dot.
  - *Pending / Scheduled:* `#FFFBEB` background with `#D97706` text.
  - *Critical / Closed:* `#FEF2F2` background with `#DC2626` text.
- **Filter Chips:** 36px height with `rounded-full` shape. Unselected chips have `#F8FAFC` background and `#334155` text with a 1px border in `#CBD5E1`. Selected chips transition to solid `#0F2A5C` with white text.

### Navigation Bars
- **Bottom Navigation Bar (Mobile):** 64px height with safe-area padding. 1px top border in `#E2E8F0`, white background with 94% opacity blur. Active destination displays an icon in `#0F2A5C` paired with an active indicator bar or pill. Inactive destinations use `#64748B`.