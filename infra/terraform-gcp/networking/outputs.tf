output "load_balancer" {
  value = google_compute_address.ip_address.address
}

output "suffix" {
  value = var.suffix
}

output "cert_manager_kubernetes_service_account" {
  value = var.cert_manager_kubernetes_service_account
}

output "cert_manager_google_service_account" {
  value = google_service_account.cert_manager.email
}

output "cert_manager_namespace" {
  value = var.cert_manager_namespace
}

output "external_dns_kubernetes_service_account" {
  value = var.external_dns_kubernetes_service_account
}

output "external_dns_google_service_account" {
  value = google_service_account.external_dns.email
}

output "external_dns_namespace" {
  value = var.external_dns_namespace
}
