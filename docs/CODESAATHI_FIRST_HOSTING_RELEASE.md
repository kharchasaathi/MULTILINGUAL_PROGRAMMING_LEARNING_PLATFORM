# CodeSaathi — first Firebase Hosting release

## Hosting target
- Firebase project: `multilingual-learning-52e24`
- Expected default URL: https://multilingual-learning-52e24.web.app
- Firebase Hosting public directory: `public`

## Automated deployment
The workflow `.github/workflows/firebase-hosting.yml` deploys this branch when it receives a push.

Before the first deployment, create a dedicated Google Cloud service account for deployment and grant only the Firebase Hosting deployment permissions required by the Firebase Hosting GitHub Action. Generate a JSON key only if your organization accepts long-lived service-account keys. Store the complete JSON value in the GitHub repository secret named:

`FIREBASE_SERVICE_ACCOUNT`

Never commit the JSON key to this repository or paste it into chat. Do not reuse the Firebase Admin SDK runtime service account for deployment.

## Verify the release
1. Open GitHub → Actions → Deploy CodeSaathi to Firebase Hosting.
2. Confirm the latest run completes successfully.
3. Open https://multilingual-learning-52e24.web.app and check the home page, course dialogs, editor preview and mobile layout.
4. Confirm the browser console has no uncaught errors and that `/manifest.webmanifest`, `/sw.js` and `/icon.svg` return successfully.

## Important product limitation
The current release is a static learning site. Lesson progress is stored in the learner's browser. No student accounts, verified ₹1 payment, server-side access control, cross-device progress sync, admin CMS or payment webhook is included yet. Do not collect payments or promise paid access until a trusted payment flow and server-side verification are implemented.
