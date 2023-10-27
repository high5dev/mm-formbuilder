const defaultNumberPrice = [
  { type: "xs", price: 3.16, smsCredits: 300, voiceMinutes: 300 },
  { type: "s", price: 5.32, smsCredits: 600, voiceMinutes: 600 },
  { type: "m", price: 11.8, smsCredits: 1500, voiceMinutes: 1500 },
  { type: "l", price: 22.6, smsCredits: 3000, voiceMinutes: 3000 },
  { type: "xl", price: 44.2, smsCredits: 6000, voiceMinutes: 6000 },
  { type: "xxl", price: 65.8, smsCredits: 9000, voiceMinutes: 9000 },
  { type: "xxxl", price: 109, smsCredits: 15000, voiceMinutes: 15000 },
];

const defaultCreditPrice = [
  { price: 12.97, count: 250 },
  { price: 26.5, count: 500 },
  { price: 32.0, count: 1000 },
  { price: 52.5, count: 2500 },
  { price: 80.0, count: 5000 },
  { price: 110.0, count: 10000 },
  { price: 200.0, count: 40000 },
];

const defaultMinutePrice = [
  { price: 8.4, count: 60 },
  { price: 13.8, count: 100 },
  { price: 40.5, count: 300 },
  { price: 54.0, count: 500 },
  { price: 106.0, count: 1000 },
  { price: 204.0, count: 2000 },
];

module.exports = { defaultNumberPrice, defaultCreditPrice, defaultMinutePrice };
