import {loadSharedConfigFiles} from "@aws-sdk/shared-ini-file-loader";

enum Attribute {
    accessKeyId = 'aws_access_key_id',
    secretAccessKey = 'aws_secret_access_key',
    sessionToken = 'aws_session_token'
}

export const templateTags = [
    {
        name: 'awsprofile',
        displayName: 'AWS Profile',
        liveDisplayName: (args: any) => {
            return `${args[0].value} - ${args[1].value}`
        },
        description: 'AWS IAM shared credentials profile loader',
        args: [
            {
                displayName: 'Profile',
                type: 'string',
                defaultValue: 'default',
                modelType: 'model'
            }, {
                displayName: 'Item',
                type: 'enum',
                options: [
                    {
                        displayName: 'Key',
                        value: Attribute.accessKeyId,
                    },
                    {
                        displayName: 'Secret',
                        value: Attribute.secretAccessKey,
                    },
                    {
                        displayName: 'Token',
                        value: Attribute.sessionToken,
                    },
                ]
            }
        ],
        async run(_context: object, profile: string, attribute: Attribute) {
            const loadAwsCred = await loadSharedConfigFiles()
            if(!loadAwsCred.credentialsFile) return `credentials not found`
            const selectedProfile = loadAwsCred.credentialsFile[profile]

            if(!selectedProfile) return `${profile} not found`
            if(!selectedProfile[attribute]) return `${attribute} not found for ${profile}`

            return selectedProfile[attribute];
        },
    }
];
