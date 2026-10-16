import { getCollection } from 'astro:content';

function isTemplateFile(id: string) {
  return id.split('/').some((part) => part.startsWith('_'));
}

export async function getPublishedListings() {
  const listings = await getCollection('listings');
  return listings
    .filter((listing) => !isTemplateFile(listing.id))
    .sort((a, b) => a.data.name.localeCompare(b.data.name));
}
