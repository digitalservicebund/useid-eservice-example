# UseID eService SDK

> *Note*: This module is under development. It will later be moved into its own repository and published.

## Usage

```javascript
const { UseIdAPI, DataGroup } = require('useid-eservice-sdk');
// or
import { UseIdAPI, DataGroup } from 'useid-eservice-sdk';
```

Create instance with API key received from UseID service:
```javascript
const useIdAPI = new UseIdAPI(process.env.USEID_API_KEY);
```

### Step 1: Embed widget

* Generate refresh address for this user
* Define, which data groups are needed (see [TR-03110](https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03110/BSI_TR-03110_Part-4_V2-2.pdf) and [DataGroup.ts](src/DataGroup.ts))
* Start session with UseID backend (call `startSession()`)
* Embed widget using `tcTokenUrl` in response of that backend call and `UseIdAPI.widgetSrc`

### Step 2: Fetch identity data

* Listen on refresh address endpoint for that user
* Fetch data from UseID backend (call `getIdentity(eIdSessionId: string)` with `eIdSessionId` being the query parameter `sessionId` at the refresh address)
* Get the values by calling `get(dataGroup: DataGroup)` on that result
