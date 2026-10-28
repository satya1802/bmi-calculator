// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Label, Table, THead, TBody, TR, TH, TD } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, AlertCircle, CheckCircle } = Icons;

const SCREEN = "BMI Calculator";
const mix = (colour, percent) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

const UNITS = [
  { key: "metric", label: "Metric (cm / kg)", wf: "i-2-0-0" },
  { key: "imperial", label: "Imperial (ft-in / lbs)", wf: "i-2-0-1" },
];

const BANDS = [
  { key: "Underweight", range: "Below 18.5", lo: 0, hi: 18.5 },
  { key: "Normal", range: "18.5 – 24.9", lo: 18.5, hi: 25 },
  { key: "Overweight", range: "25.0 – 29.9", lo: 25, hi: 30 },
  { key: "Obese", range: "30.0 and above", lo: 30, hi: Infinity },
];

const LB_PER_KG = 2.2046226218;
const SCALE_MIN = 14;
const SCALE_MAX = 42;

const toNumber = (raw) => {
  const text = String(raw).trim();
  if (text === "") return null;
  if (!/^-?\d*(\.\d+)?$/.test(text) || text === "." || text === "-") return NaN;
  const value = Number(text);
  return Number.isFinite(value) ? value : NaN;
};

const round1 = (value) => Math.round(value * 10) / 10;

const bandFor = (bmi) => BANDS.find((b) => bmi >= b.lo && bmi < b.hi) || BANDS[BANDS.length - 1];

