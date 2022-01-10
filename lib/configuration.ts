export function getPageSize(): number {
  return process.env.PAGE_SIZE
    ? parseInt(process.env.PAGE_SIZE, 10) : 3
}

export function getSiteName(): string {
  return process.env.SITE_NAME
    ? process.env.SITE_NAME : 'Paper'
}

export function getGithubUserId(): string | null {
  return process.env.GITHUB
    ? process.env.GITHUB : null
}

export function getTwitterUserId(): string | null {
  return process.env.TWITTER
    ? process.env.TWITTER : null
}

export function getInstagramUserId(): string | null {
  return process.env.INSTAGRAM
    ? process.env.INSTAGRAM : null
}

export function getDefaultAuthor(): string {
  return process.env.AUTHOR
    ? process.env.AUTHOR : 'author'
}
