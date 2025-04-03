import * as cdk from "aws-cdk-lib";
import {
  Instance,
  InstanceType,
  MachineImage,
  Vpc,
  UserData,
  SecurityGroup,
  Peer,
  Port,
  KeyPair,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class SimplifiedChromiumBuilderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a minimal VPC
    const vpc = new Vpc(this, "MinimalVPC", {
      maxAzs: 1,
      natGateways: 0, // No NAT Gateway to reduce costs
    });

    // Create a security group for the instance
    const securityGroup = new SecurityGroup(this, "InstanceSecurityGroup", {
      vpc,
      description: "Allow SSH access to the instance",
      allowAllOutbound: true,
    });

    // Allow SSH inbound traffic
    securityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(22),
      "Allow SSH access from anywhere"
    );

    // Create a key pair for SSH access
    const keyPair = new KeyPair(this, "InstanceKeyPair", {
      name: "chromium-builder-key",
      description: "Key pair for Chromium builder instance",
    });

    // Create user data to install the required dependencies
    const userData = UserData.forLinux();
    userData.addCommands(
      'yum install -y tar zlib-devel bzip2 bzip2-devel readline-devel sqlite sqlite-devel xz xz-devel libffi-devel openssl openssl-devel "@Development Tools" cmake libstdc++-static lld nano git alsa-lib-devel atk-devel bc bluez-libs-devel bzip2-devel cairo-devel cups-devel dbus-devel dbus-glib-devel dbus-x11 expat-devel glibc-langpack-en gperf gtk3-devel httpd libatomic libcap-devel libjpeg-devel libXScrnSaver-devel libxkbcommon-x11-devel mod_ssl ncurses-devel ncurses-compat-libs nspr-devel nss-devel pam-devel pciutils-devel perl php php-cli pulseaudio-libs-devel ruby xorg-x11-server-Xvfb libcurl-devel libxml2-devel clang libdrm-devel libuuid-devel mesa-*',
      // Add compiler symlinks for ARM64
      "ln -s /usr/lib/gcc/aarch64-amazon-linux /usr/lib/gcc/aarch64-unknown-linux-gnu",
      "ln -s /usr/include/c++/11/aarch64-amazon-linux /usr/include/c++/11/aarch64-unknown-linux-gnu",
      "ln -s /usr/libexec/gcc/aarch64-amazon-linux /usr/libexec/gcc/aarch64-unknown-linux-gnu"
    );

    // Create the EC2 instance
    const instance = new Instance(this, "ChromiumBuilderInstance", {
      vpc,
      instanceType: InstanceType.of(
        cdk.aws_ec2.InstanceClass.C7G, // ARM64 instance type
        cdk.aws_ec2.InstanceSize.XLARGE
      ),
      machineImage: MachineImage.latestAmazonLinux2023({
        cpuType: cdk.aws_ec2.AmazonLinuxCpuType.ARM_64,
      }),
      userData: userData,
      securityGroup: securityGroup,
      keyName: keyPair.keyPairName,
    });

    // Output the instance public IP and key pair information
    new cdk.CfnOutput(this, "InstancePublicIP", {
      value: instance.instancePublicIp,
      description: "Public IP address of the instance",
    });

    new cdk.CfnOutput(this, "SSHKeyName", {
      value: keyPair.keyPairName,
      description: "Name of the SSH key pair",
    });

    new cdk.CfnOutput(this, "SSHCommand", {
      value: `ssh -i /path/to/${keyPair.keyPairName}.pem ec2-user@${instance.instancePublicIp}`,
      description: "Command to SSH into the instance",
    });
  }
}