export default function Screen() {
  const [unit, setUnit] = React.useState("metric");
  const [cm, setCm] = React.useState("175");
  const [kg, setKg] = React.useState("70.5");
  const [feet, setFeet] = React.useState("5");
  const [inches, setInches] = React.useState("9");
  const [lbs, setLbs] = React.useState("155.4");

  const glass = {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: brand.radius,
  };
  const field = {
    ...glass,
    color: "inherit",
    "--tw-ring-color": brand.primaryColor,
    "--tw-ring-offset-color": brand.backgroundColor,
  };
  const ringed = "outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const switchUnit = (next) => {
    if (next === unit) return;
    if (next === "imperial") {
      const h = toNumber(cm);
      const w = toNumber(kg);
      if (h !== null && !Number.isNaN(h) && h > 0) {
        const totalIn = h / 2.54;
        setFeet(String(Math.floor(totalIn / 12)));
        setInches(String(round1(totalIn % 12)));
      } else {
        setFeet(cm === "" ? "" : feet);
      }
      if (w !== null && !Number.isNaN(w) && w > 0) setLbs(String(round1(w * LB_PER_KG)));
    } else {
      const f = toNumber(feet);
      const i = inches === "" ? 0 : toNumber(inches);
      const w = toNumber(lbs);
      if (f !== null && !Number.isNaN(f) && !Number.isNaN(i) && f * 12 + i > 0) {
        setCm(String(round1((f * 12 + i) * 2.54)));
      }
      if (w !== null && !Number.isNaN(w) && w > 0) setKg(String(round1(w / LB_PER_KG)));
    }
    setUnit(next);
  };

  const read = () => {
    if (unit === "metric") {
      const h = toNumber(cm);
      const w = toNumber(kg);
      const badHeight = h !== null && (Number.isNaN(h) || h <= 0);
      const badWeight = w !== null && (Number.isNaN(w) || w <= 0);
      if (badHeight || badWeight) return { status: "invalid", badHeight, badWeight };
      if (h === null || w === null) return { status: "incomplete", badHeight: false, badWeight: false };
      return { status: "ok", bmi: w / Math.pow(h / 100, 2), badHeight: false, badWeight: false };
    }
    const f = toNumber(feet);
    const i = inches === "" ? 0 : toNumber(inches);
    const w = toNumber(lbs);
    const badFeet = f !== null && (Number.isNaN(f) || f < 0);
    const badInches = inches !== "" && (Number.isNaN(i) || i < 0 || i >= 12);
    const badWeight = w !== null && (Number.isNaN(w) || w <= 0);
    const totalIn = (Number.isNaN(f) || f === null ? 0 : f) * 12 + (Number.isNaN(i) ? 0 : i);
    const zeroHeight = f !== null && !badFeet && !badInches && totalIn <= 0;
    if (badFeet || badInches || badWeight || zeroHeight) {
      return { status: "invalid", badHeight: badFeet || badInches || zeroHeight, badWeight };
    }
    if (f === null || w === null) return { status: "incomplete", badHeight: false, badWeight: false };
    const metres = (totalIn * 2.54) / 100;
    return { status: "ok", bmi: (w / LB_PER_KG) / Math.pow(metres, 2), badHeight: false, badWeight: false };
  };

  const result = read();
  const bmi = result.status === "ok" ? round1(result.bmi) : null;
  const band = bmi === null ? null : bandFor(bmi);
  const markerPct = bmi === null ? 0 : Math.min(100, Math.max(0, ((bmi - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100));

  const notice =
    result.status === "invalid"
      ? { tone: "error", text: "Please enter a valid positive number for height and weight." }
      : result.status === "incomplete"
      ? { tone: "calm", text: "Fill in both height and weight — your BMI appears the moment they're valid." }
      : { tone: "calm", text: "Updating live as you type, rounded to one decimal place." };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6" style={{ color: "var(--brand-fg)", fontFamily: brand.fontBody }}>
      <style>{`
        @keyframes bmiRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes bmiGlow { 0%,100% { opacity: .55; } 50% { opacity: .9; } }
        .bmi-rise { animation: bmiRise .35s ease-out both; }
        .bmi-glow { animation: bmiGlow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bmi-rise, .bmi-glow { animation: none !important; }
        }
      `}</style>

      <h1 data-wf="b-0-0" className="text-4xl font-extrabold tracking-tight" style={{ fontFamily: brand.fontHeading }}>
        {SCREEN}
      </h1>

      <p data-wf="b-1-0" className="max-w-[65ch] text-base leading-relaxed" style={{ color: "var(--brand-fg-muted)" }}>
        Enter your height and weight to see your Body Mass Index instantly. Nothing is saved or sent to a server.
      </p>

      <section data-wf="b-2-0" aria-labelledby="units-heading" className="space-y-3">
        <h2 id="units-heading" className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-fg-muted)" }}>
          Units
        </h2>
        <div role="group" aria-labelledby="units-heading" className="flex flex-wrap gap-2">
          {UNITS.map((u) => (
            <button
              key={u.key}
              data-wf={u.wf}
              type="button"
              aria-pressed={unit === u.key}
              onClick={() => switchUnit(u.key)}
              className={`flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-shadow ${ringed}`}
              style={
                unit === u.key
                  ? {
                      background: `linear-gradient(90deg, ${brand.primaryColor}, ${brand.accentColor})`,
                      color: "#06142b",
                      boxShadow: `0 0 24px ${mix(brand.primaryColor, 70)}`,
                      "--tw-ring-color": brand.accentColor,
                      "--tw-ring-offset-color": brand.backgroundColor,
                    }
                  : { ...field, borderRadius: 9999 }
              }
            >
              {unit === u.key ? <Check className="h-4 w-4" aria-hidden /> : null}
              {u.label}
            </button>
          ))}
        </div>
      </section>

      <section data-wf="b-3-0" aria-labelledby="measurements-heading" className="p-6 backdrop-blur-xl" style={{ ...glass, boxShadow: "0 30px 70px -35px rgba(0,0,0,0.8)" }}>
        <h2 id="measurements-heading" className="text-xl font-extrabold" style={{ fontFamily: brand.fontHeading }}>
          Your measurements
        </h2>
        <form className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} noValidate>
          {unit === "metric" ? (
            <div>
              <Label htmlFor="height-cm" className="text-sm font-bold">Height (cm)</Label>
              <input
                id="height-cm"
                data-wf="i-3-0-0"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={cm}
                onChange={(e) => setCm(e.target.value)}
                placeholder="e.g. 175"
                aria-invalid={result.badHeight || undefined}
                aria-describedby="entry-notice"
                className={`mt-2 h-12 w-full px-4 text-base tabular-nums placeholder:opacity-50 ${ringed}`}
                style={{ ...field, border: `1px solid ${result.badHeight ? mix(brand.accentColor, 70) : "rgba(255,255,255,0.12)"}` }}
              />
            </div>
          ) : (
            <fieldset className="min-w-0">
              <legend className="text-sm font-bold">Height (ft / in)</legend>
              <div className="mt-2 flex gap-3">
                <div className="min-w-0 flex-1">
                  <Label htmlFor="height-ft" className="sr-only">Height, feet</Label>
                  <input
                    id="height-ft"
                    data-wf="i-3-0-0"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                    placeholder="e.g. 5"
                    aria-invalid={result.badHeight || undefined}
                    aria-describedby="entry-notice height-ft-unit"
                    className={`h-12 w-full px-4 text-base tabular-nums placeholder:opacity-50 ${ringed}`}
                    style={{ ...field, border: `1px solid ${result.badHeight ? mix(brand.accentColor, 70) : "rgba(255,255,255,0.12)"}` }}
                  />
                  <span id="height-ft-unit" className="mt-1 block text-xs" style={{ color: "var(--brand-fg-muted)" }}>feet</span>
                </div>
                <div className="min-w-0 flex-1">
                  <Label htmlFor="height-in" className="sr-only">Height, inches</Label>
                  <input
                    id="height-in"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                    placeholder="e.g. 9"
                    aria-invalid={result.badHeight || undefined}
                    aria-describedby="entry-notice height-in-unit"
                    className={`h-12 w-full px-4 text-base tabular-nums placeholder:opacity-50 ${ringed}`}
                    style={{ ...field, border: `1px solid ${result.badHeight ? mix(brand.accentColor, 70) : "rgba(255,255,255,0.12)"}` }}
                  />
                  <span id="height-in-unit" className="mt-1 block text-xs" style={{ color: "var(--brand-fg-muted)" }}>inches (0–11)</span>
                </div>
              </div>
            </fieldset>
          )}

          <div>
            <Label htmlFor="weight-field" className="text-sm font-bold">
              {unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
            </Label>
            <input
              id="weight-field"
              data-wf="i-3-0-1"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={unit === "metric" ? kg : lbs}
              onChange={(e) => (unit === "metric" ? setKg(e.target.value) : setLbs(e.target.value))}
              placeholder={unit === "metric" ? "e.g. 70.5" : "e.g. 155.4"}
              aria-invalid={result.badWeight || undefined}
              aria-describedby="entry-notice"
              className={`mt-2 h-12 w-full px-4 text-base tabular-nums placeholder:opacity-50 ${ringed}`}
              style={{ ...field, border: `1px solid ${result.badWeight ? mix(brand.accentColor, 70) : "rgba(255,255,255,0.12)"}` }}
            />
          </div>
        </form>
      </section>

      <p
        data-wf="b-4-0"
        id="entry-notice"
        role={notice.tone === "error" ? "alert" : undefined}
        className="flex items-start gap-2 px-1 text-sm"
        style={{ color: notice.tone === "error" ? brand.accentColor : "var(--brand-fg-muted)" }}
      >
        {notice.tone === "error" ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> : null}
        <span>{notice.text}</span>
      </p>

      <section
        data-wf="b-5-0"
        aria-labelledby="result-heading"
        aria-live="polite"
        className="relative overflow-hidden p-6 backdrop-blur-xl sm:p-8"
        style={{ ...glass, boxShadow: "0 30px 70px -35px rgba(0,0,0,0.8)" }}
      >
        <div
          aria-hidden
          className="bmi-glow absolute -right-10 -top-16 h-56 w-56 rounded-full blur-[70px]"
          style={{ backgroundColor: mix(bmi === null ? brand.primaryColor : brand.accentColor, 55) }}
        />
        <h2 id="result-heading" className="relative text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-fg-muted)" }}>
          Your BMI
        </h2>

        {bmi !== null ? (
          <div key={`${bmi}-${band.key}`} className="bmi-rise relative">
            <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-3">
              <span
                className="text-6xl font-extrabold leading-none tabular-nums sm:text-7xl"
                style={{
                  backgroundImage: `linear-gradient(100deg, ${brand.primaryColor}, ${brand.accentColor})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {bmi.toFixed(1)}
              </span>
              <span className="rounded-full px-4 py-2 text-sm font-bold" style={{ backgroundColor: mix(brand.accentColor, 26), color: "#fff", border: `1px solid ${mix(brand.accentColor, 45)}` }}>
                {band.key}
              </span>
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--brand-fg-muted)" }}>
              WHO adult band: {band.key}, {band.range}. Calculated in your browser from{" "}
              {unit === "metric" ? `${cm} cm and ${kg} kg` : `${feet} ft ${inches === "" ? 0 : inches} in and ${lbs} lbs`}.
            </p>

            <div className="relative mt-6">
              <div className="h-3 w-full overflow-hidden rounded-full" style={{ background: `linear-gradient(90deg, ${mix(brand.primaryColor, 55)}, ${mix(brand.primaryColor, 85)} 35%, ${mix(brand.accentColor, 70)} 70%, ${brand.accentColor})` }} />
              <span
                aria-hidden
                className="absolute top-1/2 h-6 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left] duration-300"
                style={{ left: `${markerPct}%`, backgroundColor: "#fff", boxShadow: `0 0 16px ${brand.accentColor}` }}
              />
              <div className="mt-2 flex justify-between text-[11px] font-bold tabular-nums" style={{ color: "var(--brand-fg-muted)" }}>
                <span>14</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>42</span>
              </div>
            </div>
          </div>
        ) : result.status === "invalid" ? (
          <div className="bmi-rise relative mt-3 flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 shrink-0" aria-hidden style={{ color: brand.accentColor }} />
            <div>
              <p className="text-xl font-extrabold" style={{ fontFamily: brand.fontHeading }}>Can't calculate that yet</p>
              <p className="mt-1 text-sm" style={{ color: "var(--brand-fg-muted)" }}>
                Height and weight must be positive numbers. Your entries are still in the fields above — just correct the flagged one.
              </p>
            </div>
          </div>
        ) : (
          <div className="bmi-rise relative mt-3">
            <p className="text-5xl font-extrabold leading-none tabular-nums" style={{ color: mix("#ffffff", 22) }}>--.-</p>
            <p className="mt-3 text-sm" style={{ color: "var(--brand-fg-muted)" }}>
              Your BMI and WHO category will appear here as soon as both measurements are filled in.
            </p>
          </div>
        )}
      </section>

      <section data-wf="b-6-0" aria-labelledby="bands-heading" className="overflow-hidden backdrop-blur-xl" style={glass}>
        <h2 id="bands-heading" className="px-6 pt-6 text-xl font-extrabold" style={{ fontFamily: brand.fontHeading }}>
          WHO adult BMI categories
        </h2>
        <p className="px-6 pb-4 pt-1 text-sm" style={{ color: "var(--brand-fg-muted)" }}>
          The four standard adult bands. Children and BMI-for-age use different charts.
        </p>
        <Table className="w-full text-sm tabular-nums">
          <THead>
            <TR>
              <TH data-wf="i-6-0-0" scope="col" className="px-6 py-3 text-left">Category</TH>
              <TH data-wf="i-6-0-1" scope="col" className="px-6 py-3 text-left">BMI range</TH>
            </TR>
          </THead>
          <TBody>
            {BANDS.map((b) => {
              const active = band && band.key === b.key;
              return (
                <TR
                  key={b.key}
                  className="transition-colors"
                  style={{
                    backgroundColor: active ? mix(brand.accentColor, 16) : "transparent",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <TD className="px-6 py-3 font-bold">
                    <span className="flex flex-wrap items-center gap-2">
                      {b.key}
                      {active ? (
                        <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ backgroundColor: mix(brand.accentColor, 35), color: "#fff" }}>
                          <CheckCircle className="h-3 w-3" aria-hidden />
                          Your result
                        </span>
                      ) : null}
                    </span>
                  </TD>
                  <TD className="px-6 py-3" style={{ color: "var(--brand-fg-muted)" }}>{b.range}</TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </section>

      <p data-wf="b-7-0" className="max-w-[70ch] px-1 pb-2 text-sm leading-relaxed" style={{ color: "var(--brand-fg-muted)" }}>
        <span className="font-bold" style={{ color: "var(--brand-fg)" }}>Disclaimer:</span> BMI is a general screening
        indicator for adults only and is not medical advice. It does not apply to children or BMI-for-age. Speak to a
        healthcare professional about your health.
      </p>
    </div>
  );
}
