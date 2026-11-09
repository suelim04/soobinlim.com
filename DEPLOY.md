# Deploying soobinlim.com

Static files, no build step. Host: Cloudflare Pages, connected to this repo.

## 1. Create the Pages project

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

Authorize the Cloudflare GitHub app and grant it access to `suelim04/soobinlim.com`
(private repos are not included by default — pick it explicitly under *Only select
repositories*). Then:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | `/` |

Deploy. You get a `<project>.pages.dev` URL — confirm the site looks right there
before touching DNS.

## 2. Point the domain at it

DNS for soobinlim.com currently lives at **Network Solutions** (`ns41/ns42.worldnic.com`),
not Cloudflare. The apex (`soobinlim.com`) cannot be a CNAME there, so pick one:

### Option A — move the zone to Cloudflare (recommended)

1. Cloudflare dashboard → **Add a domain** → `soobinlim.com`. Let it import the
   existing records.
2. Copy the two Cloudflare nameservers it gives you.
3. At Network Solutions, replace `ns41.worldnic.com` / `ns42.worldnic.com` with those.
   Propagation is usually under an hour.
4. Back in the Pages project → **Custom domains** → add `soobinlim.com` **and**
   `www.soobinlim.com`. Cloudflare writes the records itself; the apex works via
   CNAME flattening.

### Option B — leave DNS at Network Solutions

Only `www` can point at Pages:

- `www` → CNAME → `<project>.pages.dev`
- apex → Network Solutions **web forwarding** → redirect to `https://www.soobinlim.com`

Weaker setup (the redirect is a Network Solutions service, and the apex gets no
Cloudflare TLS of its own). Option A is better.

## 3. Clean up the old deployment

The domain was previously served by another platform through **Cloudflare for SaaS**.
Leftovers to remove, or they will fight the new setup:

- Apex `A` records → `162.159.143.30`, `172.66.3.26` (the old platform's Cloudflare IPs)
- `www` `A` record → `208.91.197.27` (Network Solutions parking; serves a self-signed
  cert, so `https://www.soobinlim.com` is currently broken)
- `TXT` at `_cf-custom-hostname.soobinlim.com` → `2f14c192-74e1-48fe-9e4d-434ef80e4568`

Also remove `soobinlim.com` from that old platform's dashboard, so it releases the
custom hostname. Until it does, Cloudflare may refuse to validate the domain for Pages.

## Local preview

```
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/ — matches production exactly, since nothing is built.
