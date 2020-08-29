// ----------------------------------------------------
// Required Variables
// ----------------------------------------------------
variable "cluster_name" {
  description = "The name of the cluster"
  type = string
}

variable "gcp_project" {
  description = "The name of the GCP project"
  type = string
}

variable "zone" {
  description = "The zone"
}
