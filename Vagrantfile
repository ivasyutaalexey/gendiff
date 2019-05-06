# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "bento/ubuntu-16.04"
    config.vm.synced_folder ".", "/vagrant", type: "nfs"

    config.vm.provision "shell", inline: <<-SHELL
        apt update
        curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -

        sudo apt install nodejs -y
        sudo npm install -g npm@5.7.1
        sudo npm install --cwd "/vagrant" --prefix "/vagrant"
    SHELL

    config.vm.provider "virtualbox" do |v|
      v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
    end
end
