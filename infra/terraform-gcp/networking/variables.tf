// ----------------------------------------------------
// Required Variables
// ----------------------------------------------------
variable "gcp_project" {
  description = "The name of the gcp_project"
}

variable "name" {
  description = "The system name e.g. demo"
}

variable "suffix" {
  description = "The domain name suffix e.g. g.bleepbleep.org.uk"
}

variable "cert_manager_google_service_account" {
  description = "The google service account to use for cert-manager"
  default = "certmanager"
}

variable "cert_manager_namespace" {
  description = "The namespace to use for cert_manager"
  default = "cert-manager"
}

variable "cert_manager_kubernetes_service_account" {
  description = "The kubernetes service account to use for cert-manager"
  default = "cert-manager"
}

variable "external_dns_google_service_account" {
  description = "The google service account to use for external-dns"
  default = "externaldns"
}

variable "external_dns_namespace" {
  description = "The namespace to use for external-dns"
  default = "external-dns"
}

variable "external_dns_kubernetes_service_account" {
  description = "The kubernetes service account to use for external-dns"
  default = "external-dns"
}
