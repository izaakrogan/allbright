import faker from 'faker';

export default function initDeck(count = 10) {
  return Array(count)
    .fill()
    .map((_, idx) => ({
      name: faker.name.findName(),
      jobTitle: faker.name.jobTitle(),
      image: faker.image.image(),
      id: idx,
    }));
}
