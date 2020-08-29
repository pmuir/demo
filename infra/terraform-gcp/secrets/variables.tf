variable "gcp_project" {
  description = "The GCP project name"
}

variable "external_secrets_kubernetes_service_account" {
  description = "The kubernetes service account to use for external secrets"
}

variable "external_secrets_google_service_account" {
  description = "The google service account to use for external secrets"
}

variable "external_secrets_namespace" {
  description = "The namespace to use for external_secrets"
}
