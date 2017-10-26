# Terminal fu

Some of my favorite little Unix command line zingers that make me more productive. 

It is great to appreciate the history of Unix, coming from when punching a key was kind of a pain in the ass. They had to really be curt and sort of creative to get their point across to massive mainframe machines somewhere in another building. The more you use your terminal emulator, the more you will appreciate how smart Unix can be. You will find yourself using the command line even for stuff that you can easily accomplish with a GUI.

This will read with childish simplicity along the lines of "Moss grows so the soil that trees need doesn't erode!" I am just showing you some of _my_ use cases for some complex tools with multiple uses. I might say to you, "There is a swiss army knife in the drawer for opening packages from Amazon and also wine bottles." because that is 'what it is for' to me. Rather than get lost in the million uses of these tools, here is how I use them most frequently. Look at the man pages if you want an exhaustive rundown, also don't @ me.  

-----------

`!!` Basically ditto marks. This means "what I just ran last time". What is call is that you can use it in a new context. Classic case:

```shell
$ rm -rf /important_stuff
** Error because of permissions ** 
$ sudo !!
** Works **
```

---------------

Recusively search through history by hitting `Ctrl-r` and typing a substring of what you want to run again. Hit `ctrl-r` again to cycle through matches.

------------------

For a complete chronological history, just run `history`. Pairs well with `grep`

-------------------

Save terminal output to a file with `>`

Run something with output, `>`, then the name of the file you want to pour the output into. Example: 

```shell
$ ruby calcuations.rb > answer.txt
# Classic example:
$ pip freeze > requirements.txt
```

------------

Grep lets you search through files. It's insanely useful. No joke, I used to literally open huge directories in a text editor to search through it for a substring. No more after I discovered grep.

For example, this searches for the substring 'affilliation' anywhere inside the app/models directory

```shell
$ grep -nri affiliation app/models	 
```

The n flag asks for line numbers.

The r flag stands for recursive, meaning that it will continue searching in subdirectories.

The i flag specifies case insensitive matches. 

--------------

The pipe (`|`) character lets you sort of string commands together, not just chronologically (that would be `&&`). Pipe means after you do x, then do y to the result. Here is an example:

```shell
$ history
# holy crap there is so much, I would like to pair down this output
$ history | grep python
# get my whole history, then go ahead and do the grep command on what results and search for "python"
```

--------------

Say goodbye to restarting your computer to kill a server that refused to die correctly. This happens all the time developing Rails projects locally but on a server, not a good option at all!  `lsof` lets you see the processes that are running on an individual port.

`lsof -i :3000` Reveals what is occupying port 3000 for instance. If you have that pid (process id) you can kill it if necessary.

------------

Kill? Yes KILL KILL KILL.

`kill -9 <process id>`

So if the rouge process on port 3000 was 1234, do `kill -9 1234` to mercilessly end it. The 9 flag is one of a few options, that one just plain lays down the law rather than interrupt or try to quit. I have only ever used 9.

----------------

`netstat ` is another interesting one since it shows all of your active network connections. More useful when you are logged into a dev or production server.

-------------

Need a server to just get some html or whatever into the browser? Run `python -m SimpleHTTPServer` inside a directory and boom. localhost:8000 is serving that directory the old school way. This is sometimes necessary if you are dealing with apis and whatnot that need to be run from a server for whatever reason rather than just opening a file in the browser. 

--------

All about trees man. This one is pretty awesome, but you have to brew install it on mac. Then go into a project directory and run `tree`.

There it is. A tree. 

Node modules tho. Node modules buggin me out. Ignore directories with the  `-I` flag.

-------------

I hit `Cmd+k` on my Mac like all the time if you haven't noticed. I like to clear my head. I am a simple person. On linux you need to either mess around with the terminal settings to get that or just type `clear` and there you go.

-----------

`cal` shows you a useless calendar. Cool.

---------------

`dig` is a powerful dns tool that returns DNS records. Quite useful when you want to confirm that DNS changes (like setting up SSL or mail records) are propagated successfully

--------

Aliases are crucial. I have a bunch! You can declare these like so: 

`alias l = 'ls -l'`

Now if you typle `l` it fills out `ls -l` for you. 

I have a ton of these that I use with varying frequency, but there are so many that I can't live without. This is why I encourage all of you to put your dotfiles in a repo. Maybe we will do a lesson on that soon.

----------

`df` Shows free disk space. More useful on servers, obviously.

--------

`uptime` shows just how long a machine has been on. Sometimes good to know.

---------

Man oh man there is no way to remember all these commands and all these flags for them. This is where man pages come in. No, these aren't pages full of football stuff and buffalo wings, it is short for manual. For instance run `man grep`. All of these unix programs of yore have extensive, useful man pages.

This drops you into "less" which is sort of like a text displaying program. Unlike vim and whatnot, this is not for text editing. You scroll with the `enter` key, quit with the `q` key. If you want to search, say, search for what the `-R` flag does, you type a `/` and the string that you want to search for, then enter. To show the next result, you hit `n`. 





# ZSH 

- one year younger than bash
- Bash version on mac is old af
- You can just jump in and use zsh without further instruction. You don’t have to learn it to use it.
- Oh my zsh
- Cd tab completion
- Git tab completion 
- Up arrow completion
- Path expansion: Cd x y replaces matching x part of path in working directory