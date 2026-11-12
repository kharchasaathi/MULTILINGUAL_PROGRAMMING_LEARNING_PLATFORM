# CodeSaathi Hosting Setup

The static site is configured for Firebase Hosting using the existing Firebase project alias in the repository root.

## Why Firebase Hosting
- The project is currently on Firebase Spark according to the owner's console screenshots.
- Firebase Hosting supports static HTML/CSS/JS, custom domains and SSL; its no-cost tier currently includes 10 GB storage and up to 360 MB/day transfer. Usage beyond free quota may require billing.
- GitHub Pages is not selected for this paid learning business: GitHub's own policy says Pages is not intended as free hosting for sites primarily facilitating commercial transactions or commercial SaaS. The repository is also private and the linked GitHub plan is not confirmed to include private-repository Pages.

## Current config
- Public directory: `web/`
- Firebase project: `multilingual-learning-52e24`
- Hosting-only deployment command: `firebase deploy --only hosting`

## Owner action required before deployment
1. Open Firebase Console for project `multilingual-learning-52e24`.
2. Open **Hosting** and complete **Get started** to provision the default Hosting site. This is a static Hosting setup; do not select App Hosting, Functions, Cloud Run, Storage, or upgrade to Blaze for this task.
3. Confirm the site ID / default Hosting domain shown by Firebase.
4. Deploy from an authenticated environment with Firebase CLI after reviewing the files. Do not paste access tokens, service-account JSON, private keys or other secrets into chat.
5. In Firebase Hosting, add `codesaathi.com` as a custom domain. Follow the exact TXT and A/AAAA records shown by Firebase. Do not guess DNS values or delete existing GoDaddy records before Firebase provides its instructions.
6. Verify the TXT ownership record and wait for SSL provisioning before considering the custom domain live.

## Rollback
Firebase Hosting supports deployment rollback from its Hosting release history. Keep the previous release available until the new version is verified.

## Current limitations
- The current course content is starter content, not the complete curriculum promised for a full public launch.
- No user authentication, payment processing, ₹1 checkout, secure entitlement enforcement, remote progress sync, admin CMS or backend is implemented.
- Do not enable public paid enrolment until those release requirements are implemented and tested.
