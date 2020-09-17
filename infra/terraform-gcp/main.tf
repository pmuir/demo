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

module "networking" {
  source = "./networking"
  name = local.cluster_name
  gcp_project = local.gcp_project
  suffix = "g.bleepbleep.org.uk"
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
  binary_log_enabled = true
  depends_on = [ module.secrets ]
}

module "keycloak_database_new" {
  source = "./database"
  name = "keycloak-database-new"
  database_version = "POSTGRES_10"
  username = "postgres"
  project = local.gcp_project
  external_secrets_google_service_account_email = module.secrets.external_secrets_google_service_account_email
  depends_on = [ module.secrets ]
}

module "helmfile" {
  source = "./helmfile"
  name = local.gcp_project
  external_secrets_google_service_account_email = module.secrets.external_secrets_google_service_account_email
  external_secrets_kubernetes_service_account = local.external_secrets_kubernetes_service_account
  external_secrets_namespace = local.external_secrets_namespace
  database_service_account_secret_name = module.database.service_account_secret_name
  mysql_properties_secret_name = module.database.mysql_properties_password_secret_name
  database_name = module.database.database_name
  database_instance_name = module.database.database_instance_name
  database_port = module.database.database_port
  database_project = module.database.database_project
  database_region = module.database.database_region
  keycloak_database_service_account_secret_name = module.keycloak_database_new.service_account_secret_name
  keycloak_database_username = module.keycloak_database_new.database_username
  keycloak_database_password_secret_name = module.keycloak_database_new.database_password_secret_name
  keycloak_database_name = module.keycloak_database_new.database_name
  keycloak_database_instance_name = module.keycloak_database_new.database_instance_name
  keycloak_database_port = module.keycloak_database_new.database_port
  keycloak_database_project = module.keycloak_database_new.database_project
  keycloak_database_region = module.keycloak_database_new.database_region
  domain_suffix = module.networking.suffix
  load_balancer_ip = module.networking.load_balancer
  cert_manager_google_service_account = module.networking.cert_manager_google_service_account
  cert_manager_kubernetes_service_account = module.networking.cert_manager_kubernetes_service_account
  cert_manager_namespace = module.networking.cert_manager_namespace
  external_dns_google_service_account = module.networking.external_dns_google_service_account
  external_dns_kubernetes_service_account = module.networking.external_dns_kubernetes_service_account
  external_dns_namespace = module.networking.external_dns_namespace
}

module "shell" {
  source = "./shell"
  cluster_name = local.cluster_name
  gcp_project = local.gcp_project
  zone = local.zone
}
