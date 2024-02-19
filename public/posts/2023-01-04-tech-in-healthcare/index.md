---
title: Technology in healthcare
date: "2023-01-04"
---

I use electronic medical record (EMR) system called PowerChart by [Cerner](https://en.wikipedia.org/wiki/Cerner) in my hospital in Sydney.

I'm not so sure if this is the case for other local health districts or other states.

**I'd like to imagine how technology can make life of healthcare workers easier and safer for patients.**

The current system is a stand alone software on Windows.
It looks like it's built with Visual Basic 6 and maintained the legacy since, but that's not the point.

Big problem, or opportunity, is that the data is stored in the PowerChart, I mean database it uses, and it's not communicated among other apps as much as I wish, or many cases, there's no systems in place at all.

I guess there would be reasons why it's what it is. 
But I want to talk about some improvement wish list from a user's point of view.


## Medications

1.
When the ordered medications are not stored in the ward, nurse need to 1.recognize that it's likely not kept in the ward, 2.check if the stock is available when in doubt, 3.request to pharmacy by clicking each item required.

It would be great if there is a good communication system between PowerChart and pharmacies.
Pharmacy can have a database of which ward keeps what medications and how much; I believe this is already in place though.
From the frequency of orders and administration history, it can guess how long the stock would last, and how often to restock based on the previous request patterns. Such system could facilitate prompt supply of required medications.

2.
Some medications are still ordered in a paper, e.g. IV heparin, fluids, blood products, etc.
When EMR has records to contraindicate the use of the medication, the responsibility of picking this up is entirely up to the workers. **If all runs on the same system, provided error preventative measures are in place, preventable incidents can be reduced**, e.g. IV heparin on paper and some other form of anticoagulant on the EMR.

ICU still writes documentation in the paper by the way. WTH.

3.

*This section is beyond the scope of Cerner's capabilities, and requires government level support.

There is no such thing as "my-up-to-date-medication-list-on-the-cloud".
Because of this, many people carry a list of medications on a paper or keep a photo in their mobile phone which often goes outdated. And so many people don't even remember their list of medications, I wouldn't either to be honest.

This also is kind of work delegated to the individual that could be easily dealt with by a computer.

When new patient is admitted to hospital, emergency doctors need to dig through their crumpled paper, phone, previous medical record (also in a paper form most of the time), or ask to get faxes from their general practitioner (GP). Then chart their regular medications.
**Doctors are guaranteed to fail to chart this correctly**, and I don't even think they care to do so.
Medication list from previous admission was saved in the database.
If this database is not wasted and used properly, people would have up-to-date medication record that could significantly reduce the workload of doctors and nurses chasing to correct what's in patients' memory.

## Bed management, staffing
I know Bed manager has different app to oversee various wards.
However, I believe this is exactly the area where scripts and AI can make a substantial improvement that human cannot do so effectively.

Counting empty beds, moving patients between wards, allocating new patients according to available beds and staffing manually is a tedious process that's perfect for a computer.

## Test results
Blood tests are checked manually. 
Often tests are not even done, and go overlooked.
Heart attacks are missed. 

There could be a lot more room for image detection software to improve quality of care provided. 
Recognizing potential diagnosis from the imaging is one thing, but following up treatment changes required on the entire system would be beneficial, e.g. detecting hemorrhage in the brain CT before the image is reviewed and summarized, and suggesting a review of blood thinner in the medication system, etc.

## Resource sharing
Resource is not shared between different wards in a systemized way.
Each is doing their own business.

1. 
When ward is short of something, e.g. equipment, medication, etc, there is no system to source this efficiently with trace of logs.
Well, there's only a handful of wards in the hospital. You can just call each ward and ask for something for example. That still works. But I suspect we would be doing this differently in the future.

2.
Being able to swab shift as wishes at the last minute would prevent unnecessary sick leaves from staff who is not really sick but has important life events. Currently shift swab request between two workers is organized only within a ward. Understandable. Just wondering if enabling shift swab among other wards would minimize short staffing issues.

## Annoyance
- It's damn slow 🐢.
- I need to log in every time I need to record a blood pressure; I wish there was an alternative way.
