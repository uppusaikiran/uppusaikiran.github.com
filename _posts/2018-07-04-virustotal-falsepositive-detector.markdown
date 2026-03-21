---
layout: single
classes: wide
title: "VirusTotal false positive helper: Python tooling for v2 reports, heuristics, and sample lookup"
slug: virustotal-fp-tool
redirect_from:
  - /malware/virustotal-falsepositive-detector
  - /malware/virustotal-falsepositive-detector/
categories:
  - Malware
tags:
  - malware
  - clean files
  - malicious files
  - threat-hunting
  - detection
  - virustotal
  - false-positive 
---

<p class="post-lede">Python tooling for VirusTotal v2 reports: search samples, dump JSON, and heuristics that highlight likely false positives versus stronger malware signals.</p>

**Source:** [VirusTotal-FP-TOOL](https://github.com/uppusaikiran/VirusTotal-FP-TOOL) (formerly published under a different repo name; this is the current public project.)

The repository is described on GitHub as an open source Python tool to help identify false positives in VirusTotal detections. The code targets **Python 2.7** and the **VirusTotal v2 API** (see `app.py`).

## Prerequisites

1. A [VirusTotal API key](https://docs.virustotal.com/reference/overview).
2. Edit `app.py` and set your key in the `vtAPI` class: replace `'<--API_KEY_HERE-->'` with your API key.

## Clone and run

```bash
git clone https://github.com/uppusaikiran/VirusTotal-FP-TOOL.git
cd VirusTotal-FP-TOOL
```

### False positive / threat workflow

`vt_fp_tool.py` takes an **MD5** (or fetches a report after `search` stores JSON), writes `reports/<md5>.json`, prints selected vendor fields, and applies the bundled heuristics (major-vendor detections vs BitDefender-family engines, positives count, and related flags).

```bash
python vt_fp_tool.py 78a3a34cee255667095aac8ccb7540f3
```

Example-style output from the original tooling included lines such as `Potential False Positive` or `Potential Malware` depending on the report.

### General VirusTotal helper (`app.py`)

Broader CLI for lookup, verbose output, JSON dump, download, PCAP, and rescan:

```text
python app.py -h
usage: app.py [-h] [-s] [-v] [-j] [-d] [-p] [-r] HashorPath

Search and Download from VirusTotal

positional arguments:
  HashorPath            Enter the MD5 Hash or Path to File

optional arguments:
  -h, --help            show this help message and exit
  -s, --search          Search VirusTotal
  -v, --verbose         Turn on verbosity of VT reports
  -j, --jsondump        Dumps the full VT report to file (VTDLXXX.json)
  -d, --download        Download File from Virustotal (VTDLXXX.danger)
  -p, --pcap            Download Network Traffic (VTDLXXX.pcap)
  -r, --rescan          Force Rescan with Current A/V Definitions
```

Example:

```bash
python app.py 78a3a34cee255667095aac8ccb7540f3 -s
```

**Note:** VirusTotal has moved toward v3 APIs; for new integrations, plan a migration off v2. This repo matches the historical scripts as shipped on GitHub.
