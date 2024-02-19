---
title: First impression of whisper
date: "2022-09-24"
---

### Tried out [openai/whisper](https://github.com/openai/whisper)
> Whisper is a general-purpose speech recognition model.

### Install
> It also requires the command-line tool ffmpeg to be installed on your system, 

```shell
# on MacOS
brew install ffmpeg
```

OMG. Installing one package on brew takes so long


Had some errors trying to run whisper

```shell
Traceback ...
...
[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1125)
...
```

Fixed the error by running following command (change 3.8 to your version of python)
```shell
/Applications/Python\ 3.8/Install\ Certificates.command
```

### Run 
Command I used for transcribing

```shell
whisper audio_en.mp3 --model base --language en
whisper audio_ko.mp3 --model base --language ko
```

Using any other models bigger than 'base' was way too slow for my old macbook (2015).

### Output
Command line shows some sample results on the terminal.
Generates transcribed files: *.vtt and *.txt

### Impressions
Awesome speech recognition for English.
It can pick up my voice reading stuff in English with some accent flawlessly.

However, voice memo that contains a conversation between me and my then-4yo daughter in Korean wasn't as impressive. Much more room to improve on Korean and possibly other non-English languages.

Grateful that these things are available.