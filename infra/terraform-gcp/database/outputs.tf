output "service_account_secret_name" {
  value = google_secret_manager_secret.database_service_account_key.secret_id
}

output "mysql_properties_password_secret_name" {
  value = google_secret_manager_secret.mysql_properties.secret_id
}

output "database_name" {
  value = google_sql_database_instance.database.name
}

output "database_project" {
  value = google_sql_database_instance.database.project
}

output "database_region" {
  value = google_sql_database_instance.database.region
}

output "database_port" {
  value = var.service_port
}
