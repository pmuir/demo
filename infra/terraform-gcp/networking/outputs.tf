output "load_balancer" {
  value = google_compute_address.ip_address.address
}

output "fqdn" {
  value = trimsuffix(google_dns_record_set.platform.name, ".")
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