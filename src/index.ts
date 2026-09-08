/**
 * `@bos/vokabulare` — die Tabellen hinter den Auswahllisten des
 * Erfassungsbogens.
 *
 * Reine Daten plus die Nachschlagefunktionen darauf: THW-StAN (Einheitstypen,
 * Funktionen, Fahrzeugtypen), Ortsverbände samt Regionalstruktur,
 * Funkrufnamen-Kennwörter, Hierarchie-Ebenen je Organisation, Sitzplätze je
 * Fahrzeugtyp, DLRG-Qualifikationen und Berufsbezeichnungen.
 *
 * Hängt an `@bos/eeb-format` — die Tabellen sprechen dessen Typen
 * (`VokabularEintrag`, `OrganisationsTyp`, `Fahrzeug`). Und zwar als
 * `peerDependency`: das Format muss im Baum genau einmal liegen, sonst sieht
 * TypeScript zwei verschiedene Typen gleichen Namens (ADR-003, Nachtrag
 * „Diamant auf eeb-format").
 */

export * from "./thw.js";
export * from "./thw-funkrufnamen.js";
export * from "./thw-ov.js";
export * from "./thw-ov-regionalstruktur.js";
export * from "./thw-stan-fahrzeuge.js";
export * from "./thw-stan-personal.js";
export * from "./ebenen.js";
export * from "./sitzplaetze.js";
export * from "./dlrg-qualifikationen.js";
export * from "./berufe.js";
