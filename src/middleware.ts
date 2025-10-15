import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ru'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'always'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all outgoing requests that have a dynamic segment
    // '/(en|ru)/:path*',
    '/(en|ru)/:path((?!_next|api|.*\\..*).*)',

    // Enable redirects that add a locale prefix
    // for all paths starting with `/`
    '/((?!_next|api|.*\\..*).*)'
  ]
};
