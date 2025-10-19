# 📌 PHASE 1: USER STORY PRESENTATION - JNF-2

## PRESENTING USER STORY FOR ACTIONING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**[DATA FETCHED FROM JIRA VIA MCP - LIVE DATA]**

| Field | Value |
|-------|-------|
| **Ticket** | JNF-2 |
| **Title** | Monorepo bootstrap - pnpm + Turborepo |
| **Type** | Story |
| **Status** | To Do |
| **Priority** | Medium |
| **Epic** | JNF-1: Foundation & Monorepo - repo bootstrap, CI, TS, lint |
| **Project** | JNF (JamesNDISFree) |
| **Created** | 2025-10-18 18:03:47 (Sydney Time) |
| **Created By** | James BusinessBot |
| **Assignee** | Unassigned |
| **Story Points** | Not specified |

---

## Description (from JIRA)

**User Story:**
```
As a Developer, I want a working monorepo scaffold so that all packages can be 
developed, built and tested consistently.
```

**Solution Notes:**
```
Follow `IMPLEMENTATION-INDEX.md` and `ultimate-detailed-implementation.md` monorepo 
examples. Add sample package structure and CI job that runs lint and type-check.
```

**Source Documentation:**
- `Documentation/IMPLEMENTATION-INDEX.md` (Monorepo, Phase 1)
- `Documentation/ultimate-detailed-implementation.md` (pnpm/turbo examples)

---

## Acceptance Criteria

✅ **Criterion 1:** `pnpm-workspace.yaml` created.  
✅ **Criterion 2:** `turbo.json` created with basic tasks (build/test/lint).  
✅ **Criterion 3:** `pnpm install` and `pnpm build` succeed locally.

---

## Existing Comments (from JIRA)

### Comment 1: Solution Notes (Oct 19, 08:27:03)
**By:** James BusinessBot

**Key Points:**
- Use pnpm workspaces for dependency management across the monorepo
- Configure Turborepo for task orchestration (build, test, lint)
- Set up basic package structure:
  - `apps/web` (Next.js app)
  - `packages/ui` (shared components)
  - `packages/database` (Prisma client)
  - `packages/config` (shared configs)
- Ensure CI pipeline runs `pnpm install` and `turbo build` successfully
- Follow monorepo examples in `ultimate-detailed-implementation.md`

**Considerations:**
- Align with IMPLEMENTATION-INDEX.md Phase 1 guidelines
- Test locally with `pnpm install` and `pnpm build`
- Ensure all packages have proper package.json
- Consider adding root-level script for `pnpm dev`

---

### Comment 2: Monorepo bootstrap — key considerations (Oct 19, 08:33:30)
**By:** James BusinessBot

**Comprehensive Guidance on 16 Topics:**

#### 1) Toolchain consistency
- Pin Node & pnpm via `"packageManager": "pnpm@X.Y.Z"` and `engines.node`
- Enable Corepack in CI
- Commit `pnpm-lock.yaml`

#### 2) Workspace layout & naming
- Use folders: `apps/*` (deployables), `packages/*` (libraries), `tooling/*` (configs)
- Use scoped names: `@org/ui`, `@org/config`
- Consistent `main/module/types` fields

#### 3) pnpm specifics
- Default isolated symlinks are great
- Set `public-hoist-pattern` for known offenders (eslint, typescript)
- Use workspace protocol: `"@org/ui": "workspace:*"`
- Centralize via root `pnpm.overrides`

#### 4) Turborepo pipeline design
- Define tasks: `build`, `lint`, `typecheck`, `test`, `dev`
- Use `outputs` in `turbo.json` for caching
- Turn on remote cache (Vercel/S3/GCS/Redis) for 5–10× CI speedups
- Adopt `--filter` patterns in scripts
- Standardize `dist/` across libs

#### 5) TypeScript architecture
- `composite: true` + references for each pkg
- Root `tsconfig.base.json` with shared `paths`
- Use `bundler` (TS5) or `node16` consistently
- Put global types in `packages/tsconfig` or `@org/types`
- Use `madge` or `depcruise` for cycle detection

#### 6) Bundling & interop
- Use `tsup`/`unbuild` for libs → cjs + esm + d.ts
- Mark `react/jsx-runtime` as external
- For Next.js: Use `transpilePackages`, avoid server-only imports in client components

