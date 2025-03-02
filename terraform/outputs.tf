output "instance_id" {
    description = "El ID de la instancia EC2"
    value       = module.ec2_instance.id
}

output "instance_public_ip" {
    description = "La dirección IP pública de la instancia EC2"
    value       = module.ec2_instance.public_ip
}

output "instance_public_dns" {
    description = "El nombre DNS público de la instancia EC2"
    value       = module.ec2_instance.public_dns
}

output "ssh_instructions" {
    description = "Instrucciones para conectarse por SSH a la instancia EC2"
    value       = <<EOF
ID de la instancia: ${module.ec2_instance.id} (codigo-facilito-dev-server)
Abre un cliente SSH.

Ubica tu archivo de clave privada. La clave utilizada para lanzar esta instancia es temp.pem

Ejecuta este comando, si es necesario, para asegurarte de que tu clave no sea visible públicamente.
chmod 400 "temp.pem"

Conéctate a tu instancia usando su DNS público:
${module.ec2_instance.public_dns}

Ejemplo:

ssh -i "temp.pem" ec2-user@${module.ec2_instance.public_dns}
EOF
}