// ----------------------------------------------------
// Required Variables
// ----------------------------------------------------
variable "gcp_project" {
  description = "The name of the gcp_project"
}

variable "host_name" {
  description = "The domain name e.g. demo"
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
