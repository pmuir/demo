resource "google_service_account" "external_secrets" {
  account_id = var.external_secrets_google_service_account
  display_name = "External Secrets"
}

resource "google_service_account_iam_member" "external_secrets" {
  provider = google-beta
  role         = "roles/iam.workloadIdentityUser"
  service_account_id = google_service_account.external_secrets.name
  member = "serviceAccount:${var.gcp_project}.svc.id.goog[${var.external_secrets_namespace}/${var.external_secrets_kubernetes_service_account}]"
}
