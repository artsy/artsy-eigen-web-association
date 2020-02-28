/**
 * All links that go through Sailthru get encoded to the following format:
 *
 * http://link.artsy.net/click/9466122.343103/aHR0cHM6Ly93d3cuYXJ0c3kubmV0L2FydGljbGUvYXJ0c3ktZWRpdG9yaWFsLW1ldHMtcm9vZi1ob3N0cy1kaW5uZXItcGFydHktNS0wMDAteWVhcnMtYXJ0LWludml0ZWQ_dXRtX3NvdXJjZT1zYWlsdGhydSZ1dG1fbWVkaXVtPWVtYWlsJnV0bV9jYW1wYWlnbj05NDY2MTIyLUVkaXRvcmlhbC0wNC0yNS0xNyZ1dG1fdGVybT1BcnRzeVRvcFN0b3JpZXNXZWVrbHk/56a63f2b17893fbc408b97e9B85ab6cf0
 *
 * (This specific link redirects to https://www.artsy.net/article/artsy-editorial-mets-roof-hosts-dinner-party-5-000-years-art-invited?utm_source=sailthru&utm_medium=email&utm_campaign=9466122-Editorial-04-25-17&utm_term=ArtsyTopStoriesWeekly)
 *
 * The problem with this is that iOS won’t be able to exclude paths in the normal way. However, it turns out that the
 * encoded URL contains a base64 version of the actual Artsy URL, so we can exclude based on that. This script takes the
 * patterns specified in the apple-app-site-association.json file and generates the encoded versions of them. Or, if a
 * pattern was removed, it removes the corresponding encoded pattern.
 */

const fs = require('fs')

const filename = 'apple-app-site-association.json'

function updateFile(block) {
  const json = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8' }))
  block(json)
  fs.writeFileSync(filename, JSON.stringify(json, null, 2) + '\n', {
    encoding: 'utf8'
  })
}

function unencodedPatterns(patterns) {
  return patterns.filter(pattern => pattern.includes('/'))
}

function encodePath(path) {
  return path
    .split('*')
    .filter(component => component.length)
    .map(component => new Buffer(component).toString('base64'))
    .join('*')
}

function isNotSailthruPattern(pattern) {
  return !/^NOT \/click\/\*/.test(pattern)
}

/**
 * Only encode upto the largest multiple of 3 so that no padding is required to encode to base64.
 *
 * Match everything before, which is going to be the domain (`https://www.artsy.net`) base64 encoded, and after because
 * Sailthru adds another path component that we don’t care about.
 */
function encodePattern(pattern) {
  const path = pattern.match(/^NOT (.+)$/)[1]
  const encoded = encodePath(path.slice(0, path.length - (path.length % 3)))
  return `NOT *${encoded}*`
}

updateFile(json => {
  const app = json.applinks.details[0]
  const patterns = unencodedPatterns(app.paths)
  app.paths = [
    ...patterns.concat(
      patterns.filter(isNotSailthruPattern).map(encodePattern)
    ),
    '*'
  ]
})
