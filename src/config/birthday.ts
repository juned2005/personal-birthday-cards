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

import photoCake from "@/assets/photo 1.jpg";
import photoToast from "@/assets/photo 2.jpg";
import photoGift from "@/assets/photo 3.jpg";
import photoSparkler from "@/assets/photo 4.jpg";
import photoBalloons from "@/assets/photo 5.jpg";
import photoMusic from "@/assets/photo 6.jpg";
import photoChampagne from "@/assets/photo 7.jpg";

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
  recipientName: "person name",
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
    {
      photo: photoBalloons,
      title: "The quiet moment",
      caption: "Balloons in the corner, happiness in the air.",
    },
    {
      photo: photoMusic,
      title: "The favorite song",
      caption: "Play it loud. Dance anyway. Feel every note.",
    },
    {
      photo: photoChampagne,
      title: "The next chapter",
      caption: "To everything ahead — clink, smile, repeat.",
    },
  ] satisfies WishCard[],
};
