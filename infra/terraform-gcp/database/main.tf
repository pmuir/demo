
resource "google_project_service" "sql_component_api" {
  provider           = google
  project            = var.project
  service            = "sql-component.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "sql_admin" {
  provider           = google
  project            = var.project
  service            = "sqladmin.googleapis.com"
  disable_on_destroy = false
}

# Create the database

resource "google_sql_database_instance" "database" {
  name             = var.name
  database_version = var.database_version

  settings {
    # Second-generation instance tiers are based on the machine
    # type. See argument reference below.
    tier = var.tier
    backup_configuration {
      enabled = true
      start_time = "18:00"
      binary_log_enabled = var.binary_log_enabled
    }
  }
}

resource "google_sql_database" "database" {
  name = "database"
  instance = google_sql_database_instance.database.name
}

# Create the database user password

resource "random_password" "password" {
  length = 16
  special = false
}

resource "google_sql_user" "user" {
  name     = var.username
  instance = google_sql_database_instance.database.name
  password = random_password.password.result
}

resource "google_service_account" "service_account" {
  project = var.project
  account_id = local.service_account_id
  display_name = "${var.name} CloudSQL Service Account"
}

resource "google_service_account_key" "service_account_key" {
  service_account_id = google_service_account.service_account.name
}

resource "google_secret_manager_secret" "database_password" {
  provider = google-beta

  secret_id = local.password_secret_id

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_iam_member" "database_password" {
  provider = google-beta
  secret_id = google_secret_manager_secret.database_password.secret_id
  role = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${var.external_secrets_google_service_account_email}"
}

resource "google_secret_manager_secret_version" "database_password_version" {
  provider = google-beta

  secret = google_secret_manager_secret.database_password.id

  secret_data = google_sql_user.user.password
}

resource "google_secret_manager_secret" "mysql_properties" {

  secret_id = local.mysql_properties_secret_id

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_iam_member" "mysql_properties" {
  secret_id = google_secret_manager_secret.mysql_properties.secret_id
  role = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${var.external_secrets_google_service_account_email}"
}

resource "google_secret_manager_secret_version" "mysql_properties_version" {

  secret = google_secret_manager_secret.mysql_properties.id

  secret_data = "mysql_username: ${var.username}\nmysql_password: ${google_sql_user.user.password}\n"
}

resource "google_secret_manager_secret" "database_service_account_key" {
  provider = google-beta

  secret_id = local.database_service_account_key_secret_id

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_iam_member" "database_service_account_key" {
  provider = google-beta
  secret_id = google_secret_manager_secret.database_service_account_key.secret_id
  role = "roles/secretmanager.secretAccessor"
  member = "serviceAccount:${var.external_secrets_google_service_account_email}"
}


resource "google_secret_manager_secret_version" "database_service_account_key_version" {
  provider = google-beta

  secret = google_secret_manager_secret.database_service_account_key.id

  secret_data = google_service_account_key.service_account_key.private_key
}

resource "google_project_iam_member" "iam_binding_member" {
  project      = var.project
  member      = "serviceAccount:${google_service_account.service_account.email}"
  role         = "roles/cloudsql.client"
}
