---
title: SARA
date: "2023-07-26"
---

> Edit: 2024
>
> Bothered by the bug again.
> Opened a ticket again and pushed hard.
> Eventually had it fixed on 2024-01-09.

> Edit: 2023-08-08
>
> Found out how to replicate the bug.
> Turns out "logging into wrong user" happens if previous user just closes the browser
> without explicitly clicking "logout".
> Pretty awful bug.
>
> And of course the ticket's closed without handling the bug.
> I'm so curious if the responsible developers are aware of this bug.
>
> Lesson:
> **Don't bother opening a new ticket** regardless of it's severity.

I have opened a few tickets on this [_sara_](https://sara.health.nsw.gov.au) thing.

> SARA (Search. And. Request. Anything.) is the portal where NSW Health staff can seek support and make requests for services provided by eHealth NSW, HealthShare NSW and other organisations across NSW Health.

Some of them, like unexpected behaviour of eMR, PowerChart, for example, could badly affect health care professionals and potentially lead to medical errors. Chances are slim and the user is still at fault but system could reduce the risk.

Once, I reported a potential reflected cross-site scripting (XSS) vulnerability on the intranet. That has been closed "due to inactivity". Okay it's just reflected XSS on the intranet where the risk is close to none. What can go wrong?

If I don't respond to their follow-up calls or emails, the issues are not investigated further as described in the open ticket, but destined to be closed.

Work email is bombarded with spams, which is another ticket-worthy annoyance.
Well, I never attempt to check my work email anyway.

Pretty much all my tech related requests or bug fixes were not really resolved.
Still all those tickets are closed.
Amazing statistics of problem solving.

Acknowledging this, I stopped opening tickets knowing nothing would possibly change.

Today, I experienced something unexpected and unacceptable, and had to open a new ticket: "authentication error".
I logged in to an essential web application, _Patient Flow Portal_, only to find myself as logged in as previous user who just sat in the same computer minutes ago.

Before witnessing the authentication error, I restarted the Windows machine, opened a new instance of Chrome, and logged in typing my credentials.

This is a serious bug. No joking.
I'm not sure if I can replicate the bug again.
This only happened for the first time.

Couple hours after reporting the issue, I received a phone call regarding the open ticket.
She accessed my local computer remotely.
Asked me to log in again.
I logged out and logged in.
I was the authenticated user as expected.
Then she asked if she can closed the issue as there is no problem.
Something's wickedly wrong here.
Looks like they focus more on having open tickets at bay than actually improving the services.
Spirit of the public service.

I asked her not to close the ticket but to escalate and investigate this critical bug. I wouldn't be too surprised if the ticket is closed again without further investigation. My guess is it is highly likely to be closed due to "it works on my machine" kind of difficulty in replicating the issue.

My hunch where the bug crawled from is potentially an erroneous use of local storage during authentication.
