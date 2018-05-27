# Acing the code interview

Coding interviews scare the bejesus out of me. I must admit that I dread them. The unfortunate fact of life for developers is that high-pressure, high-stakes whiteboard coding is not going anywhere any time soon. Interviewers do this because an astonishing number of otherwise qualified looking applicants can't do fizzbuzz. We hate being on both sides of the table in this situation but it cannot be helped.

Today I would like to talk about some ways to maximize your chances of succeeding in an interview setting. You've gotten in the door, a busy engineer is devoting some of their time to evaluating you, now what?

## The variables that you can control

There are several things that could maximize your chances of landing a job.

1. Personal referral
2. Confidence, a good personality
3. A relevant degree
4. Years of experience in the industry or specific technology in the company's stack
5. Solving sample problems within the time allotted and demonstrating sophisticated problem solving skills and awareness of the efficiency of your code.

A personal referral can be huge. Every company gets piles of resumes, but an actual referral from someone puts you on third base. Unfortunately, you only have a limited number of friends and cousins who can vouche for you. You should absolutely get yourself out there IRL at tech meetups and online on developer networks like dev.to. Expanding your network only goes so far.

Your personality is hard to change or fake. 

College is expensive, don't go back to school, you will spend the rest of your life in debt.

Too bad you are just starting out, you need to get that first offer, kick ass, and that's that. 

So 1 - 4 are more or less constants right now, the variable that you have the most leverage over is your ability to shine in an interview, especially the technical part.

## Non-technical  stuff

![haha](https://i2.wp.com/www.developermemes.com/wp-content/uploads/2014/09/Web-Developer-With-A-Job-Web-Developer-Without-A-Job-Meme.jpg?w=625)

Generally, web developers dress like eight-year-old kids, but leave the sandals and shoes behind today. Put on some clothes that don't have pizza on them. Formal attire comes off as kind of thirsty and makes you look like you are going for sales positions, but just dress like you give a damn.

Get to know the company FFS. If a listing or a recruiter mentions the product or the team, look them up. Read a little bit about the industry and problem domain that the team works on. If you are applying at a real estate related company, being totally ignorant about real estate will hurt you.

If you talked to someone and know their name, look them up on LinkedIn  (ugh I know), Twitter, or whatever. You might have friends in common for all you know, or maybe you are both into something niche like Nu Metal, Kendo, or Belgian history or something. 

As I mentioned last week, you will be asked questions about stuff on your resume. Don't think you can bullshit here. You better have a story or two to tell about how you got to know a particular tool, how it differs from others and such. On the flip side, if you are asked something that you don't know, just say you don't know! A passionate, confident, and honest interviewee is what thou wants to be.

## Parsing technical interview questions

Some pointers before you start coding or whiteboarding:

#### Ask clarifying questions

The worst thing you can do in a technical interview is just charge up the wrong mountain. Solving the wrong problem says to the interviewer that you are going to waste time on stuff and not get your work done. 

Ask your interviewer for specs, requirements, and inputs. Making an assumption right out of the gates will ruin your chances of success. Also, if something sounds really really hard, you might just be misunderstanding it. The interviewers usually ask something that they know a decent candidate would be able to solve in a limited timeframe. If something takes like more than a dozen or two lines of code, you might be on the wrong track.

Walk through the problem out loud, create an example of the implementation in action. 

#### Brute force it first

At the very least, you want to solve the problem given to you. Look for the simplest possible solution and _then_ go for the O(1) or O(n) solution by refactoring. You might run out of time just getting to brute force!  

Spell out a ham-fisted but functional solution, then say, "of course this would create huge problems if the inputs were much larger than this simple example so…" and go on to address your shortcomings and optimize your solution.

#### Don't sweat small stuff until you are actually done

Interviewers rarely care about your syntax, perfect indentation, and sometimes if your thought process was sound, won't care if your code actually works. They realize that your code editor or IDE takes care of that.

There are of course exceptions. If you apply at a shop that specializes in TDD, by all means write a test first! This is where pre-interview prep and familiarity with the company come in handy.

Also, save edge cases for the end. For instance if you have to sort an array, ask if you can assume clean inputs of the same type at first. This is the opposite of how you should behave in a production environment but c'est la vie.

## DO IT LIVE

![https://giphy.com/gifs/tHdS8HFtuawZa/html5](https://media.giphy.com/media/tHdS8HFtuawZa/giphy.gif)

This is a version of a question that I hear comes up a lot in interviews at Google (they basically encourage technical interviewers to crib from _Cracking the Coding Interview_)

You can use any language you like. Let's try to do this with Phillip and I acting as ~~tormentors~~ interviewers for half the class respectively. 
