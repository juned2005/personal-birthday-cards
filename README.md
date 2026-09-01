# Birthday Bloom

Create a polished, mobile-first birthday wish website. It should have: 1) a large birthday person's name in a beautiful celebratory display font, 2) a swipeable card carousel where the creator can add photos to each card, with smooth touch interactions and elegant card styling, and 3) a heartfelt 3–4 line birthday wish paragraph. Make the content easy to customize from a clearly labeled configuration area or edit-friendly placeholders. Use a festive but refined visual direction: soft gradients, confetti/sparkle accents, strong typography, responsive layout, and subtle animations. Include a sample recipient name, sample photo placeholders, and a sincere birthday message.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/899321cf-7c39-443b-90a5-8bf4c2a5cc84).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

<br>
<br>
<hr>

## Where the images are

**Image files:** `src/assets/`
- `card-cake.jpg`
- `card-toast.jpg`
- `card-gift.jpg`
- `card-sparkler.jpg`
- `card-balloons.jpg`
- `card-music.jpg`
- `card-champagne.jpg`

**Wired into code in:** `src/config/birthday.ts`

At the top, each image is imported:

```ts
import photoCake from "@/assets/card-cake.jpg";
```

Then used in the `cards` array, one card per photo:

```ts
{
  photo: photoCake,
  title: "The big morning",
  caption: "Coffee gone cold, candles lit, you grinning anyway.",
},
```

## To swap an image for your own
1. Drop your new image file into `src/assets/` (any name, e.g. `card-cake-new.jpg`).
2. Update the import line to point at it:
```ts
   import photoCake from "@/assets/card-cake-new.jpg";
```
3. Done — the `photo: photoCake` reference in the `cards` array doesn't need to change.

## To rename an existing image
1. Rename the file in `src/assets/`.
2. Update the matching import line to the new filename.
3. Nothing else needs to change, since the rest of the code only references the variable name (`photoCake`, `photoToast`, etc.), not the file path.
