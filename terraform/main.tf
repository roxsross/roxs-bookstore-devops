module "ec2_instance" {
  source = "terraform-aws-modules/ec2-instance/aws"

  name = "${var.project}-${var.environment}-server"

  instance_type          = var.instance_type
  key_name               = var.key_name
  ami                    = data.aws_ami.amazon_linux.id
  monitoring             = true
  vpc_security_group_ids = var.security_group
  subnet_id              = data.aws_subnet.az_a.id
  user_data              = file("user_data.sh")


  tags = merge(
    {
      Terraform   = "true"
      Environment = var.environment
    }
  )
}