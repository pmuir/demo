locals {
  generated_file_name = "../helmfile/generated.yaml"
  generated = {
    gcp = {
      project = var.name
    }
    externalSecrets: {
      namespace: var.external_secrets_namespace
      kubernetesServiceAccount: var.external_secrets_kubernetes_service_account
      googleServiceAccount: var.external_secrets_google_service_account_email
    }
    mysql: {
      mysqlPropertiesSecretName: var.mysql_properties_secret_name
      serviceAccountSecretName: var.mysql_service_account_secret_name
      passwordSecretName: var.mysql_password_secret_name
      username: var.mysql_username
      name: var.mysql_name
      instanceName: var.mysql_instance_name
      project: var.mysql_project
      region: var.mysql_region
      port: var.mysql_port
    }
    postgres: {
      username: var.postgres_username
      passwordSecretName: var.postgres_password_secret_name
      serviceAccountSecretName: var.postgres_service_account_secret_name
      name: var.postgres_name
      instanceName: var.postgres_instance_name
      project: var.postgres_project
      region: var.postgres_region
      port: var.postgres_port
    }
    loadBalancer: {
      ip: var.load_balancer_ip
      suffix: var.domain_suffix
    }
    certManager: {
      googleServiceAccount: var.cert_manager_google_service_account
      kubernetesServiceAccount: var.cert_manager_kubernetes_service_account
      namespace: var.cert_manager_namespace
    }
    externalDns: {
      googleServiceAccount: var.external_dns_google_service_account
      kubernetesServiceAccount: var.external_dns_kubernetes_service_account
      namespace: var.external_dns_namespace
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
  secret_id = "mysql-password"

  labels = {
    generated = "true"
  }

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
