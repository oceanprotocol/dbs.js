# Decentralised Backend Storage Javascript Library

This is a TypeScript library for interacting with the DBS API. It provides a simple interface to call the API endpoints in Ocean Decentralised backend storage for managing file storage uploads, quotes, and more.

## Installation

Install the library using npm or yarn:

```bash
npm install @oceanprotocol/dbs
```

or

```bash
yarn add @oceanprotocol/dbs
```

## Usage Example

```typescript
import { ethers } from 'ethers'
import {
  DBSClient,
  GetQuoteArgs,
  File,
  RegisterArgs,
  Payment,
  StorageInfo,
  GetQuoteResult,
  GetStatusResult,
  GetLinkResult
} from '@oceanprotocol/dbs'
import dotenv from 'dotenv'

dotenv.config()

// Set up a new instance of the DBS client
const signer = new ethers.Wallet(process.env.PRIVATE_KEY) // Use your actual private key
const client = new DBSClient(process.env.DBS_API_URL, signer) // Use your actual DBS API url

async function runExample() {
  // Get storage info
  const storageInfo: StorageInfo[] = await client.getStorageInfo()
  console.log('Storage info:', storageInfo)

  // Construct an example quote request
  const quoteArgs: GetQuoteArgs = {
    type: 'exampleType', // Replace with an actual type
    files: [{ length: 1000 }], // Replace with actual file info
    duration: 10, // Replace with an actual duration
    payment: {
      payment_method: { chainId: 1, acceptedTokens: {} },
      wallet_address: '0xExampleAddress' // Replace with an actual wallet address
    },
    userAddress: '0xExampleUserAddress' // Replace with an actual user address
  }

  // Fetch a quote
  const quoteResult: GetQuoteResult = await client.getQuote(quoteArgs)
  console.log('Quote result:', quoteResult)

  // Upload files
  await client.upload(quoteResult.quoteId, quoteArgs.files)
  console.log('Files uploaded successfully.')

  // Get and upload quote
  const quoteAndUploadResult: GetQuoteResult = await client.getQuoteAndUpload(quoteArgs)
  console.log('Quote and upload result:', quoteAndUploadResult)

  // Fetch the status of a job
  const statusResult: GetStatusResult = await client.getStatus(quoteResult.quoteId)
  console.log('Status result:', statusResult)

  // Fetch the DDO files object for a job
  const linkResult: GetLinkResult[] = await client.getLink(quoteResult.quoteId)
  console.log('Link result:', linkResult)

  // Register a new microservice
  const registerArgs: RegisterArgs = {
    type: 'exampleType', // Replace with an actual type
    description: 'Example microservice', // Replace with an actual description
    url: 'http://example.com', // Replace with an actual url
    paymentMethods: [{ chainId: 1, acceptedTokens: {} }]
  }

  await client.registerMicroservice(registerArgs)
  console.log('Microservice registered successfully.')
}

runExample().catch(console.error)
```

## API

The library provides the following methods:

`constructor(baseURL: string)`
Create a new instance of the DBSClient.

`getStorageInfo(): Promise<StorageInfo[]>`
Fetch information about supported storage types and payments.

`getQuote(args: GetQuoteArgs): Promise<GetQuoteResult>`
Fetch a quote for storing files on a specific storage.

`upload(quoteId: string, nonce: number, signature: string, files: File[]): Promise<void>`
Upload files according to the quote request.

`getStatus(quoteId: string): Promise<GetStatusResult>`
Fetch the status of a job.

`getLink(quoteId: string, nonce: number, signature: string): Promise<GetLinkResult[]>`
Fetch the DDO files object for a job.

`registerMicroservice(args: RegisterArgs): Promise<void>`
Register a new microservice that handles a storage type.

## Contributing

If you'd like to contribute to this library, please submit pull requests with new features or bug fixes. Make sure to follow the TypeScript and project guidelines.

## License

This library is licensed under the Apache 2 license.
