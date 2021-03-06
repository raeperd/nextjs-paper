export function getPageSize(): number {
  return process.env.PAGE_SIZE
    ? parseInt(process.env.PAGE_SIZE, 10) : 3
}

export function getSiteName(): string {
  return process.env.SITE_NAME
    ? process.env.SITE_NAME : 'Paper'
}

export function getDefaultAuthor(): string {
  return process.env.AUTHOR
    ? process.env.AUTHOR : 'author'
}

export function getDisqusShortname(): string | null {
  return process.env.DISQUS_SHORTNAME
    ? process.env.DISQUS_SHORTNAME : null
}

export function getServerURL(): string {
  return process.env.SERVER_URL
    ? process.env.SERVER_URL : 'http://localhost:3000'
}
