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

module "mysql" {
  source = "./database"
  name = "mysql-database"
  project = local.gcp_project
  external_secrets_google_service_account_email = module.secrets.external_secrets_google_service_account_email
  binary_log_enabled = true
  depends_on = [ module.secrets ]
}

module "postgres" {
  source = "./database"
  name = "postgres-database"
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
  mysql_service_account_secret_name = module.mysql.service_account_secret_name
  mysql_properties_secret_name = module.mysql.mysql_properties_password_secret_name
  mysql_name = module.mysql.database_name
  mysql_instance_name = module.mysql.database_instance_name
  mysql_port = module.mysql.database_port
  mysql_project = module.mysql.database_project
  mysql_region = module.mysql.database_region
  mysql_password_secret_name = module.mysql.database_password_secret_name
  mysql_username = module.mysql.database_username
  postgres_service_account_secret_name = module.postgres.service_account_secret_name
  postgres_username = module.postgres.database_username
  postgres_password_secret_name = module.postgres.database_password_secret_name
  postgres_name = module.postgres.database_name
  postgres_instance_name = module.postgres.database_instance_name
  postgres_port = module.postgres.database_port
  postgres_project = module.postgres.database_project
  postgres_region = module.postgres.database_region
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
