locals {
  generated_file_name = "../helmfile/generated.yaml"
  generated = {
    gcp = {
      project = var.name
    }
    externalSecrets: {
      namespace: var.external_secrets_namespace
      kubernetesServiceAccount: var.external_secrets_kuberentes_service_account
      googleServiceAccount: var.external_secrets_google_service_account_email
    }
    database: {
      mysqlPropertiesSecretName: var.mysql_properties_secret_name
      serviceAccountSecretName: var.database_service_account_secret_name
      name: var.database_name
      project: var.database_project
      region: var.database_region
      port: var.database_port
    }
  }
}

provider "random" {
  version = "~> 2.2"
}

resource "random_password" "mysql_password" {
  length = 16
  special = true
  override_special = "_%@"
}

resource "google_secret_manager_secret" "mysql_password" {
  provider = google-beta

  secret_id = "mysql-password"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret_version" "mysql_password_version" {
  provider = google-beta

  secret = google_secret_manager_secret.mysql_password.id

  secret_data = random_password.mysql_password.result
}

# Output non-secret resources, secrets get put in google secret manager
resource "local_file" "generated_output" {
  filename = local.generated_file_name
  content = "##################################################\n# WARNING: This file is overwritten by terraform #\n# Make any changes in values.yaml             #\n##################################################\n\n${yamlencode(local.generated)}"
}
