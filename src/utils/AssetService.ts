/**
 * Service for retrieving assets like images
 */

/**
 * Returns a URL for an image from Unsplash based on the provided keyword
 * @param keyword - Search term for the image
 * @returns URL string for the image
 */
export function getAsset(keyword: string): string {
  // Ensure keyword is properly URL encoded
  const encodedKeyword = encodeURIComponent(keyword);
  return `https://source.unsplash.com/400x400/?${encodedKeyword}`;
}

/**
 * Returns a random science-related image URL
 * @returns URL string for a random science image
 */
export function getRandomScienceAsset(): string {
  const scienceKeywords = [
    'science',
    'chemistry',
    'physics',
    'biology',
    'astronomy',
    'laboratory',
    'microscope',
    'atoms',
    'dna',
    'technology'
  ];
  
  const randomIndex = Math.floor(Math.random() * scienceKeywords.length);
  return getAsset(scienceKeywords[randomIndex]);
} 