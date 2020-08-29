resource "local_file" "example_output" {
  filename = "../bin/cluster-connect.sh"
  file_permission = "755"
  content = templatefile("${path.module}/cluster-connect.sh.tmpl", {
    zone = var.zone
    gcp_project = var.gcp_project
    cluster_name = var.cluster_name
  })
}