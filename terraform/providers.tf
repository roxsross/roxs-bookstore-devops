provider "aws" {
  region = var.region
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= v1.9.8"

  backend "s3" {
    bucket         = "iac-tf-bucket-s3"
    key            = "deploy-cf/deploy.tfstate"
    region         = "us-east-1"
    encrypt        = true
  }
}