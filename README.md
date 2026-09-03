# Kōrero Learning Suite website

A standalone, bilingual public website for the Kōrero EFL Learning Suite. It is deliberately dependency-free: GitHub Pages can serve it without a build step.

## Add the supplied images

Keep these paths and file names exactly as written. The website shows a styled placeholder whenever a file is absent, so it remains publishable while assets are being prepared.

`assets/images/korero-logo.jpg` is already included from the supplied Let’s Kōrero logo and is used in the navigation and footer. The site palette is derived from that logo: deep navy, muted green, kōwhai orange, and warm cream.

| File | Recommended minimum | Used in |
| --- | --- | --- |
| `assets/images/student_tammy.jpeg` | 1250 × 1007 | Hero |
| `assets/images/teacher.jpeg` | 1226 × 729 | Teacher view |
| `assets/images/student_rex.jpeg` | 1464 × 1167 | Student view |
| `assets/images/semantic_tow.jpg` | 3020 × 1714 | Researcher view |
| `assets/images/research_apclc.jpg` | 668 × 573 | Research section |
| `assets/images/steve_profile.png` | 766 × 1150 | Contact portrait |
| `assets/images/apps/tammy.jpg` | 1000 × 1000 | TAMMY card |
| `assets/images/apps/penny.jpg` | 1000 × 1000 | Penny card |
| `assets/images/apps/rex.jpg` | 1000 × 1000 | Revision Rex card |
| `assets/images/apps/gretel.jpg` | 1000 × 1000 | Grammar Gretel card |
| `assets/images/apps/scotty.jpg` | 1000 × 1000 | Scotty Squirrel card |
| `assets/images/apps/hippo.jpg` | 1000 × 1000 | Happyou Hippo card |
| `assets/images/apps/phoebe.jpg` | 1000 × 1000 | Fluent Phoebe card |
| `assets/images/apps/sheep.jpg` | 1000 × 1000 | Situation Sheep card |
| `assets/images/apps/archie_sleeping.jpg` | 1000 × 1000 | ARCHIE card |
| `assets/images/apps/polly.jpg` | 1000 × 1000 | Polly Porpoise card |
| `assets/images/apps/sevi.jpg` | 1000 × 1000 | Sevi Serval card |
| `assets/images/apps/nexus.jpg` | 1000 × 1000 | Nexus card |

Use licensed photos or images with appropriate consent. Every supplied people image should depict adult participants unless you have the required permission for younger people.

## Edit copy or add a language

All visible English and Japanese text is in `assets/content.js`. Add another top-level language object following the `en` and `ja` structure, then add an option to the language toggle in `assets/site.js`.

## Preview locally

From this folder, run a static web server, for example:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Publish to GitHub Pages

1. Create a new GitHub repository and commit the contents of this folder at its root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. GitHub will display the public `github.io` address when deployment is complete.

For a custom domain, configure it in the same Pages screen after the first deployment.
