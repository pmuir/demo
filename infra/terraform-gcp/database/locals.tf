locals {
  service_account_id = "${var.name}-cloudsql"
  password_secret_id = "${var.name}-database-password"
  mysql_properties_secret_id = "${var.name}-mysql-proerties"
  database_service_account_key_secret_id = "${var.name}-service-account-key"
}
