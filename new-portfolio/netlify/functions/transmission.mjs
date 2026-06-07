import { createSign } from 'node:crypto'

const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || '1WZg0RJ8NrlAwXogD0v32ZiePZH_a8We6iF63PYjlv4A'
const sheetRange = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A4:C'

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function base64Url(input) {
  return Buffer.from(input).toString('base64url')
}

function getPrivateKey() {
  return process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')
}

async function getAccessToken() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = getPrivateKey()

  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials are not configured.')
  }

  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claimSet = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }
  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claimSet))}`
  const signature = createSign('RSA-SHA256').update(unsignedToken).sign(privateKey)
  const jwt = `${unsignedToken}.${base64Url(signature)}`

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const data = await response.json()

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || 'Unable to authorize Google Sheets request.')
  }

  return data.access_token
}

async function transmission(request) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405)
  }

  try {
    const payload = await request.json()
    const name = String(payload.name || '').trim()
    const email = String(payload.email || '').trim()
    const message = String(payload.message || '').trim()

    console.log('Transmission received', { hasName: Boolean(name), hasEmail: Boolean(email), hasMessage: Boolean(message) })

    if (!name || !email || !message) {
      return json({ error: 'Name, email, and message are required.' }, 400)
    }

    const accessToken = await getAccessToken()
    const appendUrl = new URL(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetRange)}:append`,
    )
    appendUrl.searchParams.set('valueInputOption', 'RAW')
    appendUrl.searchParams.set('insertDataOption', 'INSERT_ROWS')

    const sheetsResponse = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [[name, email, message]] }),
    })
    const result = await sheetsResponse.json()

    if (!sheetsResponse.ok) {
      throw new Error(result.error?.message || 'Unable to append transmission to Google Sheet.')
    }

    console.log('Transmission saved', { updatedRange: result.updates?.updatedRange })
    return json({ ok: true, updatedRange: result.updates?.updatedRange })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Transmission failed.'
    console.error('Error saving transmission to Google Sheet:', message)
    return json({ error: message }, 500)
  }
}

export default transmission
