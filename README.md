```
  ____  ____  ____          __  _      ____    ___  ____   ______ 
 /    ||    \|    \        /  ]| |    |    |  /  _]|    \ |      |
|  o  ||  o  )  o  )      /  / | |     |  |  /  [_ |  _  ||      |
|     ||   _/|   _/      /  /  | |___  |  | |    _]|  |  ||_|  |_|
|  _  ||  |  |  |       /   \_ |     | |  | |   [_ |  |  |  |  |  
|  |  ||  |  |  |       \     ||     | |  | |     ||  |  |  |  |  
|__|__||__|  |__|        \____||_____||____||_____||__|__|  |__|  
                                                                  
```
A cross platform capable of driving both Android and IOS services with React Native
1. ReactNative
2. Expo
## Get Started
### Test
```shell script
$ npm install -g expo-cli
$ yarn add expo
$ expo start
```
### Deploy
#### Android
- play store
```shell script
# android 
$ expo build:android
```

#### IOS
```shell
$ expo build:ios
```

## Integration with AWS Amplify
- install and configure
    - see [prerequisites on docs](https://docs.amplify.aws/start/getting-started/installation/q/integration/react-native#sign-up-for-an-aws-account)
```shell script
$ amplify status

| Category  | Resource name          | Operation | Provider plugin   |
| --------- | ---------------------- | --------- | ----------------- |
| Auth      | omtmappservice72c1308e | No Change | awscloudformation |
| Analytics | omtmAppService         | No Change | awscloudformation |
```
### Auth
- support only for a social(Google, Facebook) login with [Oauth](https://docs.amplify.aws/lib/auth/social/q/platform/js#oauth-and-federation-overview)
  - Google
  - Facebook

### DataStore (API GraphQL)
- `amplify codegen models` generate models in `model/` by amplify graphql scheme
```shell
$ amplify codegen models

GraphQL schema compiled successfully.

Edit your schema at /Users/jinhoon.bae/Projects/homebab/app-client/amplify/backend/api/homebab/schema.graphql or place .graphql files in a directory at /Users/jinhoon.bae/Projects/homebab/app-client/amplify/backend/api/homebab/schema
```

- interact with amplify datastore using the models

```typescript
import {Item as ItemModel} from "../models";

async function fetchItems() {
  const items = await DataStore.query(ItemModel)
}
```

### Analytics
- [analytics with AWS pinpoint](https://docs.amplify.aws/lib/analytics/getting-started/q/platform/js)
- [pinpoint stream to Amazon Kinesis](https://docs.amplify.aws/lib/analytics/storing/q/platform/js)

## Screenshots
### v0
- itemList, RecipeList, RecipeDetail, AddItem
<div>
  <img src="https://user-images.githubusercontent.com/40639955/82827118-4fb43480-9ee9-11ea-8e32-743e40684db0.png" width="200"></img>
  <img src="https://user-images.githubusercontent.com/40639955/82827176-707c8a00-9ee9-11ea-820c-30796e5e641a.png" width="200"></img>
  <img src="https://user-images.githubusercontent.com/40639955/82827196-7a05f200-9ee9-11ea-8f22-af2c60d6dd6e.png" width="200"></img>
  <img src="https://user-images.githubusercontent.com/40639955/84013761-50060280-a9b4-11ea-9d9b-4c877dd9593f.png" width="200"></img>
</div>



## Errors
