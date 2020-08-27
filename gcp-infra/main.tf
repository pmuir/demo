terraform {

}

# Specify the GCP Provider
provider "google-beta" {
  project = var.gcp_project
  region  = var.region
  zone = var.zone
  version = "~> 3.30"
}

resource "google_container_cluster" "primary" {
  provider = google-beta
  name     = var.cluster_name

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }

  # Enable Workload Identity
  workload_identity_config {
    identity_namespace = "${var.gcp_project}.svc.id.goog"
  }
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  provider = google-beta
  name       = "${var.cluster_name}-node-pool"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    preemptible  = true
    machine_type = "n1-standard-4"

    metadata = {
      disable-legacy-endpoints = "true"
    }

    workload_metadata_config {
      node_metadata = "GKE_METADATA_SERVER"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}