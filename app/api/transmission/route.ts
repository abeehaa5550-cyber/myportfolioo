import { createSign } from 'crypto'
import { NextResponse } from 'next/server'

const spreadsheetId = '1WZg0RJ8NrlAwXogD0v32ZiePZH_a8We6iF63PYjlv4A'
const sheetRange = 'Sheet1!A4:C'
const sheetId = 0

type TransmissionPayload = {
  name?: string
  email?: string
  message?: string
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input).toString('base64url')
}

function getPrivateKey() {
  return process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')
}

function getUpdatedRowRange(updatedRange?: string) {
  const match = updatedRange?.match(/![A-Z]+(\d+):[A-Z]+(\d+)$/)

  if (!match) return null

  return {
    startRowIndex: Number(match[1]) - 1,
    endRowIndex: Number(match[2]),
  }
}

async function getAccessToken() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = getPrivateKey()

  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials are not configured.')
  }

  const now = Math.floor(Date.now() / 1000)
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  }
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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  const data = await response.json()

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || 'Unable to authorize Google Sheets request.')
  }

  return data.access_token as string
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as TransmissionPayload
    const name = payload.name?.trim()
    const email = payload.email?.trim()
    const message = payload.message?.trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
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
      body: JSON.stringify({
        values: [[name, email, message]],
      }),
    })

    const result = await sheetsResponse.json()

    if (!sheetsResponse.ok) {
      throw new Error(result.error?.message || 'Unable to append transmission to Google Sheet.')
    }

    const insertedRowRange = getUpdatedRowRange(result.updates?.updatedRange)

    if (insertedRowRange) {
      const formatResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId,
                  startRowIndex: insertedRowRange.startRowIndex,
                  endRowIndex: insertedRowRange.endRowIndex,
                  startColumnIndex: 0,
                  endColumnIndex: 3,
                },
                cell: {
                  userEnteredFormat: {
                    textFormat: {
                      bold: false,
                    },
                  },
                },
                fields: 'userEnteredFormat.textFormat.bold',
              },
            },
          ],
        }),
      })

      if (!formatResponse.ok) {
        const formatResult = await formatResponse.json()
        throw new Error(formatResult.error?.message || 'Transmission saved, but row formatting failed.')
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Transmission failed.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
