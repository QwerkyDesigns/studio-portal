terraform {
    backend "local" {}
    
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "> 4.55.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}