#### 7) Testing strategy
- Unit: Vitest (fast, ESM-friendly)
- E2E: Playwright in apps/web
- Single root command aggregates reports

#### 8) Linting & formatting
- Single source of truth: `packages/config/eslint-config`, `packages/config/tsconfig`, `packages/config/prettier`
- Pre-commit: `lint-staged` + `husky`/`lefthook`
- Enforce import order with `eslint-plugin-import` + `simple-import-sort`

#### 9) CI/CD (GitHub Actions)
- Cache: `actions/setup-node` + Corepack + pnpm store cache + Turborepo remote cache
- Matrix: Run selective pipelines using `turbo run … --filter`
- Build graph: `lint` ⇒ `typecheck` ⇒ `test` ⇒ `build`
- Use `turbo prune` for Docker deployments

#### 10) Env & secrets
- `.env.example` at root; apps own runtime `.env.local`
- Zod/similar for runtime env validation
- Centralize via GitHub Secrets/Actions vars

#### 11) Release, versioning & publishing
- Mark libs `"private": true` until publish is intentional
- Use Changesets for automatic semver + changelogs
- Conventional Commits + protected `main` branch

#### 12) Code ownership & governance
- CODEOWNERS file per folder
- Trunk-based or `main` + short-lived feature branches
- Record decisions in `/docs/adr`

#### 13) Developer experience
- Generators: Plop/Nx-style scaffolds (`pnpm gen:package my-lib`)
- Common scripts: `dev`, `build`, `clean`, `rebuild`, `fix`, `lint`, `typecheck`, `test`
- Editor configs: `.editorconfig`, VSCode workspace with recommended extensions

#### 14) Data & schema (if using Prisma)
- Keep Prisma client in `packages/database`
- Run migrations from app that owns the DB
- Guard against `prisma generate` path issues under pnpm (postinstall at root)

#### 15) Observability & security
- Supply chain: Renovate/Dependabot enabled
- License policy: OSS allowlist (MIT/Apache)
- Telemetry: Minimal logger shared package

#### 16) Performance & cache hygiene
- Declare exact outputs in Turborepo
- Prefer `devDependencies` in libs
- Use remote cache + `turbo run build --filter=...` for changed scope only

---

## Minimal Baseline Files (provided in comment)

The comment includes working examples:
- `pnpm-workspace.yaml` template
- `turbo.json` template
- Root `package.json` essentials
- Root `.npmrc` typical

---

## Definition of Done (from comment)

✅ `pnpm i` and `pnpm build` succeed cleanly on fresh clone  
✅ `turbo run lint typecheck test build` green in CI with remote cache  
✅ Apps run locally (`pnpm dev`) and import internal packages  
✅ Storybook (if used) runs against `@org/ui`  
✅ One PR proving "change in packages/ui → rebuilds only dependents"  

---

## Common Pitfalls to Avoid (from comment)

❌ Installing a peer (React) inside a library  
❌ Missing `transpilePackages` for Next + pnpm  
❌ Not declaring `outputs` in Turbo  
❌ Publishing ESM-only libs without `types` or `exports`  
❌ Multiple Prisma clients scattered across packages  
❌ Relying on `postinstall` in every package  

---

## Parent Epic

**JNF-1: Foundation & Monorepo - repo bootstrap, CI, TS, lint**
- Status: To Do
- Priority: Medium
- This is a subtask of the Foundation epic

---

## Related Documentation (from your workspace)

**References in the story:**
- `Documentation/IMPLEMENTATION-INDEX.md` → Monorepo Phase 1
- `Documentation/ultimate-detailed-implementation.md` → pnpm/turbo examples
- `Documentation/COMPLETE-SUMMARY.md` → Architecture patterns
- `Documentation/ultimate-implementation-part2.md` → Service examples

---

## 🔗 MCP Status

✅ **Data successfully fetched from JIRA**
- Ticket ID: JNF-2
- Comments: 2 detailed comments loaded
- All acceptance criteria extracted
- Related documentation identified

---

## ✅ Confirmation Question

**Do you want to proceed with actioning this user story?**

**Type:** YES or NO

- **YES** → Proceed to Phase 2: Branch Creation
- **NO** → Request different story via: "I want to action user story [JNF-XX]"

---
