variable "instance_type" {
  description = "Type of instance to be created"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name of the key pair to use for the instance"
  type        = string
}

variable "security_group" {
  description = "List of security group IDs to associate with the instance"
  type        = list(string)
}

variable "subnet_id_a" {
  description = "The subnet ID in which to launch the instance"
  type        = string
  default     = "us-east-1a"
}

variable "region" {
  description = "The AWS region to deploy to"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "The name of the project"
  type        = string
}

variable "environment" {
  description = "The deployment environment (e.g., dev, staging, prod)"
  type        = string
}
