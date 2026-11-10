# Deploying soobinlim.com

Static files, no build step. Hosted on **GitHub Pages** from the `main` branch, repo root.
Every push to `main` redeploys automatically (takes about a minute).

## GitHub side

- Repo: `suelim04/soobinlim.com`. It must be **public** for Pages on a free plan.
- Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`
- Custom domain: `soobinlim.com` (the `CNAME` file in this repo holds it; don't delete it)
- **Enforce HTTPS**: on. This becomes available once DNS resolves and GitHub has issued the cert.

## DNS at Network Solutions

The domain is registered and its DNS is hosted at Network Solutions (`ns41/ns42.worldnic.com`).

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `suelim04.github.io` |

Remove anything else on `@` or `www`. The old host's records were:
`@` A `162.159.143.30` / `172.66.3.26`, `www` A `208.91.197.27` (Network Solutions
parking), and a `TXT` at `_cf-custom-hostname`.

Optional hardening: verify the domain under GitHub → Settings (account) → Pages →
*Add a domain*. This adds a `TXT` at `_github-pages-challenge-suelim04`, so no other
GitHub account can claim soobinlim.com.

## Check it

```
dig +short soobinlim.com          # expect the four 185.199.x.153 addresses
dig +short www.soobinlim.com      # expect suelim04.github.io. then those IPs
```

## Local preview

```
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/. It matches production exactly, since nothing is built.
