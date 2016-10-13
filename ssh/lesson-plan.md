# SSH Workshop

### remember

- keep track of time
- engagement
  - have students be complete participants to the lesson
  - ask questions
- closing is as important as opening
  - review the material
  - leave time for this

### discussion

1. "what is heroku used for, and what are the different ways that you can interact with heroku?"
  - command line client
  - git push
  - web frontend

2. "why would you want to run your own server?"
  - how does heroku make heroku?
    - herokus all the way down :P
  - performance/cost
    - lower rates for equivelant resources
    - also the ability to prioritize certain kinds of resource configurations
      - CPU
      - Primary Memory Capacity/Rates
      - Seconday Memory Capacity/Rates
      - Internet Rates
      - Custom Network Topology (Private Network at Least)
      [physical control]
      - For physical
  - security for regulated industries or projects with special needs
    - or ease of mind - the less you have to trust, the better
  - control
    - run whichever software you want (mysql)
    - no daily reboot

3. "why would you want to run your web application on heroku?"
  - let professionals worry about the server going down on Saturday at 2am
  - they do the system administration for you

4. "we need a way to communicate with our server"

### definition

Secure Shell (SSH) is a cryptographic network protocol for operating network services securely over unsecured networks.

### lab

1. Open a secure shell session using **password authentication**.

  ```
  > ssh username@hostname
  [enter password]
  [...]
  > exit
  ```

  - these commands (`[...]`) will be running on the server
  - `exit` or `^D` will end the session which means commands run locally

2. Create your local **.ssh directory** with the right permissions.

  ```
  > mkdir ~/.ssh
  > chmod 0700 ~/.ssh
  ```

  - see `man ssh` `/FILES`

3. **Generate** a public-private **key pair** on your local machine.

  ```
  > ssh-keygen -f ~/.ssh/keyname
  [choose a password or no password]
  ```

  - `ls ~/.ssh` notice the two files
  - `cat `~/.ssh/keyname``.pub`
  - the private key (no pub) should never ever leave your computer (never be written over a network)
  - its secrecy is the only thing that mathematically proves the authenticity of the public key

4. Copy your **public key** to the **authorized_keys** file for your user on the server.

  ```
  > ssh-copy-id -i ~/.ssh/keyname username@hostname
  [enter password]
  ```

  - this makes use of password authentication before publickey authentication is available

5. Open a secure shell session using **publickey authentication**.

  ```
  > ssh -i ~/.ssh/keyname username@hostname
  ```

  - we should talk about the advantages/disadvantages of publickey authentication over password authentication

6. Mastering ssh with **ssh_config**.

  ```
  > touch ~/.ssh/config
  > chmod 0600 ~/.ssh/config
  ```
  ```
  [append to ~/.ssh/config:]

  Host sloth-command
    HostName hostname
    IdentityFile ~/.ssh/keyname
    User username
  ```
  ```
  > ssh sloth-command
  ```

  - `man ssh_config`
  - and the tutorial

### game time

  ```
  > ssh sloth-command
  > users
  [alice bob julia]
  > write julia
  [enter message for julia]
  [^C]
  ```

  1. player one writes a random word to player two
  2. player two writes a phrase describing the word to player three
  3. player three guesses what word was being described and writes it to player four
  4. goto step 2 until all players have played

### resources

- `man ssh`
  - `/AUTHENTICATION`
  - `/FILES`
- `man ssh-keygen`
- `man ssh-copy-id`
- `man ssh_config`
- [Search Hacker News for SSH](https://hn.algolia.com/?query=ssh)
- [Simplify Your Life With an SSH Config File](http://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/)
- [Upcase Intro to SSH](https://thoughtbot.com/upcase/videos/intro-to-ssh)
- [gitolite advanced ssh usage](http://gitolite.com/gitolite/ssh.html)
- [wikipedia ssh](https://en.wikipedia.org/wiki/Secure_Shell)
- [wikipedia OpenSSH](https://en.wikipedia.org/wiki/OpenSSH)
- [wikipedia PuTTY](https://en.wikipedia.org/wiki/PuTTY)

