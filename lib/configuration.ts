export function getPageSize(): number {
  return process.env.PAGE_SIZE
    ? parseInt(process.env.PAGE_SIZE, 10) : 3
}

export function getSiteName(): string {
  return process.env.SITE_NAME
    ? process.env.SITE_NAME : 'Paper'
}
