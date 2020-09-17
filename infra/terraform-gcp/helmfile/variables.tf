// ----------------------------------------------------
// Required Variables
// ----------------------------------------------------
variable "name" {
  description = "The name of the GCP project"
  type = string
}

variable "external_secrets_google_service_account_email" {
  description = "The email address of the GCP Service Account used for external secrets"
}

variable "external_secrets_namespace" {
  description = "The Kuberntes namespace used by External Secrets"
}

variable "external_secrets_kubernetes_service_account" {
  description = "The Kubernetes Service Account used by External Secrets"
}

variable "database_service_account_secret_name" {
  description = "The name of the Google Secret Manager resource that contains the service account key for accessing the Cloud SQL database"
}

variable "mysql_properties_secret_name" {
  description = "The name of the Google Secret Manager resource that contains the properties file for accessing the Cloud SQL database"
}

variable "database_name" {
  description = "The name of the Cloud SQL database"
}

variable "database_instance_name" {
  description = "The name of the Cloud SQL database instance"
}

variable "database_project" {
  description = "The project which the Cloud SQL database is in"
}

variable "database_region" {
  description = "The region which the Cloud SQL database is in"
}

variable "database_port" {
  description = "The port the Cloud SQL database is using"
}

variable "keycloak_database_service_account_secret_name" {
  description = "The name of the Google Secret Manager resource that contains the service account key for accessing the Cloud SQL database"
}

variable "keycloak_database_username" {
  description = "The database username"
}

variable "keycloak_database_password_secret_name" {
  description = "The name of the Google Secret Manager resource the database password"
}

variable "keycloak_database_instance_name" {
  description = "The name of the Cloud SQL database instance"
}

variable "keycloak_database_name" {
  description = "The name of the Cloud SQL database"
}

variable "keycloak_database_project" {
  description = "The project which the Cloud SQL database is in"
}

variable "keycloak_database_region" {
  description = "The region which the Cloud SQL database is in"
}

variable "keycloak_database_port" {
  description = "The port the Cloud SQL database is using"
}


variable "load_balancer_ip" {
  description = "The IP address of the cluster load balancer"
}

variable "domain_suffix" {
  description = "The domain suffix of the cluster load balancer (e.g. g.bleepbleep.org.uk)"
}

variable "cert_manager_kubernetes_service_account" {
  description = "The Kubernetes Service Account used by Cert Manager"
}

variable "cert_manager_google_service_account" {
  description = "The email address of the GCP Service Account used for Cert Manager"
}

variable "cert_manager_namespace" {
  description = "The Kubernetes namespace used by cert manager"
}

variable "external_dns_kubernetes_service_account" {
  description = "The Kubernetes Service Account used by External DNS"
}

variable "external_dns_google_service_account" {
  description = "The email address of the GCP Service Account used for External DNS"
}

variable "external_dns_namespace" {
  description = "The Kubernetes namespace used by External DNS"
}
