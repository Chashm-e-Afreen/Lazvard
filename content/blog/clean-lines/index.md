---
title: Guidelines
date: "2019-05-05"
thumbnail: ./guide.webp
tags: ["عروض", "writings"]
description: Let's get started.
---

## Introduction

The core app engine uses a binary encoding to represent word stresses. Each quiescent letter is represented with "1"
while each mobile letter is represented with "0". If two or more quiescent letters occur adjacent to each other in a consonant cluster then their joint representation amounts to "01"

This approach mirrors what had been 
formalised by Al-Khalīl ibn Aḥmad al-Farāhīdī and is thereby closer to the essence of Urdu prosody. 

Urdu is a syllable timed language
and a stress based system like the one we see in English which introduces the concept of long and short syllables ought not to be mirrored for Urdu in my opinion. 

## Representation

A few words with their representation in the binary system I have devised is given in the table below.

<style>
td, th {
  font-size: 2.4rem
}
</style>
| Encoding         | Word   
|--------------|-----------|
| ۰۱ | کَا     | 
| ۱۰۱      | مَاْنْ  |
| ۰۱۰۱      | غَاْلِبْ

## Output

For the sake of simplicity and avoiding confusion, I have tried to avoid displaying this binary encoding everywhere. 
To achieve this the programme highlights the letters that are disrupting the rythm only. 

For a rythmically perfect line the programme also
tries to quantify the fluidity of the line with the help of an algorithm which takes shortened vowels into account.
