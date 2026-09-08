# @bos/vokabulare

Die Tabellen hinter den Auswahllisten der BOS-Erfassung — reine Daten plus die
Nachschlagefunktionen darauf.

Dieses Repository ist **kein eigenständiges Produkt**, sondern hängt als
git-Submodul unter `vendor/bos-vokabulare` in zwei Produkten:

- **einheitenerfassungsbogen** — PWA mit Capacitor und Electron, gebaut mit Vite
- **S1-Control v2** — Electron-Anwendung mit npm-Workspaces

Beide binden das Paket über `"@bos/vokabulare": "file:vendor/bos-vokabulare"` ein.

## Inhalt

| Modul | Was |
|---|---|
| `thw` | StAN-Vokabulare: Einheitstypen, Funktionen, Fahrzeugtypen, Funkruf-Kennwörter |
| `thw-funktionen-ergaenzung` | Funktionen jenseits der StAN (Taschenkarte) |
| `thw-funkrufnamen` | Kennwörter und Teile des Funkrufnamens |
| `thw-ov`, `thw-ov-regionalstruktur` | Ortsverbände, Geschäftsstellen, Landesverbände |
| `thw-stan-fahrzeuge`, `thw-stan-personal` | Sollausstattung je Teileinheit |
| `ebenen` | Hierarchie-Ebenen je Organisation |
| `sitzplaetze` | Sitzplätze je Fahrzeugtyp und die Bilanz gegen die Stärke |
| `dlrg-qualifikationen` | Ausbildungskennzahlen der DLRG |
| `berufe` | 3512 Berufsbezeichnungen (Bundesagentur für Arbeit) |

## Warum `@bos/eeb-format` peerDependency ist

Die Tabellen sprechen die Typen des Formats (`VokabularEintrag`,
`OrganisationsTyp`, `Fahrzeug`). Als gewöhnliche `dependency` läge das Format
ein zweites Mal im Baum, sobald ein Produkt es selbst einbindet — und
TypeScript sähe dann zwei verschiedene Typen gleichen Namens. Die
Fehlermeldung nennt zweimal denselben Namen, die Ursache steht in keinem
Stapelabzug. Deshalb: `peerDependency`, und das Produkt liefert die eine Kopie
(ADR-003, Nachtrag „Diamant auf eeb-format"). Zur Entwicklung hier ist das
Format zusätzlich als `devDependency` auf `file:../eeb-format` verdrahtet.

## Was hier bewusst NICHT liegt

- **`landesvorlagen.ts`** bleibt im Erfassungsbogen. Es liest die
  Beispielbögen über `import.meta.glob` ein — eine Vite-Eigenschaft, kein
  TypeScript —, und die Bögen selbst sind Produktinhalt.
- **`taktische-zeichen-symbole.ts`** liegt in `@bos/taktische-zeichen`, wo die
  Zuordnung dazu steht.

## Aufnahmeregeln (ADR-003)

1. Aufnahme nur, wenn beide Produkte den Baustein aufrufen.
2. Keine `node:`-, DOM- oder React-Importe; geprüft per ESLint und durch Testlauf unter `node` und `jsdom`.
3. Keine Rückimporte aus `@s1/*` oder aus der Erfassungsbogen-App.
4. Änderungen additiv; Schema-Abwärtskompatibilität bleibt Pflicht.
5. Bundle-Budget im CI von erfassungsbogen.app; der Kern darf die PWA nicht schwerer machen.
6. Gepinnte Submodul-Commits; kein automatisches Folgen von `main`.

Regel 2 und 3 sind maschinell hinterlegt: `eslint.config.mjs` verbietet die
Importe, `tsconfig.json` lässt `"DOM"` aus `lib` und setzt `"types": []`,
`vitest.config.ts` fährt dieselben Testdateien unter `node` und unter `jsdom`.

## Lokal bauen und prüfen

Voraussetzung: Node 24 (siehe `.nvmrc`), und `eeb-format` als Nachbarordner.

```bash
npm install
npm run build
npm run typecheck
npm run lint
npm test
```

Bleibt `node_modules/@bos/eeb-format/dist` leer, hat npm dessen `prepare`-Skript
nicht ausgeführt. Dann `npm --prefix ../eeb-format run build`.

## Lizenz

EUPL-1.2
