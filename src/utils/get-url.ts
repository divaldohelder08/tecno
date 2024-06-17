export function getURL(path?:string){
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL || '';
  const normalizedPath=path && !path.startsWith("/") ? `/${path}` : path || ""
  return `${baseURL}${normalizedPath}`
}