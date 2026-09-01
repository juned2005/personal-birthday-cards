// ─────────────────────────────────────────────────────────────────────────────
// ✏️  BIRTHDAY WISH CONFIGURATION — edit everything about the page here.
//
//   • recipientName …… the big celebratory name
//   • tagline ………… the small line under the name
//   • message ……… the heartfelt birthday wish (each string = one line break)
//   • signature ……… who the wish is from
//   • cards …………… the photo cards in the swipe deck. Swap the photo import,
//                     or replace `photo` with any image URL.
// ─────────────────────────────────────────────────────────────────────────────

import photoCake from "@/assets/card-cake.jpg";
import photoToast from "@/assets/card-toast.jpg";
import photoGift from "@/assets/card-gift.jpg";
import photoSparkler from "@/assets/card-sparkler.jpg";
import photoBalloons from "@/assets/card-balloons.jpg";
import photoMusic from "@/assets/card-music.jpg";
import photoChampagne from "@/assets/card-champagne.jpg";

export interface WishCard {
  /** Photo shown on the card — an imported image or any https URL. */
  photo: string;
  /** Short title under the photo. */
  title: string;
  /** One-line caption under the title. */
  caption: string;
}

export const birthdayConfig = {
  // ── The birthday person ──────────────────────────────────────────────────
  recipientName: "Aisha",
  eyebrow: "A celebration of",
  tagline: "Thirty-two summers, and still the warmest room to walk into.",

  // ── The heartfelt wish (3–4 lines; each entry renders as its own line) ───
  message: [
    "You make ordinary days feel like small celebrations.",
    "Thank you for your warmth, your patience, and the way you always",
    "know when to stay quiet — and when to fill the whole room with light.",
    "May this year be gentle, golden, and entirely yours.",
  ],
  signature: "— always, with love",

  // ── The photo deck (top card first) ──────────────────────────────────────
  cards: [
    {
      photo: photoCake,
      title: "The big morning",
      caption: "Coffee gone cold, candles lit, you grinning anyway.",
    },
    {
      photo: photoToast,
      title: "The long table",
      caption: "Loud, warm, and entirely yours.",
    },
    {
      photo: photoGift,
      title: "The little things",
      caption: "The way you make everything feel like a gift.",
    },
    {
      photo: photoSparkler,
      title: "The bright years",
      caption: "Here's to every spark still to come.",
    },
  ] satisfies WishCard[],
};
