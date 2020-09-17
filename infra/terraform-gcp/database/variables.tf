variable "project" {
  description = "The GCP project"
}

variable "name" {
  description = "The name of the database"
  default = "database"
}

variable "database_version" {
  description = "the database version"
  default = "MYSQL_5_6"
}

variable "binary_log_enabled" {
  default = false
}

variable "tier" {
  description = "the tier to run the database in"
  default = "db-f1-micro"
}

variable "username" {
  description = "the username for the created user"
  default = "mysql"
}

variable "external_secrets_google_service_account_email" {
  description = "The service account to allow secret access too"
  type = string
}

variable "service_port" {
  description = "The port used for the service"
  type = number
  default = 5432
}
