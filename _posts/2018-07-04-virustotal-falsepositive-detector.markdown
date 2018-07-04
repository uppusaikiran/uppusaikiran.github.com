---
header:
  image: /assets/images/malware.jpg
  caption: "Photo credit: [**pxhere**](https://pxhere.com)"

---

A simple tool to organise large malicious/benign files into a organised Structure.

Source Code : [virustotal-falsepositive-detector](https://github.com/uppusaikiran/virustotal-falsepositive-detector)

Hit Counter : [![HitCount](http://hits.dwyl.io/uppusaikiran/virustotal-falsepositive-detector.svg)](http://hits.dwyl.io/uppusaikiran/virustotal-falsepositive-detector)



### PreRequsite

Get the Virustotal API Key.

## Usage:


Step-1 :

Clone the Repo

```

git clone git@github.com:uppusaikiran/virustotal-falsepositive-detector.git
Cloning into 'virustotal-falsepositive-detector'...
remote: Counting objects: 38, done.
remote: Compressing objects: 100% (27/27), done.
remote: Total 38 (delta 5), reused 38 (delta 5), pack-reused 0
Receiving objects: 100% (38/38), 13.37 KiB | 0 bytes/s, done.
Resolving deltas: 100% (5/5), done.
Checking connectivity... done.

```
Step-2:

Change to the Folder
```
cd virustotal-falsepositive-detector
```

Step-3:
Fill the Virustotal API Key in the settings.py file.

Step-4:
Run the Script
```
python app.py -h
usage: app.py [-h] [-v] hash

VirusTotal FalsePositive Detection Tool

positional arguments:
  hash           MD5 of the sample

optional arguments:
  -h, --help     show this help message and exit
  -v, --version  show program's version number and exit

python app.py 78a3a34cee255667095aac8ccb7540f3
The Result of Hash 78a3a34cee255667095aac8ccb7540f3 is potential false positive

python app.py 43e2e0bef675c300e648c82874149d79
The Result of Hash 43e2e0bef675c300e648c82874149d79 is potential malware

```
