
We can change DIR of generated code by editing `.graphqlconfig.yml`.
However, it is impossible to change DIR of generated model [NOT SUPPORTED](https://github.com/aws-amplify/amplify-cli/issues/3585)
So, we choose to use default DIR `src/` only for appsync

```shell
# not necessary
> amplify codegen

✔ Downloaded the schema
✔ Generated GraphQL operations successfully and saved at services/aws/appsync/graphql
✔ Code generated successfully and saved in file src/API.ts

> amplify codegen models

GraphQL schema compiled successfully.

Edit your schema at /Users/jinhoon.bae/Projects/omtm/app-client/amplify/backend/api/apiService/schema.graphql or place .graphql files in a directory at /Users/jinhoon.bae/Projects/omtm/app-client/amplify/backend/api/apiService/schema
Successfully generated models. Generated models can be found /Users/jinhoon.bae/Projects/omtm/app-client/src

```