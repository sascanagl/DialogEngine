// Unathenticated Role accessing aws Cognito authentication
const AWS_NOAUTH_ROLE  = "Cognito_DialogGamersUnauth_Role"
const AWS_IdentityPool = "us-east-1:6ba97a19-62ef-40ae-87c6-fb14412b263b"

// Authenticated identities accessing aws Cognito authentication
//const AWS_AUTH_ROLE   = "Cognito_DialogGamersAuth_Role"

// Initialize the Amazon Cognito credentials provider
/*
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:6ba97a19-62ef-40ae-87c6-fb14412b263b',
});
*/