locals {
  gcp_project = "pmuir-dev"
  cluster_name = "demo-cluster"
  region = "europe-west1"
  zone = "europe-west1-b"
  external_secrets_kubernetes_service_account = "external-secrets"
  external_secrets_google_service_account = "externalsecrets"
  external_secrets_namespace = "external-secrets"
}
