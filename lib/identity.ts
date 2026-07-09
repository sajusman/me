const ADJECTIVES = [
  "Swift", "Cosmic", "Silent", "Golden", "Crimson", "Lunar", "Solar",
  "Electric", "Velvet", "Mystic", "Brave", "Clever", "Nimble", "Radiant",
  "Stormy", "Ember", "Shadow", "Vivid", "Bold", "Gentle", "Fierce", "Noble",
  "Rapid", "Bright", "Hidden", "Ancient", "Rogue", "Neon", "Prime",
];

const ANIMALS = [
  "Falcon", "Otter", "Panther", "Fox", "Heron", "Lynx", "Wolf", "Raven",
  "Tiger", "Dolphin", "Hawk", "Bison", "Cobra", "Puma", "Gecko", "Badger",
  "Orca", "Crane", "Viper", "Koala", "Owl", "Stag", "Manta", "Jaguar",
  "Ibis", "Osprey", "Narwhal", "Quokka", "Serval", "Wren",
];

function pick<T>(list: T[]): T {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return list[buf[0] % list.length];
}

/** Generates a candidate name like "Swift-Falcon-4821". */
export function generateUsername(): string {
  const num = new Uint32Array(1);
  crypto.getRandomValues(num);
  const suffix = (num[0] % 9000) + 1000;
  return `${pick(ADJECTIVES)}-${pick(ANIMALS)}-${suffix}`;
}
