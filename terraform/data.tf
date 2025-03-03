data "aws_vpc" "aws_default" {
  default = true
}

data "aws_subnet" "az_a" {
  vpc_id            = data.aws_vpc.aws_default.id
  availability_zone = var.subnet_id_a
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*"]
  }
}
#