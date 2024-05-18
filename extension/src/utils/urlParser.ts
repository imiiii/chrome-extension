import URLParse from 'url-parse';

export function extractDomain(url: string): string {
  const parsedUrl = new URLParse(url);
  return parsedUrl.hostname;
}

export function getMainDomain(url: string): string {
  const domain = extractDomain(url);
  const parts = domain.split('.').reverse();
  if (parts.length >= 2) {
    return `${parts[1]}.${parts[0]}`;
  }
  return domain;
}

export function getSubdomain(url: string): string {
  const parsedUrl = new URLParse(url);
  const parts = parsedUrl.hostname.split('.');
  // Assuming subdomain is the first part of the hostname
  if (parts.length > 2) {
    return parts.slice(0, -2).join('.');
  }
  return '';
}