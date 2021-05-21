"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateTags = void 0;
const shared_ini_file_loader_1 = require("@aws-sdk/shared-ini-file-loader");
var Attribute;
(function (Attribute) {
    Attribute["accessKeyId"] = "aws_access_key_id";
    Attribute["secretAccessKey"] = "aws_secret_access_key";
    Attribute["sessionToken"] = "aws_session_token";
})(Attribute || (Attribute = {}));
exports.templateTags = [
    {
        name: 'awsprofile',
        displayName: 'AWS Profile',
        liveDisplayName: (args) => {
            return `${args[0].value} - ${args[1].value}`;
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
        async run(_context, profile, attribute) {
            const loadAwsCred = await shared_ini_file_loader_1.loadSharedConfigFiles();
            if (!loadAwsCred.credentialsFile[profile])
                return `${profile} not found`;
            if (!loadAwsCred.credentialsFile[profile][attribute])
                return `${attribute} not found for ${profile}`;
            return loadAwsCred.credentialsFile[profile][attribute];
        },
    }
];
//# sourceMappingURL=index.js.map