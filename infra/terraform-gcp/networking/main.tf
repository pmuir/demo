resource "google_project_service" "dns" {
  service            = "dns.googleapis.com"
  disable_on_destroy = false
}


resource "google_project_service" "dns_api" {
  provider           = google
  project            = var.gcp_project
  service            = "dns.googleapis.com"
  disable_on_destroy = false
}

resource "google_compute_address" "ip_address" {
  name = "${var.name}-ip-address"
}

resource "google_dns_managed_zone" "managed_zone" {
  name        = "${var.name}-managed-zone"
  dns_name    = "${var.suffix}."
  description = "CBP Managed DNS Zone"
}

resource "google_dns_record_set" "caa" {
  name = "${var.suffix}."
  managed_zone = google_dns_managed_zone.managed_zone.name
  type = "CAA"
  ttl = 300
  rrdatas = ["0 issue \"letsencrypt.org\"", "0 issue \"pki.goog\""]
}

resource "google_service_account" "cert_manager" {
  account_id = var.cert_manager_google_service_account
  display_name = "Cert Manager"
}

resource "google_service_account_iam_member" "cert_manager" {
  provider = google-beta
  role         = "roles/iam.workloadIdentityUser"
  service_account_id = google_service_account.cert_manager.name
  member = "serviceAccount:${var.gcp_project}.svc.id.goog[${var.cert_manager_namespace}/${var.cert_manager_kubernetes_service_account}]"
}

resource "google_project_iam_member" "cert_manager" {
  member = "serviceAccount:${google_service_account.cert_manager.email}"
  role = "roles/dns.admin"
}

resource "google_service_account" "external_dns" {
  account_id = var.external_dns_google_service_account
  display_name = "External DNS"
}

resource "google_service_account_iam_member" "external_dns" {
  provider = google-beta
  role         = "roles/iam.workloadIdentityUser"
  service_account_id = google_service_account.external_dns.name
  member = "serviceAccount:${var.gcp_project}.svc.id.goog[${var.external_dns_namespace}/${var.external_dns_kubernetes_service_account}]"
}

resource "google_project_iam_member" "external_dns" {
  member = "serviceAccount:${google_service_account.external_dns.email}"
  role = "roles/dns.admin"
}
