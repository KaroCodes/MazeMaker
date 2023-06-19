# Maze Maker
[www.karo.codes/MazeMaker](https://www.karo.codes/MazeMaker/)

Hello Coders! 👋

`Maze Maker` is a small project written with [Typescript](https://www.typescriptlang.org/), [React](https://react.dev/), [Yarn](https://yarnpkg.com/) and [Vite](https://vitejs.dev/).

It allows you to **generate** and **edit mazes** (labyrinths) of different size and wall apperance, as well as **download them as SVGs** that you can recolor however you want! 🌈

[**COMING SOON**] A walkthrough video on my [YouTube channel](https://www.youtube.com/@KaroCodes) explaining how the project was implemented, starting with the idea and including my thinking process behind solving each of the problems. I'll even try to animate some stuff 🤞

<br>

## Running local dev server

I purposefully put some limits on the size of the maze or thickness of the walls so that I don't have to handle too many UI states 🙈

But there's nothing much stopping you from generating bigger/smaller mazes with different walls and colors. If you wanna experiment with making some changes you can run the code on your local machine pretty easily (requires [Yarn](https://yarnpkg.com/)).

Run on a chosen port (e.g. `4555`) and add ability to test on local network with `--host`

```
yarn dev --port 4555 --host
```

    ➜  Local:   http://localhost:4555/
    ➜  Network: http://<IP>:4555/

### Code and commits

The most recent code should be in a pretty clean state but if you try to follow my process commit-by-commit you might be surprised by the way my ADHD brain operates 🧠 🙈

This project wasn't initially meant to be shared as it was just one of my *"OMG I watched [Veritasium's video](https://www.youtube.com/watch?v=ZMQbHMgK2rw) and now I'm obsessed with mazes but also how cool would it be to draw them as SVG instead of canvas so they can be recolored and scaled without loosing quality woohoo let's get coding!"*. What I'm saying is - enter at your own risk 😂

Have fun!

**PS**: If you like this project, if it was helpful for you in any way and you wanna say thanks you can [buy me a coffee here](https://www.buymeacoffee.com/karo.codes) ☕ (no pressure tho! 💖)
