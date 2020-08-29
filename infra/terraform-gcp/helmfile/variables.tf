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

variable "external_secrets_kuberentes_service_account" {
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

variable "database_project" {
  description = "The project which the Cloud SQL database is in"
}

variable "database_region" {
  description = "The region which the Cloud SQL database is in"
}

variable "database_port" {
  description = "The port the Cloud SQL database is using"
}
