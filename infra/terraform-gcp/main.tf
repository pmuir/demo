terraform {

}

# Specify the GCP Provider
provider "google-beta" {
  project = local.gcp_project
  region  = local.region
  zone = local.zone
  version = "~> 3.30"
}

# Specify the GCP Provider
provider "google" {
  project = local.gcp_project
  region  = local.region
  zone = local.zone
  version = "~> 3.30"
}

resource "google_project_service" "secretmanager_api" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

module "cluster" {
  source = "./cluster"
  gcp_project = local.gcp_project
  cluster_name = local.cluster_name
}

module "secrets" {
  source = "./secrets"
  external_secrets_google_service_account = local.external_secrets_google_service_account
  external_secrets_kubernetes_service_account = local.external_secrets_kubernetes_service_account
  external_secrets_namespace = local.external_secrets_namespace
  gcp_project = local.gcp_project
  depends_on = [ module.cluster ]
}

module "database" {
  source = "./database"
  project = local.gcp_project
  external_secrets_google_service_account_email = module.secrets.external_secrets_google_service_account_email
  depends_on = [ module.secrets ]
}

module "helmfile" {
  source = "./helmfile"
  name = local.gcp_project
  external_secrets_google_service_account_email = module.secrets.external_secrets_google_service_account_email
  external_secrets_kuberentes_service_account = local.external_secrets_kubernetes_service_account
  external_secrets_namespace = local.external_secrets_namespace
  database_service_account_secret_name = module.database.service_account_secret_name
  mysql_properties_secret_name = module.database.mysql_properties_password_secret_name
  database_name = module.database.database_name
  database_port = module.database.database_port
  database_project = module.database.database_project
  database_region = module.database.database_region
}

module "shell" {
  source = "./shell"
  cluster_name = local.cluster_name
  gcp_project = local.gcp_project
  zone = local.zone
}
