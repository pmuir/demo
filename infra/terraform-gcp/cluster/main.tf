resource "google_project_service" "container_api" {
  provider           = google
  service            = "container.googleapis.com"
  disable_on_destroy = false
}

resource "google_container_cluster" "primary" {
  provider = google-beta
  name     = var.cluster_name

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1
  release_channel {
    channel = "REGULAR"
  }

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
  autoscaling {
    max_node_count = 8
    min_node_count = 1
  }
  initial_node_count = 1

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
