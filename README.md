# SamSpam

A spam detector for discord.js bots

---

# Installation

```bash
npm i @satont/SamSpam
```

# Usage

CommonJs

```javascript
  const { Client } = require('discord.js')
  const SamSpam = require('@satont/SamSpam')
  const client = new Client()

  client.on('message', (message) => {
    //initiate the detector and log the chats with max 50 logged chats
    SamSpam.log(message, 50)

    if (SamSpam.tooQuick(3, 1000)) {
      // when someone send 3 chats in less than a second
    }

    if (SamSpam.sameMessages(3, 60000)){
      // when someone send 3 identical chats within a minute
    }
  })
```

ES6 modules:

```javascript
import SamSpam from '@satont/SamSpam'
import { Client } from 'discord.js'
const client = new Client()

client.on('message', (message) => {
  //initiate the detector and log the chats with max 50 logged chats
  SamSpam.log(message, 50)

  if(SamSpam.tooQuick(3, 1000)) {
    // when someone send 3 chats in less than a second
  }

  if(SamSpam.sameMessages(3, 60000)) {
    // when someone send 3 identical chats within a minute
  }
})
```

# Credits
Original author is rainqubit. Repo: https://github.com/rainqubit/SamSpam
