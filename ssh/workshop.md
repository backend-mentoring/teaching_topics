# SSH Workshop

Secure Shell (SSH) is a cryptographic network protocol for operating network services securely over unsecured networks.

### lab

1. Open a secure shell session using **password authentication**.

  ```
  > ssh username@hostname
  [enter password]
  [...]
  > exit
  ```

2. Create your local **.ssh directory** with the right permissions.

  ```
  > mkdir ~/.ssh
  > chmod 0700 ~/.ssh
  ```

3. **Generate** a public-private **key pair** on your local machine.

  ```
  > ssh-keygen -f ~/.ssh/keyname
  [choose a password or no password]
  ```

4. Copy your **public key** to the **authorized_keys** file for your user on the server.

  ```
  > ssh-copy-id -i ~/.ssh/keyname username@hostname
  [enter password]
  ```

5. Open a secure shell session using **publickey authentication**.

  ```
  > ssh -i ~/.ssh/keyname username@hostname
  ```

6. Mastering ssh with **ssh_config**.

  ```
  > touch ~/.ssh/config
  > chmod 0600 ~/.ssh/config
  ```
  ```
  [append to ~/.ssh/config:]

  Host bewd
    HostName hostname
    IdentityFile ~/.ssh/keyname
    User username
  ```
  ```
  > ssh bewd
  ```

### game time

  ```
  > ssh bewd
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

