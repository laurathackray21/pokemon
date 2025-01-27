terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.8.0"
    }
  }
  backend "gcs" {
    bucket = "manifest-setup-447710-h7-pokemon-tf"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = "manifest-setup-447710-h7"
  region  = "europe-west1"
  zone    = "europe-west1-a"
}


resource "google_cloud_run_service" "pokemon-service" {
  name     = "pokemon-service"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  lifecycle {
    ignore_changes = [template.0.spec.0.containers.0.image]
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.pokemon-service.location
  project  = google_cloud_run_service.pokemon-service.project
  service  = google_cloud_run_service.pokemon-service.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
