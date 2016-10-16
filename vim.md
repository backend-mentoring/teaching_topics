#Vim!

In today's class, I am going to get you started with Vim, which is a pretty good text editor and my second favorite. 

But why?! First of all, you don't have to know vim to edit text. There are other options out there. Also, vim users get a bad rap for being imperious and self-righteous.

![http://imgur.com/gkaLzYz](https://i.imgur.com/gkaLzYz.png)

I personally prefer Sublime Text and left to my own devices, I would use Sublime forever and spend my time learning how to be a better coder, not fiddling around with a text editor. But there are some important needs that vim addresses.

1. First, it runs right in your terminal, and it comes with Mac and every Linux distribution that I know of. This is important when you SSH into another server and you have to edit text. It's a real pain in the ass syncing files from your desktop to the server ever time you need to save changes. Personally, I didn't even attempt to learn vim until I absolutely had to work on a server at work. I was pretty hamstrung for a few weeks as a result.
2. It blows away the competition. You can (and probably have) used `nano` and if you are an evil wizard, `emacs` but vim is much more full-featured and there is a whole galaxy of plugins that you can use to speed up your workflow. It's incredibly customizable to the point where using it on someone else's machine is like learning a new language. 
3. It has also been around forever (it's parent, `vi` has been around since the 70s - `vim` means "vi improved") and it's part of the common language for developers on Unix like systems.
4. You are going to run into it all the time when you are doing stuff like rebasing commits with git or renaming migrations in rails.  
5. It's actually really nice. You might find that you prefer it. There is a
   reason why it is the [second most popular dev environment available for Unix
based
systems](https://stackoverflow.com/research/developer-survey-2016#technology-development-environments) 


##Getting started

Open your terminal and type `vim`

There it is! On a Mac `vi` opens vim

Now what? 
![joke](https://i.imgur.com/2P07j9T.png)

Can you quit? 

`:q`

`:` opens vim's command line at the bottom gutter. Hit `Esc` to leave it.

`:q!` < --- the `!` is like 'i mean it' `:q!` is the ejection seat in case you can't figure out what you have done.

Yep. Good 

##Write to a file

`:w`

##Write and quit

`:wq`

There is usually an English acronym/mnemonic to vim commands. It's useful to
learn them along with the command itself.

##Opening files
`vim <filename>`

Open a new file in vim
`:e <filename>`

##Modes: 

We won't go over them all.

`Esc` goes back to 'normal' mode. 

`i` Insert mode. Now the keys type letters and stuff instead of issue commands to vim. Your arrow keys work in insert mode 

##Moving around character by character: 

![](http://www.catonmat.net/images/why-vim-uses-hjkl/adm-3a-hjkl-keyboard.jpg)

This takes some getting used to. I recommend disabling the arrow keys (I'll show
you later).

##Moving by word:

`w` skip forward a word

`b` move back a word

##Lines

`A` Start editing the end of the line you are on
`$` End of line 
`o` Start a new line under what you are on
`O` Start a new line above
`^` Move to beginning of the line

`G` Go to the end of the file
`gg` Go to the start of the file

##Search

`/` Then type some stuff and hit enter. Hit `n` to find the next match

##Deleting stuff

`x` Delete the one character under your cursor
`dd` Delete the whole line
`r` Change a single character to the next character you type


##Your `.vimrc`

Disable the arrow keys in normal mode!

```
nnoremap <Left> :echoe "Use h"<CR>
nnoremap <Right> :echoe "Use l"<CR>
nnoremap <Up> :echoe "Use k"<CR>
nnoremap <Down> :echoe "Use j"<CR>
```

Leader key: 

`let mapleader = " "`

`nmap <leader>e $`

##More stuff to get started

`$ vimtutor`

`:help`

[Vimawesome: a ton of great plugins](http://vimawesome.com/)

[Zelda-like game to learn vim](http://vim-adventures.com/)

