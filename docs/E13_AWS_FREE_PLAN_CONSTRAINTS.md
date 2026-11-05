# E13 AWS Free Plan Constraints and Validation Decision

**Recorded:** 2026-11-05  
**Status:** E13 remains IN PROGRESS; no production-readiness claim.  
**Purpose:** Record the AWS account constraints observed during E13 cloud-validation planning without changing the approved production-region decision.

## 1. Observed account state

The owner-provided AWS Settings screenshots show:
- Project: `Index Zero`, status Active.
- Account plan: Free.
- Remaining Free Plan duration: 182 days (displayed expiry: 2027-05-05).
- Remaining credits: USD 100.00.
- Project region: Asia Pacific (Sydney), `ap-southeast-2`.

Do not copy account IDs, organization IDs, or IAM Identity Center ARNs into this repository.

## 2. AWS service and feature constraints

AWS's current supported-services documentation lists Amazon S3 and AWS Key Management Service (KMS) among services included in the Free Tier of the new AWS experience. The same document explicitly states that Multi-Region and cross-Region features are not supported for services under this Free Tier experience.

Consequences for E13:
- S3 and KMS are eligible service families, but this does not prove that every feature, API action, IAM permission, or bucket configuration is enabled for this account.
- The account's assigned region is Sydney. The previously selected production primary region remains Mumbai (`ap-south-1`); it has not been changed or approved as Sydney.
- Cross-Region replication and a second-region DR copy cannot be validated under the current Free Plan project restrictions.
- Console visibility of S3/KMS pages is not evidence that resource creation, Object Lock, SSE-KMS, or the required API operations will succeed.

## 3. Cost controls

AWS KMS pricing currently lists customer-managed KMS keys at USD 1 per key per month (prorated hourly), plus applicable API request charges; the KMS free tier includes 20,000 eligible requests per month. Therefore, creating a customer-managed key must be treated as a cost-bearing action, not described as free merely because the account has USD 100 credits.

No bucket, KMS key, replication rule, or paid-plan upgrade is authorized by this document. Before creating any resource, review the current account-plan behavior, estimated monthly charges, credit application, and service-specific pricing. Do not infer that credits eliminate all costs or that no direct payment can occur after a plan change.

## 4. Approved production decision remains unchanged

- Intended production primary: Mumbai (`ap-south-1`).
- Intended off-site backup: AWS S3 with versioning, public-access blocking, SSE-KMS and controlled retention.
- Intended DR: separately administered destination account/region with replication and immutable-copy controls, subject to tested Object Lock/pgBackRest compatibility.
- Object Lock retention duration and mode remain unapproved; 30 days is only a prior example, not a decision.
- Do not enable Object Lock default retention on the active pgBackRest repository until backup, WAL archive, prune/expire and restore behavior are validated in a disposable bucket.

Sydney may be used only as a clearly labelled temporary test environment if the owner explicitly accepts that it is not the approved production region and approves the possible resource costs. Such a test cannot satisfy cross-Region DR acceptance.

## 5. Remaining E13 acceptance gates

1. Owner-approved AWS account/plan and region strategy that permits the intended production and DR topology.
2. Reviewed cost estimate and explicit approval for S3 storage/requests, KMS key and API use, Object Lock, monitoring, and replication.
3. Provisioned isolated primary and DR buckets with versioning, Block Public Access, encryption, IAM policies, and retention controls.
4. Successful live encrypted logical-backup upload and remote integrity/version/retention verification.
5. Successful pgBackRest stanza bootstrap, base backup, continuous WAL archive and archive checks.
6. Successful timestamp-based PITR restore in an isolated disposable recovery environment.
7. Tested cross-account/region replication and immutable DR copy; test replica readability and recovery.
8. Tested age identity, pgBackRest passphrase, KMS authorization, escrow, rotation and break-glass recovery.
9. Installed schedules, freshness/archive/replication/KMS alerts and verified alert delivery/escalation.
10. Implemented and exercised real E11 deletion/legal-hold replay and E12 audit-verification hooks.
11. Owner-approved numeric RPO/RTO, measured in repeated restore drills, with database/privacy/audit/security/business approvals.

Until these gates are evidenced, E13 stays IN PROGRESS and E14 stays BLOCKED.

## 6. Authoritative references

- AWS supported services for the new Free Tier experience: https://docs.aws.amazon.com/accounts/latest/reference/supported-services-sign-up-new.html
- AWS KMS pricing: https://aws.amazon.com/kms/pricing/
- AWS Free Tier plan details: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html
